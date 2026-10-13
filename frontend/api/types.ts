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

export type CPUDetails = {
    core_count: number;
    core_clock: string;
    boost_clock: string | null;
    microarchitecture: string;
    tdp: number;
    graphics: string | null;
};

export type GPUDetails = {
    chipset: string;
    memory: string;
    core_clock: number | null;
    boost_clock: number | null;
    color: string | null;
    length: number | null;
};

export type ProductDetails = Product & {
    details: CPUDetails | GPUDetails | null;
};

export type ProductListResponse = {
    items: Product[];
    total: number;
    limit: number;
    offset: number;
};

export type CategoryFilter = "CPU" | "GPU" | null;