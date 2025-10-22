export const getSchools = async (type?: string | null) => {
  const baseUrl =
    typeof window !== 'undefined'
      ? '' 
      : process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/schools?type=${type ?? ''}`);
  if (!res.ok) throw new Error('Failed to fetch schools');
  return await res.json();
};
