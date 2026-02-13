import { Select, Input, Flex } from "antd";

const { Search } = Input;

type ActionComponentProps = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;

    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;

    order: string;
    setOrder: React.Dispatch<React.SetStateAction<string>>;
};

function ActionComponent({
    search,
    setSearch,
    category,
    setCategory,
    order,
    setOrder,
}: ActionComponentProps) {
    return (
        <Flex gap="middle" align="center" style={{ width: "100%" }}>
            <Search
                value={search}
                placeholder="Search products..."
                allowClear
                enterButton="Search"
                size="large"
                style={{ width: "50%" }}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Select
                value={category}
                placeholder="Select Category"
                size="large"
                style={{ width: "20%" }}
                onChange={(val) => setCategory(val)}
                options={[
                    { value: "All Category", label: "All Category" },
                    { value: "Men's Clothing", label: "Men's Clothing" },
                    { value: "Electronics", label: "Electronics" },
                    { value: "Jewelery", label: "Jewelery" },
                    { value: "Women's Clothing", label: "Women's Clothing" },
                ]}
            />

            <Select
                value={order}
                size="large"
                style={{ width: "20%" }}
                onChange={(val) => setOrder(val)}
                options={[
                    { value: "title-asc", label: "Title (A-Z)" },
                    { value: "title-desc", label: "Title (Z-A)" },
                    { value: "price-asc", label: "Price (Low to High)" },
                    { value: "price-desc", label: "Price (High to Low)" },
                ]}
            />
        </Flex>
    );
}

export default ActionComponent;
