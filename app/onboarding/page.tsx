'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useMemo } from "react"
import AvatarUpload from "@/components/avatar-upload"
import { saveProfileData } from "@/actions/onboarding.action"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { useProfileByUserId } from "@/hooks/use-profile"
import { ArrowUpRightFromSquareIcon } from "lucide-react"
import Link from "next/link"
import LoadingSpinner from "@/components/loading-spinner"

const baseSchema = z.object({
  username: z.string().min(6).max(50),
  fullName: z.string(),
  phone: z.string().min(10).max(10),
  avatar: z.union([z.string().url(), z.literal("")]),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
})

const businessSchema = baseSchema.extend({
  shopName: z.string().min(2, "Shop name is required"),
  shopPhoto: z.union([z.string().url(), z.literal("")]),
})

type FormValues = z.infer<typeof baseSchema> & {
  shopName?: string
  shopPhoto?: string
}

type FieldConfig = {
  name: keyof z.infer<typeof baseSchema>
  label: string
  placeholder?: string
  type: React.HTMLInputTypeAttribute
}

const formFields: FieldConfig[] = [
  { name: "username", label: "Username", placeholder: "Enter your username", type: "text" },
  { name: "fullName", label: "Full Name", placeholder: "Enter your full name", type: "text" },
  { name: "phone", label: "Phone", placeholder: "Enter your phone number", type: "tel" },
  { name: "avatar", label: "Profile Photo", type: "file" },
  { name: "address", label: "Address", placeholder: "Enter your address", type: "text" },
  { name: "city", label: "City", placeholder: "Enter your city", type: "text" },
  { name: "state", label: "State", placeholder: "Enter your state", type: "text" },
  { name: "country", label: "Country", placeholder: "Enter your country", type: "text" },
  { name: "pincode", label: "Pincode", placeholder: "Enter your pincode", type: "number" },
]

function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true)
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoadingUser(false)
    }
    loadUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const schema = useMemo(() => {
    const role = user?.user_metadata?.data?.role || user?.user_metadata?.role;
    return role === "business" ? businessSchema : baseSchema;
  }, [user]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      fullName: "",
      phone: "",
      avatar: "https://api.dicebear.com/8.x/initials/svg?seed=User",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      shopName: "",
    },
  })

  const fullName = form.watch("fullName");

  useEffect(() => {
    const name = form.watch("fullName")
    if (
      !form.getValues("avatar") ||
      form.getValues("avatar").includes("dicebear.com")
    ) {
      form.setValue(
        "avatar",
        `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
          name || "User"
        )}`
      )
    }
  }, [fullName, form])

  async function onSubmit(values: FormValues) {
    const { data, error } = await saveProfileData(values)
    if (data && !error) {
      toast.success("Profile created successfully.")
      redirect("/")
    } else if (error) {
      console.log(error)
      if (error.code === "23505") {
        if (error.message.includes("profile_username_key")) {
          toast.error("This username is already taken. Please choose another one.")
        } else if (error.message.includes("profile_phone_key")) {
          toast.error("This phone number is already registered.")
        } else {
          toast.error("Duplicate value found. Please use different details.")
        }
      }
      else {
        console.error("Unexpected error:", error)
        toast.error("Something went wrong. Please try again later.")
      }
      return
    }
  }

  const userId = user?.id
  const { data: profile, isLoading, isError, error } = useProfileByUserId(userId || "")

  useEffect(() => {
    if (profile) {
      redirect("/")
    }
  }, [profile])

  if (loadingUser) return <p>Loading user...</p>
  if (!userId) return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="border rounded-md p-6 text-center">
        <p className="">No user logged in !</p>
        <Link href={"/auth/login"}>
          <Button variant={"link"} className="text-blue-500 hover:text-blue-600 cursor-pointer">
            Go to login page <ArrowUpRightFromSquareIcon />
          </Button>
        </Link>
      </div>
    </div>
  )
  if (isLoading) return <LoadingSpinner />
  if (isError) return <p>Error: {String(error)}</p>

  const role = user?.user_metadata?.role || user?.user_metadata?.data?.role
  const isBusiness = role === "business";

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 border p-4 max-w-lg w-full">
          {formFields
            .filter((f) => f.name !== "avatar")
            .map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={fieldConfig.placeholder}
                        type={fieldConfig.type}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))
          }

          {isBusiness && (
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your shop name"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="w-full flex justify-evenly gap-4">
            <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{user.role === "business" ? "Shop" : "Profile"} Photo</FormLabel>
                <FormControl>
                  <AvatarUpload
                    value={field.value}
                    fullName={form.watch("fullName")}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isBusiness && (
            <FormField
              control={form.control}
              name="shopPhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Photo</FormLabel>
                  <FormControl>
                    <AvatarUpload
                      value={field.value || ""}
                      fullName={form.watch("shopName") || "Shop"}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default Page