import { useState, useEffect } from 'react';
import ProductsPage from '../components/productsPage';
import { Button } from 'antd';
import AddNewProduct from '../components/addNewProduct';
import useFetchProducts from "../hooks/useFetchProdutcs";



import { Flex, Layout } from 'antd';
import type { ProductType } from '../data/types';

const { Header, Footer, Content } = Layout;


function Products() {

    //const STORAGE_KEY = "my_products";

    const { products, loading, error } = useFetchProducts();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState<ProductType[]>(products)


    // // ✅ load initial items from localStorage
    // const [items, setItems] = useState<ProductType[]>(() => {
    //     const saved = localStorage.getItem(STORAGE_KEY);
    //     return saved ? JSON.parse(saved) : [];
    // });

    // // ✅ when API products comes first time, store in local storage only if storage empty
    // useEffect(() => {
    //     if (products.length > 0 && items.length === 0) {
    //         setItems(products);
    //         localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    //     }
    // }, [products]);

    // // ✅ every time items changes, save it
    // useEffect(() => {
    //     localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // }, [items]);

    useEffect(() => {
        setItems(products);
    }, [products]);


    console.log("items : ", items)
    console.log("products :", products)


    return (
        <div>

            <Flex gap="middle" wrap>

                <Layout>

                    <Layout>

                        <Header>
                            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                                <h1>Products</h1>

                                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                                    + Add Product
                                </Button>
                            </Flex>
                        </Header>

                        <Content>
                            <ProductsPage products={items} loading={loading} error={error} />
                        </Content>

                        <Footer >Footer</Footer>

                    </Layout>

                </Layout>

            </Flex>

            {isModalOpen && (
                <AddNewProduct
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setItems={setItems}
                />
            )}


        </div>
    )
}

export default Products