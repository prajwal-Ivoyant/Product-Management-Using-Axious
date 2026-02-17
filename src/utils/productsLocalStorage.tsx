import type { ProductType } from "../data/types";

const LS_KEY = "products_ls";

export const getProductsFromLS = (): ProductType[] => {
    const data = localStorage.getItem(LS_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveProductsToLS = (products: ProductType[]) => {
    localStorage.setItem(LS_KEY, JSON.stringify(products));
};

export const initProductsToLS = (products: ProductType[]) => {
    const already = localStorage.getItem(LS_KEY);
    if (!already) {
        saveProductsToLS(products);
    }
};

export const addProductToLS = (product: ProductType) => {
    const products = getProductsFromLS();

    const updated = [product, ...products];
    saveProductsToLS(updated);

    return product;
};

export const updateProductInLS = (id: number, updatedProduct: ProductType) => {
    const products = getProductsFromLS();

    const updated = products.map((p) =>
        p.id === id ? { ...p, ...updatedProduct, id } : p
    );

    saveProductsToLS(updated);

    return updated.find((p) => p.id === id);
};

export const deleteProductFromLS = (id: number) => {
    const products = getProductsFromLS();
    const updated = products.filter((p) => p.id !== id);

    saveProductsToLS(updated);
};

export const clearProductsLS = () => {
    localStorage.removeItem(LS_KEY);
};
