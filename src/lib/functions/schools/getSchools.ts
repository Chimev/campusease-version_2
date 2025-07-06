// accepts a string (or nothing)
export const getSchools = async (type?: string | null) => {
  const res = await fetch(`/api/schools?type=${type ?? ''}`);
  if (!res.ok) throw new Error('Failed to fetch schools');
  return await res.json();
};
