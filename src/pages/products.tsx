import { useState, useEffect } from "react";
import ProductsPage from "../components/productsPage";
import AddNewProduct from "../components/addNewProduct";
import useFetchProducts from "../hooks/useFetchProdutcs";

import { clearProductsLS } from "../utils/productsLocalStorage";

import { Button, Flex, Layout, message, Modal, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

import type { ProductType } from "../data/types";

import "./products.css"

const { Header, Footer, Content } = Layout;

function Products() {
    const { products, loading, error, refetch } = useFetchProducts();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState<ProductType[]>(products);

    useEffect(() => {
        setItems(products);
    }, [products]);

    const confirmReset = () => {
        Modal.confirm({
            title: "Reset products to original?",
            icon: <ExclamationCircleOutlined />,
            content:
                "This will remove all your added, edited, and deleted products. This action cannot be undone.",
            okText: "Yes, Reset",
            okType: "danger",
            cancelText: "Cancel",

            onOk: async () => {
                try {
                    // 1) Clear LS
                    clearProductsLS();

                    // 2) Refetch (hook will now fetch from API)
                    await refetch();

                    message.success("Products reset to original!");
                } catch (err) {
                    message.error("Reset failed!");
                }
            },
        });
    };

    return (
        <div>
            <Flex gap="middle" wrap>
                <Layout>
                    <Layout className="productsLayout">
                        <Header className="productsHeader">
                            <Flex justify="space-between" align="center" className="productsHeaderInner">

                                <Title className="brand">SHOPIFY<span>.</span></Title>


                                <Flex gap={10} className="headerBtns">
                                    <Button className="btnReset" onClick={confirmReset}>
                                        Reset
                                    </Button>

                                    <Button className="btnAdd" onClick={() => setIsModalOpen(true)}>
                                        + Add Product
                                    </Button>
                                </Flex>
                            </Flex>
                        </Header>


                        <Content>
                            <ProductsPage products={items} loading={loading} error={error} />
                        </Content>

                        <Footer>Footer</Footer>
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
    );
}

export default Products;
