export const uploadImagesToCloudinary = async (files: FileList): Promise<string[]> => {
  const uploadedUrls: string[] = [];
  
  try {
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!); // Replace with your Cloudinary upload preset
      formData.append("folder", "your_folder"); // Optional: Replace with your Cloudinary folder name

      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();
      uploadedUrls.push(data.secure_url); // Add the uploaded image URL to the array

      return data.secure_url; // Return the uploaded image URL
    });

    await Promise.all(uploadPromises); // Wait for all uploads to complete

    return uploadedUrls; // Return array of uploaded image URLs
  } catch (error:any) {
    // Handle error by deleting already uploaded images
    if (uploadedUrls.length > 0) {
      // If an error occurs and there are previously uploaded images, delete them
      await Promise.all(uploadedUrls.map((url) => deleteImageFromCloudinary(url)));
    }
    throw new Error("Upload failed: " + error.message); // Propagate error to the caller
  }
};

const deleteImageFromCloudinary = async (imageUrl: string) => {
  const publicId = imageUrl.split('/').pop()?.split('.')[0]; // Extract public ID from the URL
  if (!publicId) {
    return;
  }

  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      public_id: publicId,
      upload_preset: process.env.NEXT_PUBLIC_UPLOAD_PRESET!, // Replace with your Cloudinary upload preset
    }),
  });

  if (!response.ok) {
    console.error(`Failed to delete image with public ID: ${publicId}`);
  }
};
