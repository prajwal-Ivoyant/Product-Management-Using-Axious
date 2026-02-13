import { useNavigate } from "react-router-dom";
import useFetchProducts from "../hooks/useFetchProdutcs";
import type { ProductType } from "../data/types";
import ActionComponent from "./actionComponent";
import { FilterByCategory } from "../utils/filterByCtegory";
import { SortProducts } from "../utils/sortProducts";
import { FilterBySearch } from "../utils/filterBySearch";

import { Card, Row, Col, Image, Flex, Tag, Space, Typography, Button } from "antd";
import { TableOutlined, BarsOutlined } from '@ant-design/icons';
import { useState, useMemo } from "react";

const { Title, Paragraph, Text } = Typography;
function ProductsPage() {
    const navigate = useNavigate();

    const { products, loading, error } = useFetchProducts();

    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("title-asc");
    const [category, setCategory] = useState("All Category");


    const filteredProducts = useMemo(() => {
        let result = products;

        result = FilterBySearch(result, search);
        result = FilterByCategory(result, category);
        result = SortProducts(result, order);


        return result;
    }, [products, search, order, category])

    if (loading) return <h3>Loading...</h3>;
    if (error) return <h3>Error.. {error}</h3>;

    return (
        <>
            <Flex style={{
                padding: "16px",
            }} >

                <div style={{ width: "95%" }}>
                    <ActionComponent
                        search={search}
                        setSearch={setSearch}
                        category={category}
                        setCategory={setCategory}
                        order={order}
                        setOrder={setOrder}
                    />
                </div>

                <Space>
                    <Button
                        size="large"
                        style={{ height: 40 }}
                        icon={<TableOutlined />}
                    />

                    <Button
                        size="large"
                        style={{ height: 40 }}
                        icon={<BarsOutlined />}
                    />
                </Space>
            </Flex>

            <Row gutter={[16, 16]}>
                {filteredProducts.map((item: ProductType) => (
                    <Col
                        key={item.id}
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xl={12}
                    >

                        <Card
                            hoverable
                            style={{ width: "100%", height: "100%" }}
                            bodyStyle={{ display: "flex", flexDirection: "column" }}
                            onClick={() => navigate(`/products/${item.id}`)}
                            cover={

                                <Image

                                    alt={item.title}
                                    src={item.image}
                                    style={{ height: 220, objectFit: "contain", padding: 10 }}

                                />

                            }
                        >
                            <Space direction="vertical" size={10} style={{ width: "100%" }}>
                                <Title level={5} style={{ margin: 0 }}>
                                    {item.title}
                                </Title>

                                <Flex justify="space-between" align="center">
                                    <Text strong style={{ fontSize: 20 }}>
                                        ${item.price}
                                    </Text>

                                    <Tag>{item.category}</Tag>
                                </Flex>

                                <Paragraph ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
                                    {item.description}
                                </Paragraph>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default ProductsPage;
