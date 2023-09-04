import { BathtubIcon, BedIcon, BuildingIcon, DimensionsIcon, GarageIcon, LocationIcon, ShopIcon } from "@assets";
import { Property } from "@types";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const PropertyDetails: React.FC = () => {
  const [propertyDetails, setPropertyDetails] = useState<
    Property | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { pid } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/realEstateListing/${pid}`)
      .then(async (res) => {
        const response = await res.json();
        setTimeout(() => {
          setPropertyDetails(response);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pid]);

  //   const featureItems = [
  //     { title: "Bedrooms", icon: <LuBedDouble className="h-5 w-5" />, value: propertyDetails.beds },
  //     { title: "Baths", icon: <MdOutlineBathtub className="h-5 w-5" />, value: propertyDetails.bath },
  //     { title: "Square feet", icon: <RxDimensions className="h-5 w-5" />, value: propertyDetails.coveredAreaSQFT },
  //     { title: "Type", icon: <BiBuildingHouse className="h-5 w-5" />, value: propertyDetails.propertyType },
  //     { title: "Garage", icon: <GiHomeGarage className="h-5 w-5" />, value: propertyDetails.garage ? " Included" : " Excluded" },
  //     { title: "Area", icon: <BsShop className="h-5 w-5" />, value: propertyDetails.isCommercial ? "Commercial" : "Non Commercial" },
  //   ];

  //   function featureItem(title, icon, value) {
  //     return (
  //       <div className="flex items-center flex-col">
  //         <p className="font-Poppins font-semibold text-md flex items-center mb-2 text-cyan-700">
  //           {icon}
  //           {value}
  //         </p>
  //         <h3 className="font-semibold text-md flex items-center">
  //           {title}
  //         </h3>
  //       </div>
  //     );
  //   }

  return (
    <div className="mx-auto px-10 lg:px-0 py-3 max-w-md md:max-w-3xl lg:max-w-4xl mt-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <svg
            className="animate-spin h-10 w-10 text-cyan-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : (
        <div className="bg-white rounded-lg mb-20">
          <Link
            to="/"
            className="text-cyan-600 hover:text-cyan-700 font-semibold hover:underline py-3 flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
              />
            </svg>
            Back to Home
          </Link>
          <img
            src={propertyDetails?.imageUrl}
            alt={propertyDetails?.title}
            className="w-full h-96 object-cover rounded-t-lg"
          />
          <div className="py-6 gap-6 flex flex-col">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 font-Lora">
                {propertyDetails?.title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-md font-Poppins flex items-center">
                <LocationIcon className="text-cyan-700 mr-2 h-4 w-4 font-semibold" />

                {propertyDetails?.address}
              </p>
            </div>
            <div className="gap-4 flex flex-col">
              <h2 className="text-xl font-semibold font-Lora">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-gray-600 text-sm shadow-sm rounded-lg bg-orange-100 p-8 md:gap-8 items-center">
                <div className="flex items-center flex-col">
                  <p className="font-Poppins font-semibold text-sm flex items-center mb-2 text-cyan-700">
                    <BedIcon className="mr-2 h-5 w-5" />
                    {propertyDetails?.beds}
                  </p>
                  <h3 className="font-semibold text-md flex items-center">
                    Bedrooms
                  </h3>
                </div>
                <div className="flex items-center flex-col">
                  <p className="font-Poppins font-semibold text-sm flex items-center mb-2 text-cyan-700">
                    <BathtubIcon className="mr-2 h-5 w-5" />
                    {propertyDetails?.bath}
                  </p>
                  <h3 className="font-semibold text-md flex items-center">
                    Baths
                  </h3>
                </div>
                <div className="flex items-center flex-col">
                  <p className="font-Poppins font-semibold text-sm flex items-center mb-2 text-cyan-700">
                    <DimensionsIcon className="mr-2 h-5 w-5" />
                    {propertyDetails?.coveredAreaSQFT}
                  </p>
                  <h3 className="font-semibold text-md flex items-center">
                    Square feet
                  </h3>
                </div>
                <div className="flex items-center flex-col">
                  <p className="font-Poppins font-semibold text-sm flex items-center mb-2 text-cyan-700">
                    <BuildingIcon className="mr-2 h-5 w-5" />
                    {propertyDetails?.propertyType}
                  </p>
                  <h3 className="font-semibold text-md flex items-center">
                    Type
                  </h3>
                </div>
                <div className="flex items-center flex-col">
                  <p className="font-Poppins font-semibold text-sm flex items-center mb-2 text-cyan-700">
                    <GarageIcon className="mr-2 h-5 w-5" />
                    {propertyDetails?.garage ? " Included" : " Excluded"}
                  </p>
                  <h3 className="font-semibold text-md flex items-center">
                    Garage
                  </h3>
                </div>
                <div className="flex items-center flex-col">
                  <p className="font-Poppins font-semibold text-sm flex text-center items-center mb-2 text-cyan-700">
                    <ShopIcon className="mr-2 h-5 w-5" />
                    {propertyDetails?.isCommercial ? "Yes" : "No"}
                  </p>
                  <h3 className="font-semibold text-md flex items-center">
                    Commercial Area
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold font-Lora">Description</h2>
              <p className="text-gray-700 text-justify">
                {propertyDetails?.description}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold font-Lora">Contact Agent</h2>
              <div className="flex">
                <h3 className="font-Poppins text-sm font-semibold flex">
                  Agent Name:
                </h3>
                <p className="text-gray-700 ml-5 text-sm">
                  {propertyDetails?.agentName}
                </p>
              </div>
              <div className="flex">
                <h3 className="font-Poppins text-sm font-semibold flex">
                  Agent Contact:
                </h3>
                <p className="text-gray-700 ml-5 text-sm">
                  {propertyDetails?.agentContact}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
