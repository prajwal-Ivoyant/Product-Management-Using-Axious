import { api } from "./axiousInstance";
import type { ProductType } from "../data/types";

export const getAllProducts = () => api.get('/products');
export const getSingleProduct = (id: number) => api.get(`/products/${id}`);
export const getByCategory = () => api.get('/products/category');

export const addProduct = (data: ProductType) => api.post('/products', data)
export const updateProduct = (id: number, data: ProductType) => api.put(`/products/${id}`, data);
export const deletProduct = (id: number) => api.delete(`/products/${id}`);