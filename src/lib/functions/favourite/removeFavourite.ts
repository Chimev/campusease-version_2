

export const removeFavourite = async(email:string, listingId: string) => {
    try {
        const res = await fetch(`/api/favourite/${listingId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email})
        });

        const data = await res.json();
        
        return { ok: res.ok, data }; // Return ok directly, not nested
    } catch (error) {
        console.error("Remove Favourite API Error:", error);
        return { ok: false, data: null };
    }
}