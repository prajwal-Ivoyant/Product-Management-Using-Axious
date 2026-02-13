import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productsApi";
import { getSingleProduct } from '../api/productsApi';

import type { ProductType } from "../data/types";

function useFetchProducts(id?: number) {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            // both one product n list of products
            const res = id ? await getSingleProduct(id) : await getAllProducts();
            setProducts(res.data);
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loading, error, refetch: fetchProducts };
}

export default useFetchProducts;
