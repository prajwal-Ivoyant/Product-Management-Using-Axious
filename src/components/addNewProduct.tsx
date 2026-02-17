import React from "react";
import { Modal, Form, Input, InputNumber, Select, message } from "antd";
import type { ProductType } from "../data/types";

import { addProductToLS } from "../utils/productsLocalStorage";
import { addProduct } from "../api/productsApi";
import "./addNewProduct.css"

const { TextArea } = Input;

interface Props {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setItems: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const AddNewProduct = ({ isModalOpen, setIsModalOpen, setItems }: Props) => {
    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const res = await addProduct(values)
            //console.log(res)
            // 👇 Add to LocalStorage (REAL persistence)
            const newProduct = addProductToLS(res.data);
            console.log(newProduct)
            // 👇 Update UI instantly
            setItems((prev) => [newProduct, ...prev]);

            message.success("Product added successfully!");
            setIsModalOpen(false);
            form.resetFields();
        } catch (err) {
            message.error("Failed to add product!");
        }
    };

    return (
        <Modal
            title="Add New Product"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Add Product"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Please enter product title" }]}
                >
                    <Input placeholder="Enter product title" />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Please enter product price" }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        min={0}
                        step={0.01}
                        placeholder="Enter price"
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "Please enter product description" }]}
                >
                    <TextArea rows={4} placeholder="Enter product description" />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Please select category" }]}
                >
                    <Select
                        placeholder="Select category"
                        options={[
                            { value: "electronics", label: "Electronics" },
                            { value: "jewelery", label: "Jewelery" },
                            { value: "men's clothing", label: "Men's Clothing" },
                            { value: "women's clothing", label: "Women's Clothing" },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="Image URL"
                    name="image"
                    rules={[
                        { required: true, message: "Please enter image url" },
                        { type: "url", message: "Please enter a valid URL" },
                    ]}
                >
                    <Input placeholder="https://example.com/image.png" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddNewProduct;
