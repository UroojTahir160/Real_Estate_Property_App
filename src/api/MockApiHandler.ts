import {
  ApiResponse,
  Property,
  PropertyListingParams,
} from "@types";
import axios, { AxiosResponse } from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPropertyDetailsById = async (
  propertyId: string
): Promise<Property | null> => {
  try {
    const response: AxiosResponse<Property> = await axios.get(
      `${BASE_URL}/realEstateListing/${propertyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching property details: ", error);
    return null;
  }
};

export const getPropertyList = async (
  params: PropertyListingParams
): Promise<ApiResponse> => {

  const singleObjectParams = mergeFiltersIntoParams(params);

  const filteredParams = Object.fromEntries(
    Object.entries(singleObjectParams).filter(
      ([_, value]) => value !== "" && value !== undefined
    )
  );

  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${BASE_URL}/realEstateListing`,
      {
        params: filteredParams,
      }
    );

    return {
      data: response.data as unknown as Property[],
      headers: { "x-total-count": response.headers["x-total-count"] },
    };
  } catch (error) {
    console.error("Error while fetching property list: ", error);
    return { data: [], headers: { "x-total-count": 0 } };
  }
};

// Merge params.filters into the main params object

const mergeFiltersIntoParams = (
  params: PropertyListingParams
): PropertyListingParams => {
  if (params.filters) {
    params = { ...params, ...params.filters };

    // Remove the filters property
    delete params.filters;
  }

  return params;
};
