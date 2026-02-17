import { Select, Input, Flex } from "antd";

const { Search } = Input;

import { ProductCategory, SortOrder } from "../utils/enums";

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

    const categoryOptions = Object.values(ProductCategory).map((val) => ({
        value: val,
        label: val,
    }));

    const sortOptions = Object.values(SortOrder).map((val) => ({
        value: val,
        label: val,
    }));

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
                options={categoryOptions}
            />

            <Select
                value={order}
                size="large"
                style={{ width: "20%" }}
                onChange={(val) => setOrder(val)}
                options={sortOptions}
            />
        </Flex>
    );
}

export default ActionComponent;
