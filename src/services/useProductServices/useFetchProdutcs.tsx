import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/productsApi";
//import { getSingleProduct } from '../api/productsApi';

import { getProductsFromLS, initProductsToLS, } from "../../utils/productsLocalStorage";

import type { ProductType } from "../../data/types";

function useFetchProducts() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            // 1) Check localStorage first
            const lsProducts = getProductsFromLS();

            // If LS already has products -> use it
            if (lsProducts.length > 0) {
                setProducts(lsProducts);
                return;
            }

            // 2) Else fetch from API
            const res = await getAllProducts();

            // 3) Save to localStorage (only first time)
            initProductsToLS(res.data);

            // 4) Set state
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
