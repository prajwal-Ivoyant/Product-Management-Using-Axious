import { useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Card,
    Col,
    Divider,
    Row,
    Space,
    Tag,
    Typography,
    Image,
    Flex,
    Layout,
    Spin,
    message,
    Form,
    Input,
    InputNumber,
    Select,
} from "antd";

import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";

import useFectchOneProduct from "../hooks/useFectchOneProduct";
import useDeleteProduct from "../hooks/useDeleteProduct";
import { updateProduct } from "../api/productsApi";

import "./singleProductPage.css";
import { useEffect, useState } from "react";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function SingleProductPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const { id } = useParams();
    const productId = Number(id);

    const { product, loading, error } = useFectchOneProduct(productId);
    const { funDeleteProduct } = useDeleteProduct(productId);

    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
            });
        }
    }, [product]);

    if (loading) return <Spin size="large" />;
    if (error) return <h2>{error}</h2>;
    if (!product) return <h2>Sorry, no such product</h2>;

    const handleDelete = async () => {
        try {
            await funDeleteProduct();
            message.success("Product deleted successfully!");
            navigate("/");
        } catch (err) {
            message.error("Product not deleted!");
        }
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            const updatedData = {
                ...product,
                ...values,
            };

            await updateProduct(productId, updatedData);

            message.success("Product updated successfully!");
            setIsEditing(false);
        } catch (err) {
            message.error("Update failed!");
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);

        form.setFieldsValue({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
        });
    };

    return (
        <Layout className="singleProductLayout">
            <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: 20 }}
                className="topBar"
            >
                <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate("/")}>
                    Back to home page
                </Button>

                <Space>
                    {!isEditing ? (
                        <>
                            <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
                                Edit
                            </Button>

                            <Button danger type="primary" icon={<DeleteOutlined />} onClick={handleDelete}>
                                Delete
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
                                Save
                            </Button>

                            <Button icon={<CloseOutlined />} onClick={handleCancelEdit}>
                                Cancel
                            </Button>
                        </>
                    )}
                </Space>
            </Row>

            <Card size="small" className="productCard">
                <Flex className="productFlex">

                    <div className="productImageBox">
                        {!isEditing ? (
                            <Image alt={product.title} src={product.image} className="productImage" />
                        ) : (
                            <Form form={form} layout="vertical">
                                <Form.Item
                                    label="Image URL"
                                    name="image"
                                    rules={[
                                        { required: true, message: "Please enter image url" },
                                        { type: "url", message: "Please enter valid url" },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                        )}
                    </div>



                    <div className="productDetails">
                        <Space style={{ marginBottom: 10 }}>
                            <Tag color="blue">{product.category}</Tag>
                            <Text type="secondary">ID: {product.id}</Text>
                        </Space>

                        {!isEditing ? (
                            <>
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
                            </>
                        ) : (
                            <Form form={form} layout="vertical">
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[{ required: true, message: "Enter title" }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Price"
                                    name="price"
                                    rules={[{ required: true, message: "Enter price" }]}
                                >
                                    <InputNumber style={{ width: "100%" }} min={0} step={0.01} />
                                </Form.Item>

                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[{ required: true, message: "Select category" }]}
                                >
                                    <Select
                                        options={[
                                            { value: "electronics", label: "Electronics" },
                                            { value: "jewelery", label: "Jewelery" },
                                            { value: "men's clothing", label: "Men's Clothing" },
                                            { value: "women's clothing", label: "Women's Clothing" },
                                        ]}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Description"
                                    name="description"
                                    rules={[{ required: true, message: "Enter description" }]}
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                            </Form>
                        )}

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
    );
}

export default SingleProductPage;
