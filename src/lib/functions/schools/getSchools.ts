export const getSchools = async () => {
    const res = await fetch('http://localhost:3000//api/schools')
    const data = await res.json()
    return data;
}