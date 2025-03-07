export const getUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`);
    const data = await res.json();
    return data;
};
