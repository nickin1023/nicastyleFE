import { Button } from "@/src/components/atoms/button/Button";
import Image from "next/image";
import { useState } from "react";
import { uploadImage } from "../api/images";

export const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file!);

    try {
      const response = await uploadImage({ data: formData });
      setUploadedUrl(response.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="justify-self-center my-5">
      <input
        className="cursor-pointer my-2"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      {previewUrl && (
        <Image
          className="my-2"
          src={previewUrl}
          alt="preview image"
          width={300}
          height={300}
        />
      )}
      {uploadedUrl && <div>アップロードURL: {uploadedUrl}</div>}
      <Button className="my-2" onClick={handleUpload} disabled={!file}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};
