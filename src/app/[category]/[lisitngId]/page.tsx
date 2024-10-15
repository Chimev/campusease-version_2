// import Image from "next/image";

const ListingDetails = () => {

  return (
    <div className="max-w-4xl mx-auto p-4">
   
      
      {/* Large Main Image */}
      <div className="w-full h-[240px] bg-red-500 mb-4">
        
      </div>

      {/* Smaller Images */}
      <div className="grid gap-4 grid-cols-2">
        <div className="bg-red-400 h-[80px]"></div>
        <div className="bg-red-400 h-[80px"></div>
      </div>

         {/* Listing Name */}
         <h1 className="text-3xl font-bold mb-4">Listing Titlte</h1>

      {/* Listing Description */}
      <p className="mb-4 text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
         Harum ut omnis aperiam, modi quis veniam rem quia qui sit nobis incidunt doloribus exercitationem deleniti totam magnam accusamus numquam quibusdam ad minus eligendi eveniet est perspiciatis veritatis nostrum? Deserunt tempore, blanditiis, 
        fugit praesentium dignissimos dicta, inventore sapiente corporis repudiandae cum eius.</p>

      {/* Listed By */}
      <p className="text-lg mb-2">
        <span className="font-bold">Listed by:</span> Chime
      </p>

      {/* Conditional Details by Category */}
      {/* <div className="bg-gray-100 p-4 rounded-lg">
        {category === "Accommodation" && (
          <>
            <p className="mb-2">
              <span className="font-bold">Price:</span> {details.price}
            </p>
            <p className="mb-2">
              <span className="font-bold">Location:</span> {details.location}
            </p>
            <p className="mb-2">
              <span className="font-bold">Amenities:</span>{" "}
              {details.amenities.join(", ")}
            </p>
          </>
        )}
        {category === "Service" && <p>Service specific details...</p>}
        {category === "Property" && <p>Property specific details...</p>}
        {category === "Roommates" && <p>Roommate specific details...</p>}
      </div> */}
    </div>
  );
};

export default ListingDetails;
