import { apiRequest } from "./apiClient";
import { ENDPOINTS } from "./endpoints";
import { ProductListResponse } from "./types";

export async function getProducts({ limit = 20, offset = 0 } = {}): Promise<ProductListResponse> {
    const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset)
    });

    return apiRequest(
        `${ENDPOINTS.GET_PRODUCTS}?${params.toString()}`
    );
}

export function getProduct(id: string) {
    return apiRequest(`${ENDPOINTS.GET_PRODUCTS}/${id}`);
}
