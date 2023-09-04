import { Dispatch, SetStateAction } from "react";
import { Property } from "./property";
import { EViewMode } from "./enum";

export interface HomeProps {
  propertyList: Property[];
  isLoading: boolean;
}

export interface DataViewProps {
  paginatedData: Property[];
}

export interface ViewModesProps {
    activeTab: EViewMode;
    setActiveTab: Dispatch<SetStateAction<EViewMode>>;
}