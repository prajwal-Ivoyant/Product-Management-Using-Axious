import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useFectchOneProduct from "../services/useProductServices/useFectchOneProduct";

import {
    deleteProductFromLS,
    updateProductInLS,
} from "../utils/productsLocalStorage";

import { deleteProduct, updateProduct } from "../api/productsApi";

import {
    Button,
    Card,
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
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
    Modal,
} from "antd";

import {
    ArrowLeftOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined,
    CloseOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";

import "./singleProductPage.css";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function SingleProductPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [form] = Form.useForm();

    const navigate = useNavigate();
    const { id } = useParams();
    const productId = Number(id);

    const { product, loading, error, refetch } = useFectchOneProduct(productId);

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
    }, [product, form]);

    if (loading) return <Spin size="large" />;
    if (error) return <h2>{error}</h2>;
    if (!product) return <h2>Sorry, no such product</h2>;

    const confirmDelete = () => {
        Modal.confirm({
            title: "Delete this product?",
            icon: <ExclamationCircleOutlined />,
            content: "This action cannot be undone.",
            okText: "Yes, Delete",
            okType: "danger",
            cancelText: "Cancel",

            onOk: async () => {
                try {
                    setIsDeleting(true);

                    //this api call is doing nothing
                    await deleteProduct(product.id)

                    //this is deleting the product from LS
                    deleteProductFromLS(product.id);

                    message.success("Product deleted successfully!");
                    navigate("/");
                } catch (err) {
                    message.error("Product not deleted!");
                } finally {
                    setIsDeleting(false);
                }
            },
        });
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);

            const values = await form.validateFields();

            const res = await updateProduct(productId, values)
            //console.log("res from update", res)

            updateProductInLS(productId, res.data);

            message.success("Product updated successfully!");
            setIsEditing(false);

            refetch();
        } catch (err) {
            message.error("Update failed!");
        } finally {
            setIsSaving(false);
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
                <Button
                    type="link"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/")}
                >
                    Back to home page
                </Button>

                <Space>
                    {!isEditing ? (
                        <>
                            <Button
                                icon={<EditOutlined />}
                                onClick={() => setIsEditing(true)}
                                disabled={isDeleting}
                            >
                                Edit
                            </Button>

                            <Button
                                danger
                                type="primary"
                                icon={<DeleteOutlined />}
                                onClick={confirmDelete}
                                loading={isDeleting}
                                disabled={isSaving}
                            >
                                Delete
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                onClick={handleSave}
                                loading={isSaving}
                                disabled={isDeleting}
                            >
                                Save
                            </Button>

                            <Button
                                icon={<CloseOutlined />}
                                onClick={handleCancelEdit}
                                disabled={isSaving || isDeleting}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </Space>
            </Row>

            <Card size="small" className="productCard">
                <Form form={form} layout="vertical">
                    <Flex className="productFlex">
                        <div className="productImageBox">
                            {!isEditing ? (
                                <Image
                                    alt={product.title}
                                    src={product.image}
                                    className="productImage"
                                />
                            ) : (
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
                            )}
                        </div>

                        <div className="productDetails">
                            <Space className="metaRow">
                                <Tag className="categoryPill">{product.category}</Tag>
                                <Text className="idPill">ID: {product.id}</Text>
                            </Space>


                            {!isEditing ? (
                                <>
                                    <Title level={2} style={{ marginTop: 0 }}>
                                        {product.title}
                                    </Title>

                                    <Title level={2} className="priceText">
                                        ₹{product.price}
                                    </Title>

                                    <Text strong style={{ letterSpacing: 1 }}>
                                        DESCRIPTION
                                    </Text>

                                    <Paragraph className="descText">
                                        {product.description}
                                    </Paragraph>
                                </>
                            ) : (
                                <>
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
                                        <InputNumber
                                            style={{ width: "100%" }}
                                            min={0}
                                            step={0.01}
                                        />
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
                                </>
                            )}

                            <Divider />

                            <Flex justify="space-evenly">
                                <Button>Buy</Button>
                                <Button>Add to cart</Button>
                            </Flex>
                        </div>
                    </Flex>
                </Form>



            </Card>
        </Layout>
    );
}

export default SingleProductPage;
