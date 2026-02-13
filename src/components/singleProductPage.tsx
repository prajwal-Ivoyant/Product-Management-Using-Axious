import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Divider, Row, Space, Tag, Typography, Image, Flex, Layout, Spin } from "antd";
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import useFectchOneProduct from "../hooks/useFectchOneProduct";
//import type { ProductType } from "../data/types";

import "./singleProductPage.css"

const { Title, Text, Paragraph } = Typography;

function SingleProductPage() {

    const navigate = useNavigate();
    const { id } = useParams();

    const productId = Number(id);

    const { product, loading, error } = useFectchOneProduct(productId);

    if (loading) return <Spin size="large" />
    if (error) return <h2>{error}</h2>
    if (!product) return <h2>Sorry, is no such Products</h2>



    return (
        <Layout className="singleProductLayout">
            <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: 20 }}
                className="topBar"
            >
                <Button
                    type="link"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/")}
                >
                    Back to home page
                </Button>

                <Space>
                    <Button icon={<EditOutlined />}>Edit</Button>
                    <Button danger type="primary" icon={<DeleteOutlined />}>
                        Delete
                    </Button>
                </Space>
            </Row>

            <Card size="small" className="productCard">
                <Flex className="productFlex">
                    <div className="productImageBox">
                        <Image alt={product.title} src={product.image} className="productImage" />
                    </div>

                    <div className="productDetails">
                        <Space style={{ marginBottom: 10 }}>
                            <Tag color="blue">{product.category}</Tag>
                            <Text type="secondary">ID: {product.id}</Text>
                        </Space>

                        <Title level={2} style={{ marginTop: 0 }}>
                            {product.title}
                        </Title>

                        <Title level={2} className="priceText">
                            ${product.price}
                        </Title>

                        <Text strong style={{ letterSpacing: 1 }}>
                            DESCRIPTION
                        </Text>

                        <Paragraph className="descText">{product.description}</Paragraph>

                        <Divider />
                    </div>
                </Flex>

                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Card className="infoCard">
                            <Text type="secondary">CATEGORY</Text>
                            <Title level={5} style={{ marginTop: 6 }}>
                                {product.category}
                            </Title>
                        </Card>
                    </Col>

                    <Col xs={24} md={12}>
                        <Card className="infoCard">
                            <Text type="secondary">PRODUCT ID</Text>
                            <Title level={5} style={{ marginTop: 6 }}>
                                {product.id}
                            </Title>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </Layout>
    )
}

export default SingleProductPage