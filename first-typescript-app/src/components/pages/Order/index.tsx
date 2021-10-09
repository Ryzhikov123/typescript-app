import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
import { ORDER_ENDPOINT } from '../../../constants/endpoints';
import { getRequest, openErrorNotification, postRequest } from '../../../utils';
import { PageWrapper } from '../../wrappers/PageWrapper';
import { Form, Input, Button, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';

interface IOrderItemsList {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface IOrder {
  id: string;
  customerId: string;
  totalPrice: number;
  itemsList: IOrderItemsList[];
  createdAt: string;
}

export const OrderPage = () => {
  const { user } = useContext(UserContext);
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const onFinish = (order: any) => {
    postRequest(ORDER_ENDPOINT, {
      customerId: user?._id,
      totalPrice: 20,
      itemsList: order.orders.map((item: any, index: number) => ({
        ...item,
        id: index,
      })),
    })
      .then((res) => res.status === 201 && getOrdersList())
      .catch((err) =>
        openErrorNotification(
          err.response.data.error,
          err.response.data.message
        )
      );
  };
  const getOrdersList = () => {
    getRequest(ORDER_ENDPOINT)
      .then((res) => setOrderList(res.data))
      .catch((err) =>
        openErrorNotification(
          err.response.data.error,
          err.response.data.message
        )
      );
  };
  useEffect(() => {
    getOrdersList();
  }, []);
  return (
    <PageWrapper>
      <div className="order-page">
        <h1>Order</h1>
        <div className="order-page__new-order">
          <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.List name="orders">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        fieldKey={[fieldKey, 'name']}
                        rules={[{ required: true, message: 'Missing name' }]}
                      >
                        <Input placeholder="Order Name" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'image']}
                        fieldKey={[fieldKey, 'image']}
                        rules={[
                          { required: true, message: 'Missing image url' },
                        ]}
                      >
                        <Input placeholder="Image url" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'quantity']}
                        fieldKey={[fieldKey, 'quantity']}
                        rules={[
                          { required: true, message: 'Missing quantity' },
                        ]}
                      >
                        <Input placeholder="Quantity" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'price']}
                        fieldKey={[fieldKey, 'price']}
                        rules={[{ required: true, message: 'Missing price' }]}
                      >
                        <Input placeholder="Price" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="order-page__order-list">
          <Table
            columns={[
              { title: 'Order id', dataIndex: '_id', key: '_id' },
              {
                title: 'Total price',
                dataIndex: 'totalPrice',
                key: 'totalPrice',
                render: (value) => <span>${value}</span>,
              },
              {
                title: 'Create Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (value) => (
                  <span>{format(new Date(value), 'dd/MM/yyyy')}</span>
                ),
              },
            ]}
            expandable={{
              expandedRowRender: (record: IOrder) => (
                <div style={{ margin: 0 }}>
                  {record.itemsList.map((item) => (
                    <div key={item.id}>
                      <img
                        src={item.image}
                        alt="image"
                        width="100"
                        height="100"
                      />
                      {item.name} - {item.quantity} ${item.price}
                    </div>
                  ))}
                </div>
              ),
            }}
            dataSource={orderList.map((item: IOrder, index: number) => ({
              ...item,
              key: index,
            }))}
          />
        </div>
      </div>
    </PageWrapper>
  );
};
