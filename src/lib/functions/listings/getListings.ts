export const getListings = async () => {
    const res = await fetch('http://localhost:3000//api/listings')
    const data = await res.json()
    return data;
}