import { useState, useEffect } from 'react';
import { deletProduct } from '../api/productsApi';

import type { ProductType } from '../data/types';

function useDeleteProduct(id: number) {
    const [products, setProduct] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const funDeleteProduct = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await deletProduct(id);
            setProduct(res.data)
            console.log(res.data)
            return true;
        } catch (err) {
            setError(error)
            return false;
        } finally {
            setLoading(false)

        }
        return false
    };

    useEffect(() => {
        if (!id) return;
        funDeleteProduct();
    }, [id])

    console.log()

    return (
        { products, loading, error, funDeleteProduct }
    )
}

export default useDeleteProduct