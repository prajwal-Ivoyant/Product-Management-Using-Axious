import { useState, useEffect } from 'react';
import { getSingleProduct } from '../api/productsApi';

import type { ProductType } from '../data/types';

function useFectchOneProduct(id: number) {
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSingleProducts = async () => {
    try {
      setLoading(true)
      setError("")
      const res = await getSingleProduct(id);
      setProduct(res.data)
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
    { product, loading, error, reFetch: fetchSingleProducts }
  )
}

export default useFectchOneProduct