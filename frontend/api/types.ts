export type Category = {
    id: number;
    name: string;
};

export type Product = {
    id: number;
    name: string;
    unit_price: string | null;
    active: boolean;
    category: Category;
};

export type ProductListResponse = {
    items: Product[];
    total: number;
};