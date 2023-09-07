import { Dispatch, SetStateAction } from "react";
import { Property } from "./property";
import { EViewMode } from "./enum";
import { PropertyListingParams } from "@types";

export interface ListingParamsProps {
  setParams: React.Dispatch<React.SetStateAction<PropertyListingParams>>;
  params: PropertyListingParams;
}
export interface PaginationProps extends ListingParamsProps {
  totalPages: number;
}

export type SearchInputProps = ListingParamsProps;
export interface DataViewProps extends ListingParamsProps {
  paginatedData: Property[];
}

export interface DataCardsProps {
  paginatedData: Property[];
}
export interface ViewModesProps {
  activeTab: EViewMode;
  setActiveTab: Dispatch<SetStateAction<EViewMode>>;
}

export type Filters = {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  selectedPropertyType: string;
  beds: string;
  baths: string;
};
