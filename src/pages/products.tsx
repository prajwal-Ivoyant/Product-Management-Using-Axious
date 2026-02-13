import ProductsPage from '../components/productsPage';
import { Button } from 'antd';


import { Flex, Layout } from 'antd';
const { Header, Footer, Content } = Layout;

function Products() {
    return (
        <div>

            <Flex gap="middle" wrap>


                <Layout>

                    <Layout>

                        <Header>
                            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                                <h1 style={{ margin: 0 }}>Products</h1>

                                <Button type="primary">
                                    + Add Product
                                </Button>
                            </Flex>
                        </Header>


                        <Content>
                            <ProductsPage />
                        </Content>

                        <Footer >Footer</Footer>

                    </Layout>

                </Layout>

            </Flex>


        </div>
    )
}

export default Products