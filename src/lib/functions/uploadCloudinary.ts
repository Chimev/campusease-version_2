// utils/cloudinary.ts
export async function uploadImagesToCloudinary(files: FileList): Promise<string[]> {
    const uploadedUrls = [];
    
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file); // Replace with your preset
      formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(`Upload failed: ${data.error.message}`);
  
      uploadedUrls.push(data.secure_url);
    }
    
    return uploadedUrls;
  }
  