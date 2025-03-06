
export async function addListing (data: any) {
    console.log(data)
    const res = await fetch('/api/listings', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if(!res.ok){
        throw new Error('Failed to add listing');
    };

  

    return res.json();
};