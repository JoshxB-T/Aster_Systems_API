import { apiRequest } from "./apiClient";
import { ENDPOINTS } from "./endpoints";
import { ProductListResponse, CategoryFilter } from "./types";

export async function getProducts({
    limit = 20,
    offset = 0,
    search = "",
    category = null
}: {
        limit?: number;
        offset?: number;
        search?: string;
        category?: import('./types').CategoryFilter;
    } = {}): Promise<ProductListResponse> {
    const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset)
    });

    if (search.trim()) {
        params.set("search", search.trim());
    }

    if (category) {
        params.set("category", category);
    }

    return apiRequest(
        `${ENDPOINTS.GET_PRODUCTS}?${params.toString()}`
    );
}

export function getProduct(id: string) {
    return apiRequest(`${ENDPOINTS.GET_PRODUCTS}/${id}`);
}
