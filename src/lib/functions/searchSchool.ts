//Use Later for registration page

export async function searchSchool() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/schools`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch schools');
    }
  
    const schools = await res.json();
    return schools;
  }
  