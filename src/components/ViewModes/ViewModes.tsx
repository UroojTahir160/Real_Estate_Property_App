import { EViewMode, ViewModesProps } from "@types";
import React from "react";

export const ViewModes: React.FC<ViewModesProps> = ({ activeTab, setActiveTab }) => {
  const getButtonClass = (tabName: string) =>
    `inline-flex items-center justify-center whitespace-nowrap px-5 py-1 text-sm font-medium font-Poppins ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
      activeTab === tabName
        ? "bg-orange-200 text-foreground shadow rounded-md"
        : "bg-gray-200 text-foreground"
    }`;

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={`inline-flex h-[36px] items-center justify-center rounded-lg px-4 text-muted-foreground bg-gray-200 w-fit`}
      tabIndex={activeTab === EViewMode.LIST ? 0 : 1}
      data-orientation="horizontal"
    >
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "List"}
        data-state={activeTab === "List" ? "active" : "inactive"}
        className={getButtonClass(EViewMode.LIST)}
        tabIndex={0}
        data-orientation="horizontal"
        onClick={() => setActiveTab(EViewMode.LIST)}
      >
        List
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "Grid"}
        data-state={activeTab === "Grid" ? "active" : "inactive"}
        className={getButtonClass(EViewMode.GRID)}
        tabIndex={1}
        data-orientation="horizontal"
        onClick={() => setActiveTab(EViewMode.GRID)}
      >
        Grid
      </button>
    </div>
  );
};
