import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getRequest, openErrorNotification } from '../../../utils';
import { PageWrapper } from '../../wrappers/PageWrapper';
import { Card, Spin, Space } from 'antd';
import './styles.scss';
import { PRODUCTS_ENDPOINT } from '../../../constants/endpoints';
import { Pagination } from 'antd';
import { useHistory } from 'react-router';
import { Input } from 'antd';
import { log } from 'console';
const { Meta } = Card;
const { Search } = Input;

interface IInputValue {
  value: string;
}

export interface IProduct {
  id: number;
  image: string;
  name: string;
  price: number;
}

export const ProductsPage = () => {
  const history = useHistory();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const onChangePagination = (pageIndex: number, pageSize?: number) => {
    setProducts(null);
    getProducts({ pageIndex, pageSize });
  };
  const onSearchInputName = (value: string) => {
    products === null ? (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    ) : (
      setProducts(
        products.filter((product: IProduct) => product.name.includes(value))
      )
    );
  };
  const onSearchInputPrice = (value: string) => {
    products === null ? (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    ) : (
      setProducts(
        products.filter((product: IProduct) =>
          product.price.toString().includes(value)
        )
      )
    );
  };
  const getProducts = (pageInfo?: { pageIndex: number; pageSize?: number }) => {
    const query = pageInfo
      ? `?page=${pageInfo.pageIndex}&limit=${pageInfo?.pageSize}`
      : '';
    getRequest(`${PRODUCTS_ENDPOINT}${query}`)
      .then((res) => setProducts(res.data))
      .catch((err) =>
        openErrorNotification(
          err.response.data.error,
          err.response.data.message
        )
      );
  };
  useEffect(() => getProducts(), []);
  return (
    <PageWrapper>
      <div className="products-page">
        <h1>Products</h1>
        <div className="products-page__total">
          <div>Total: {products?.length}</div>
          <div className="product__page-input-string">
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={onSearchInputName}
            />
          </div>
          <div className="product__page-input-number">
            <Search
              placeholder="input search number"
              enterButton="Search"
              size="large"
              onSearch={onSearchInputPrice}
            />
          </div>
          <Pagination onChange={onChangePagination} total={300} />
        </div>
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
                onClick={() =>
                  history.push(`${window.location.pathname}/${product.id}`)
                }
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
