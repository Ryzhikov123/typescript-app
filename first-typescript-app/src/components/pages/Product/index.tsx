import React, { useState, useEffect } from 'react';
import { PRODUCTS_ENDPOINT } from '../../../constants/endpoints';
import { getRequest, openErrorNotification } from '../../../utils';
import { PageWrapper } from '../../wrappers/PageWrapper';
import { IProduct } from '../Products';
import { Spin, Space, Image, Progress, Rate } from 'antd';
import './styles.scss';

interface IAbility {
  title: string;
  description: string;
}

interface IStat {
  title: string;
  value: number;
}

export interface IFullProduct extends IProduct {
  abilities: IAbility[];
  stats: IStat[];
}

export const ProductPage = () => {
  const productId = window.location.pathname.split('/')[2];
  const [product, setProduct] = useState<IFullProduct | null>(null);
  const getProduct = () => {
    getRequest(`${PRODUCTS_ENDPOINT}/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) =>
        openErrorNotification(
          err.response.data.error,
          err.response.data.message
        )
      );
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <PageWrapper>
      {product === null ? (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      ) : (
        <div className="product-page">
          <div className="product-page__main-block">
            <div>
              <Image src={product?.image} />
              <div className="product-page__main-block-title">
                <b>{product?.id}</b> {product?.name}
              </div>
            </div>
            <div>
              {product?.stats.map((stat: IStat) => {
                const status =
                  stat.value > 80
                    ? 'success'
                    : stat.value < 50
                    ? 'exception'
                    : 'active';
                return (
                  <div key={stat.title} className="product-page__stat">
                    <div>{stat.title}</div>
                    <Progress
                      percent={stat.value}
                      status={status}
                      format={() => stat.value}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="product-page__other-block">
            {product?.abilities.map((item) => (
              <div key={item.title} className="ability">
                <div className="ability-title">{item.title}</div>
                <div className="ability-descr">{item.description}</div>
              </div>
            ))}
          </div>
          <div className="product-page__result">
            <Rate
              value={
                product?.stats.reduce(
                  (current: number, next: IStat) => current + next.value,
                  0
                ) /
                (product.stats.length * 20)
              }
            />
          </div>
        </div>
      )}
    </PageWrapper>
  );
};
