import { useNavigate } from "react-router-dom";
// import useFetchProducts from "../hooks/useFetchProdutcs";
import type { ProductType } from "../data/types";
import ActionComponent from "./actionComponent";

import { FilterByCategory } from "../utils/filterByCtegory";
import { SortProducts } from "../utils/sortProducts";
import { FilterBySearch } from "../utils/filterBySearch";

import { Card, Image, Flex, Tag, Space, Typography, Radio } from "antd";
import { TableOutlined, BarsOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";

import "./productsPage.css"

const { Title, Paragraph, Text } = Typography;

interface Props {
    products: ProductType[];
    loading: boolean;
    error: string;
}

function ProductsPage({ products, loading, error }: Props) {
    const navigate = useNavigate();
    // const { products, loading, error } = useFetchProducts();

    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("title-asc");
    const [category, setCategory] = useState("All Category");

    const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");

    const filteredProducts = useMemo(() => {
        let result = products;

        result = FilterBySearch(result, search);
        result = FilterByCategory(result, category);
        result = SortProducts(result, order);

        return result;
    }, [products, search, order, category]);

    //console.log(products)

    if (loading) return <h3>Loading...</h3>;
    if (error) return <h3>Error.. {error}</h3>;

    return (
        <>

            <Flex
                style={{
                    padding: 16,
                    gap: 16,
                }}
                justify="space-between"
                align="center"
            >

                <Flex className="actionComponents">
                    <ActionComponent
                        search={search}
                        setSearch={setSearch}
                        category={category}
                        setCategory={setCategory}
                        order={order}
                        setOrder={setOrder}
                    />
                </Flex>

                <Radio.Group
                    value={layout}
                    onChange={(e) => setLayout(e.target.value)}
                    optionType="button"
                    buttonStyle="solid"
                >
                    <Radio.Button value="horizontal">
                        <TableOutlined />
                    </Radio.Button>

                    <Radio.Button value="vertical">
                        <BarsOutlined />
                    </Radio.Button>
                </Radio.Group>
            </Flex>

            <Flex
                wrap="wrap"
                gap={16}
                vertical={layout === "vertical"}
                style={{ padding: 16, width: "100%" }}
            >
                {filteredProducts.map((item: ProductType) => (
                    <Flex
                        key={item.id}
                        style={{
                            width: layout === "horizontal" ? "calc(50% - 8px)" : "100%",
                        }}
                    >
                        <Card
                            hoverable
                            style={{ width: "100%", height: "100%" }}
                            bodyStyle={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                            onClick={() => navigate(`/products/${item.id}`)}
                            cover={
                                <Image
                                    alt={item.title}
                                    src={item.image}
                                    preview={false}
                                    style={{
                                        height: 220,
                                        objectFit: "contain",
                                        padding: 10,
                                    }}
                                />
                            }
                        >
                            <Space direction="vertical" size={10} style={{ width: "100%" }}>
                                <Title level={5} style={{ margin: 0 }}>
                                    {item.title}
                                </Title>

                                <Flex justify="space-between" align="center">
                                    <Text strong style={{ fontSize: 20 }}>
                                        ₹{item.price}
                                    </Text>

                                    <Tag>{item.category}</Tag>
                                </Flex>

                                <Paragraph ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
                                    {item.description}
                                </Paragraph>
                            </Space>
                        </Card>
                    </Flex>
                ))}
            </Flex>
        </>
    );
}

export default ProductsPage;
