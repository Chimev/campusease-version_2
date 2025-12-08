export const deleteListing = async (id: string) => {
  try {
    const res = await fetch(`/api/listings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error; 
  }
};
