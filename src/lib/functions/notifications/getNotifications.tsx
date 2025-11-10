export const getNotifications =async (
    page = 1,
    limit = 10,
  ) => {
        // Get the base URL dynamically based on the environment
      const baseUrl = typeof window !== 'undefined'
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_BASE_URL || '';

        const res = await fetch(`${baseUrl}/api/notifications/preferences/?page=${page}&limit=${limit}`);
    const data = await res.json();
    console.log(data)
    return data;
}