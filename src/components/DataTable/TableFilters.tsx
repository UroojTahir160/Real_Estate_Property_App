import React, { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Filters, ListingParamsProps } from "@types";

const propertyTypeOptions = [
  "House",
  "Apartment",
  "Bungalow",
  "Villa",
  "Cottage",
  "PentHouse",
];

const MIN_PRICE = 0;
const MAX_PRICE = 10000000;

export const TableFilters: React.FC<ListingParamsProps> = ({
  params,
  setParams,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [showClearFilterButton, setShowClearFilterButton] =
    useState<boolean>(false);

  const initialFilters: Filters = {
    minPrice: undefined,
    maxPrice: undefined,
    selectedPropertyType: "",
    beds: "",
    baths: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    setFilters({
      ...filters,
      maxPrice: value[1],
      minPrice: value[0],
    });
  };

  const applyFiltersHandler = () => {
    setParams({
      ...params,
      filters: {
        price_lte: filters.maxPrice,
        price_gte: filters.minPrice,
        beds: filters.beds,
        bath: filters.baths,
        propertyType: filters.selectedPropertyType,
      },
    });
    setShowClearFilterButton(true);
    resetFilters();
    setIsDropdownOpen(false);
  };

  /**Clear: It clears all the applied filters and get All the data from server. */

  const clearFilterHandler = () => {
    setParams({
      ...params,
      filters: initialFilters,
    });
    setShowClearFilterButton(false);
    setIsDropdownOpen(false);
  };

  /**Reset: It only reset all fields of filters on frontend.*/

  const resetFilters = () => {
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setFilters(initialFilters);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={showClearFilterButton ? clearFilterHandler : toggleDropdown}
        type="button"
        className="inline-flex font-Poppins justify-center w-full rounded-md border shadow-sm px-3 py-[10px] bg-cyan-700 text-sm font-medium text-orange-100 hover:bg-cyan-600 transition-all delay-100 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-5 mr-2 text-orange-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              showClearFilterButton
                ? "M6 18L18 6M6 6l12 12"
                : "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            }
          />
        </svg>

        {showClearFilterButton ? "Clear Filters" : "Filters"}
      </button>
      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-orange-100 divide-y divide-gray-300">
          <div className="py-4 px-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price Range:
              </label>
              <Slider
                trackStyle={{ backgroundColor: "#0E7490", height: 10 }}
                railStyle={{ backgroundColor: "lightblue", height: 10 }}
                handleStyle={{
                  borderColor: "bg-cyan-700",
                  height: 20,
                  width: 20,
                  marginLeft: 0,
                  marginTop: -5,
                  backgroundColor: "bg-cyan-900",
                }}
                range
                min={0}
                max={10000000}
                value={priceRange}
                onChange={(e) =>
                  handlePriceRangeChange(e as unknown as number[])
                }
              />

              <div className="flex justify-between mt-2">
                <span className="font-Poppins text-sm text-cyan-900">
                  PKR {priceRange[0].toLocaleString("en-US")}
                </span>
                <span className="font-Poppins text-sm text-cyan-900">
                  PKR {priceRange[1].toLocaleString("en-US")}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Property Type:
              </label>

              <select
                value={filters.selectedPropertyType || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    selectedPropertyType: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2"
              >
                <option key="" value={""}>
                  All
                </option>
                {propertyTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Beds:
                </label>
                <input
                  type="number"
                  value={filters.beds}
                  onChange={(e) =>
                    setFilters({ ...filters, beds: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2 focus-visible:outline-none focus:border-cyan-700 border"
                  min={1}
                  placeholder="Beds Count"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Baths:</label>
                <input
                  type="number"
                  value={filters.baths}
                  onChange={(e) =>
                    setFilters({ ...filters, baths: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2 focus-visible:outline-none focus:border-cyan-700 border"
                  min={1}
                  placeholder="Baths Count"
                />
              </div>
            </div>
          </div>
          <div className="p-4 flex gap-2">
            <button
              type="button"
              className="w-1/2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-700 text-base font-medium text-white hover:bg-cyan-600 sm:text-sm"
              onClick={applyFiltersHandler}
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              type="button"
              className="w-1/2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 sm:text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
