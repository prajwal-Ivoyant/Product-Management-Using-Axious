import { useState } from "react";
import { updateProduct } from "../api/productsApi";

import type { ProductType } from "../data/types";

function useUpdateProducts(id: number, data: ProductType) {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const funUpdateProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await updateProduct(id, data);
            setProduct(res.data);
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { product, loading, error, funUpdateProducts };
}

export default useUpdateProducts;
