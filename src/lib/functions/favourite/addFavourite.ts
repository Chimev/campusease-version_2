
export const addFavourite = async(
    email: string,
    listingId: string
) => {
    try {
        const res = await fetch(`/api/favourite`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, listingId})
        })

        const data = await res.json(); 
        
        return { ok: res.ok, data }; 
    } catch (error) {
        console.error("Favourite API Error:", error);
        return { ok: false, data: null };
    }
}