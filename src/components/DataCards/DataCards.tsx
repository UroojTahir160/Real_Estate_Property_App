import { DataCardsProps } from "@types";
import { useNavigate } from "react-router-dom";

export const DataCards: React.FC<DataCardsProps> = ({ paginatedData }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {paginatedData?.map((listing) => (
        <div key={listing.id} className="shadow-md border p-4 rounded-md bg-gray-100">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-40 object-cover mb-2 rounded-md"
          />
          <div className="flex flex-col h-[100px] gap-1">
            <h3 className="text-md font-semibold font-Poppins">
              {listing.title}
            </h3>
            <h2 className="text-sm font-Poppins">{listing.address}</h2>
            <p className="text-cyan-700 font-medium font-Poppins">
              PKR {listing.price}
            </p>
          </div>
          <button
            onClick={() => navigate(`/property-details/${listing.id}`)}
            className="mt-2 bg-orange-200 hover:bg-orange-300 text-cyan-900 font-Lora text-md font-semibold py-2 px-3 rounded transition-all delay-100"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};
