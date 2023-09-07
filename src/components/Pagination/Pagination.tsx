import { PaginationProps } from "@types";
import React, { useEffect, useState } from "react";

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  params,
  setParams,
}) => {
  /**Pagination to show 10 records on 1 Page */
  const [currentPage, setCurrentPage] = useState(1);

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
    setParams({
      ...params,
      _page: currentPage,
      _limit: 10,
    });
  }, [currentPage]);

  return (
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
  );
};
