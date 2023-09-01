import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
export const DataTable = ({ paginatedData }) => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const navigate = useNavigate();

  const tableHeaderTitles = [
    "Title",
    "Address",
    "Bath",
    "Beds",
    "Type",
    "Price",
    "Actions",
  ];

  const getTableHeader = () => {
    return tableHeaderTitles.map((colTitle, index) => (
      <th
        className="px-4 py-2 text-md font-Lora font-semibold text-cyan-700 tracking-wider"
        key={index}
        onClick={() => handleSort(colTitle.toLowerCase())}
      >
        {colTitle}
        {(colTitle.toLowerCase() === "beds" ||
          colTitle.toLowerCase() === "bath" ||
          colTitle.toLowerCase() === "price") && (
          <span className="ml-1 text-xs">
            {sortColumn === colTitle.toLowerCase() && sortDirection === "asc"
              ? "▲"
              : "▼"}
          </span>
        )}
      </th>
    ));
  };

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (sortColumn) {
      const sortedList = [...paginatedData].sort((a, b) => {
        if (
          sortColumn === "beds" ||
          sortColumn === "bath" ||
          sortColumn === "price"
        ) {
          return sortDirection === "asc"
            ? a[sortColumn] - b[sortColumn]
            : b[sortColumn] - a[sortColumn];
        }
        return 0;
      });
      return sortedList;
    } else {
      return paginatedData;
    }
  }, [paginatedData, sortColumn, sortDirection]);

  return (
    <table className="max-w-full border divide-y divide-gray-200 bg-gray-100 shadow-md">
      <thead className="bg-orange-200">
        <tr>{getTableHeader()}</tr>
      </thead>
      <tbody className=" divide-y divide-gray-200 ">
        {sortedData.map((listing, index) => (
          <tr key={index}>
            <td className="p-4 whitespace-nowrap font-Poppins text-left">
              {listing.title}
            </td>
            <td className="p-4 whitespace-nowrap font-Poppins text-center">
              {listing.address}
            </td>
            <td className="p-4 whitespace-nowrap font-Poppins text-center">
              {listing.bath}
            </td>
            <td className="p-4 whitespace-nowrap text-center">
              {listing.beds}
            </td>
            <td className="p-4 whitespace-nowrap text-center">
              {listing.propertyType}
            </td>
            <td className="p-4 whitespace-nowrap text-center">
              {listing.price}
            </td>
            <td className="p-4 whitespace-nowrap text-center">
              <button
                className="text-cyan-900 hover:text-orange-300 text-center"
                onClick={() => navigate(`/property-details/${listing.id}`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
