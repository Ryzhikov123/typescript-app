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
  const [searchNameValue, setSearchNameValue] = useState<string>('');
  const [searchPriceValue, setSearchPriceValue] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<IProduct[] | null>(null);
  const items = filteredProducts !== null? filteredProducts : products;
  const onChangePagination = (pageIndex: number, pageSize?: number) => {
    setProducts(null);
    getProducts({ pageIndex, pageSize });
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
  useEffect(() => {
    const filteredProducts = products?.filter(
      (product) =>
        product.name.includes(searchNameValue) &&
        String(product.price).includes(searchPriceValue)
    );
    filteredProducts && setFilteredProducts(filteredProducts);
  }, [searchNameValue, searchPriceValue]);
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
              value={searchNameValue}
              onChange={(e) => setSearchNameValue(e.target.value)}
            />
          </div>
          <div className="product__page-input-number">
            <Search
              placeholder="input search number"
              enterButton="Search"
              size="large"
              value={searchPriceValue}
              onChange={(e) => setSearchPriceValue(e.target.value)}
            />
          </div>
          <Pagination onChange={onChangePagination} total={300} />
        </div>
        <div className="products-page__list">
          {items === null ? (
            <Space size="middle">
              <Spin size="large" />
            </Space>
          ) : (
            items.length ? items.map((product: IProduct) => (
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
            )) : <div>Нет данных</div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
