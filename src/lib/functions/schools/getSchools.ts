export const getSchools = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schools`);
    const data = await res.json();
    return data;
};
