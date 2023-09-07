import { Property } from "@types";

export interface PropertyListingParams {
  _page: number; // Page number for pagination
  _limit: number; // Number of items per page
  _order?: string; // Sorting order
  _sort?: string; // Property to sort by
  address_like?: string; // Full-text search query
  filters?: {
    price_lte?: number; // Maximum price filter
    price_gte?: number; // Minimum price filter
    beds?: string; // Number of bedrooms filter
    bath?: string; // Number of bathrooms filter
    propertyType?: string; // Property type filter
  };
}

export interface ApiResponse {
  data: Property[]; // Property List of type T (i-e Property)
  headers?: {
    "x-total-count": number; // 'x-total-count' is a number in the headers
  };
}
