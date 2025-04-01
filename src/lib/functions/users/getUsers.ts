export const getUsers = async (page = 1, limit = 10) => {
    try {
      // Get the base URL dynamically based on the environment
      const baseUrl = typeof window !== 'undefined'
        ? window.location.origin // When running in browser
        : process.env.NEXT_PUBLIC_BASE_URL || ''; // Fallback for server-side
  
      const res = await fetch(`${baseUrl}/api/user?page=${page}&limit=${limit}`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { users: [], totalUsers: 0, totalPages: 0, currentPage: 1 };
    }
  };