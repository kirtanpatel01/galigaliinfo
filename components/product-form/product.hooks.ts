import { useState } from "react";

export function useImageHandler() {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFiles = (files: FileList, onChange: (value: string[]) => void) => {
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...urls]);
    onChange(urls);
  };

  const removeImage = (url: string, onChange: (value: string[]) => void) => {
    setPreviews((prev) => prev.filter((img) => img !== url));
    onChange(previews.filter((img) => img !== url));
  };

  return { previews, handleFiles, removeImage };
}
