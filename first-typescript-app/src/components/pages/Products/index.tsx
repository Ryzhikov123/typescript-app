import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getRequest } from '../../../utils';
import { PageWrapper } from '../../wrappers/PageWrapper';
import { Card, Spin, Space } from 'antd';
import './styles.scss';
import { PRODUCTS_ENDPOINT } from '../../../constants/endpoints';
const { Meta } = Card;

interface IProduct {
  id: number;
  image: string;
  name: string;
  price: number;
}

export const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const getProducts = () => {
    getRequest(PRODUCTS_ENDPOINT)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => getProducts(), []);
  return (
    <PageWrapper>
      <div className="products-page">
        <h1>Products</h1>
        <div className="products-page__total">Total: {products?.length}</div>
        <div className="products-page__list">
          {products === null ? (
            <Space size="middle">
              <Spin size="large" />
            </Space>
          ) : (
            products.map((product: IProduct) => (
              <Card
                key={product.id}
                hoverable
                cover={<img alt="example" src={product.image} />}
              >
                <Meta
                  title={product.name}
                  description={`Price: $${product.price}`}
                />
              </Card>
            ))
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
