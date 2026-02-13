import type { ProductType } from "../data/types";

export function FilterByCategory(products: ProductType[], category: string) {
    if (!category || category === "All Category") return products;

    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}