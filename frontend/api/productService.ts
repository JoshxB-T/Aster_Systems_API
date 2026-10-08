import { apiRequest } from "./apiClient";
import { ENDPOINTS } from "./endpoints";
import { ProductListResponse } from "./types";

export async function getProducts(): Promise<ProductListResponse> {
    return apiRequest(ENDPOINTS.GET_PRODUCTS);
}