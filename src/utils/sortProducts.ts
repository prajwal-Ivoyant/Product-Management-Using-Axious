import type { ProductType } from "../data/types";

export function SortProducts(products: ProductType[], order: string) {
    const sorted = [...products]; // important: don't mutate original

    switch (order) {
        case "title-asc":
            return sorted.sort((a, b) => a.title.localeCompare(b.title));

        case "title-desc":
            return sorted.sort((a, b) => b.title.localeCompare(a.title));

        case "price-asc":
            return sorted.sort((a, b) => a.price - b.price);

        case "price-desc":
            return sorted.sort((a, b) => b.price - a.price);

        default:
            return sorted;
    }
}