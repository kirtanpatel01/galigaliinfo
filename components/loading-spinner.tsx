import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
    </div>
  );
}
