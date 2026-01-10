export async function deleteUploadedImage(publicId: string) {
  const res = await fetch(`/api/listings/image/${publicId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}
