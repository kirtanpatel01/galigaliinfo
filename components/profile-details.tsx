import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

type Profile = {
  id: number;
  user_id: string;
  username: string;
  fullName: string;
  phone: string;
  avatar: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  role: string | null;
  shopName?: string;
  shopPhoto: string;
  created_at: string;
};

function ProfileDetails({ profile, role }: { profile: Profile, role?: string }) {
  const {
    username,
    fullName,
    phone,
    avatar,
    address,
    city,
    state,
    country,
    pincode,
    shopName,
    shopPhoto,
    created_at,
  } = profile;

  const isBusiness = role === "business";

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={avatar} alt={fullName} />
          <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{fullName}</h2>
          <p className="text-sm text-muted-foreground">@{username}</p>
          {role && (
            <Badge variant={isBusiness ? "default" : "secondary"} className="mt-1">
              {isBusiness ? "Business" : "User"}
            </Badge>
          )}
        </div>

        {isBusiness && shopPhoto && (
          <div className="flex-shrink-0 w-32 h-24">
            <img
              src={shopPhoto}
              alt="shop-photo"
              className="w-full h-full rounded-md object-cover"
            />
          </div>
        )}
      </CardHeader>

      <Separator />

      <CardContent className="space-y-3 pt-4">
        <div>
          <Label>Phone</Label>
          <p>{phone}</p>
        </div>
        <div>
          <Label>Address</Label>
          <p>{address}</p>
        </div>
        <div>
          <Label>City</Label>
          <p>{city}</p>
        </div>
        <div>
          <Label>State</Label>
          <p>{state}</p>
        </div>
        <div>
          <Label>Country</Label>
          <p>{country}</p>
        </div>
        <div>
          <Label>Pincode</Label>
          <p>{pincode}</p>
        </div>

        {isBusiness && shopName && (
          <div>
            <Label>Shop Name</Label>
            <p>{shopName}</p>
          </div>
        )}

        <Separator />

        <p className="text-xs text-muted-foreground">
          Joined: {new Date(created_at).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}

export default ProfileDetails;