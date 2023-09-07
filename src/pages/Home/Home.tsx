import React, { useEffect, useState } from "react";
import {
  DataCards,
  DataTable,
  Pagination,
  SearchInput,
  TableFilters,
  ViewModes,
} from "@components";
import { EViewMode, Property, PropertyListingParams } from "@types";
import { getPropertyList } from "@api";
import { emptySearch } from "@assets";

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EViewMode>(EViewMode.LIST);
  const [paginatedData, setPaginatedData] = useState<Property[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [params, setParams] = useState<PropertyListingParams>({
    _page: 1,
    _limit: 10,
    _order: "",
    _sort: "",
    address_like: "",
    filters: {
      beds: "",
      bath: "",
      price_gte: undefined,
      price_lte: undefined,
      propertyType: "",
    },
  });

  const itemsPerPage = 10;

  const [totalPages, setTotalPages] = useState(0);

  const fetchPropertyList = async () => {
    const propertyListResponse = await getPropertyList(params);
    if (propertyListResponse) {
      setPaginatedData(propertyListResponse.data);
      if (propertyListResponse.headers) {
        setTotalPages(
          Math.ceil(
            propertyListResponse?.headers?.["x-total-count"] / itemsPerPage
          )
        );
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPropertyList();
  }, [params]);

  return (
    <div className=" mx-auto px-10 xl:px-0 py-10 max-w-md md:max-w-3xl lg:max-w-5xl mt-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <div className="flex gap-2 w-full">
          <SearchInput params={params} setParams={setParams} />
          <TableFilters params={params} setParams={setParams} />
        </div>
        <ViewModes activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
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
        <>
          {paginatedData.length > 0 ? (
            <>
              <div className="mt-10 w-full overflow-x-auto justify-center flex flex-col">
                {activeTab === "List" ? (
                  <DataTable
                    paginatedData={paginatedData}
                    params={params}
                    setParams={setParams}
                  />
                ) : (
                  <DataCards paginatedData={paginatedData} />
                )}
              </div>

              <Pagination
                totalPages={totalPages}
                params={params}
                setParams={setParams}
              />
            </>
          ) : (
            <div className="mt-10 w-full justify-center flex flex-col h-[calc(100vh-250px)]">
              <div className="flex flex-col w-3/4 gap-6 self-center">
                <img
                  src={emptySearch}
                  alt="no-tasks"
                  className="rounded-sm w-full sm:w-1/2 h-full sm:mr-6 self-center"
                    />
                    <h2 className="text-xl text-orange-300 font-semibold font-Lora text-center">No Matching Houses or Apartments Found</h2>
                <h3 className="text-md text-cyan-700 font-semibold font-Poppins text-center">
                  "It seems there are no available houses or apartments based on
                  your search. Consider refining your filters or exploring other
                  property types."
                </h3>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
