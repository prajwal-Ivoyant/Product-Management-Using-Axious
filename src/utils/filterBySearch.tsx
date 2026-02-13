import type { ProductType } from "../data/types";

export function FilterBySearch(products: ProductType[], search: string) {
    if (!search.trim()) return products;

    return products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );
}