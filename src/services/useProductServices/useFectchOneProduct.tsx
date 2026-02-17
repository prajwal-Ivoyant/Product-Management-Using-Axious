import { useState, useEffect } from 'react';

import { getProductsFromLS } from '../../utils/productsLocalStorage';
import { getSingleProduct } from '../../api/productsApi';

import type { ProductType } from '../../data/types';

function useFectchOneProduct(id: number) {
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSingleProducts = async () => {
    try {
      setLoading(true);
      setError("");

      // 1) First check localStorage
      const products = getProductsFromLS();
      const found = products.find((p) => p.id === id);

      if (found) {
        setProduct(found);
        return;
      }

      // 2) fallback to API (only if LS doesn't have it)
      const res = await getSingleProduct(id);
      setProduct(res.data);
    } catch (err) {
      setError(error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchSingleProducts();
  }, [])

  console.log()

  return (
    { product, loading, error, refetch: fetchSingleProducts }
  )
}

export default useFectchOneProduct