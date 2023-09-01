import { useEffect, useState } from "react";
import { ViewModes } from "../../components/ViewModes/ViewModes";
import { DataCards } from "../../components/DataCards/DataCards";
import { DataTable } from "../../components/DataTable/DataTable";

export const Home = ({ propertyList, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("List");
  const [paginatedData, setPaginatedData] = useState([]);

  /**Pagination to show 10 records on 1 Page */
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(propertyList?.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setPaginatedData(propertyList.slice(startIndex, endIndex));
    } else {
      setPaginatedData(
        propertyList.filter(
          (item) =>
            item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, currentPage, propertyList]);

  return (
    <div className=" mx-auto px-10 xl:px-0 py-10 max-w-md md:max-w-3xl lg:max-w-5xl mt-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <input
          type="text"
          placeholder="Search Location by Title or Address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 border rounded-md border-gray-300 px-4 py-2 focus-visible:outline-none focus:border-cyan-700"
        />
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
          <div className="mt-10 w-full overflow-x-auto justify-center flex flex-col">
            {activeTab === "List" ? (
              <DataTable paginatedData={paginatedData} />
            ) : (
              <DataCards paginatedData={paginatedData} />
            )}
          </div>
          <div className="mt-10 flex justify-between items-center mb-10">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? `bg-gray-100 text-black cursor-not-allowed`
                  : `bg-orange-200 hover:bg-orange-300 text-cyan-900`
              }  font-semibold py-2 px-3 rounded-l flex items-center`}
            >
              Previous
            </button>
            <div className="sm:flex space-x-2 text-cyan-800 font-semibold hidden">
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`py-2 px-3 rounded ${
                    currentPage === pageNumber ? "bg-orange-200" : "bg-gray-200"
                  } hover:bg-orange-300 text-cyan-900 font-semibold`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <div className="flex space-x-2 text-cyan-800 font-semibold sm:hidden">
              <p className="py-2 px-3">
                Page {currentPage} of {totalPages}
              </p>
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? `bg-gray-100 text-black cursor-not-allowed`
                  : `bg-orange-200 hover:bg-orange-300 text-cyan-900`
              }  font-semibold py-2 px-3 rounded-l flex items-center`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
