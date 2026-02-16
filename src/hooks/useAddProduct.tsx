import { useState } from "react";
import { addProduct } from "../api/productsApi";
import type { ProductType } from "../data/types";

function useAddProducts() {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const funAddProduct = async (data: ProductType) => {
        try {
            setLoading(true);
            setError("");

            const res = await addProduct(data);
            console.log("add p res : ", res.data)
            setProduct(res.data);
            return res.data;

        } catch (err) {
            setError("Something went wrong");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { product, loading, error, funAddProduct };
}

export default useAddProducts;
