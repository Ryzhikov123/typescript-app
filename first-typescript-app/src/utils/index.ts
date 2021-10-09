import axios from 'axios';
import {  notification } from 'antd';

export const getRequest = (url: string) =>
  axios.get(url, {
    headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
  });
export const postRequest = (url: string, payload: any) =>
  axios.post(url, payload, {
    headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  

export const openErrorNotification = (title: string, descr: string) => {
  notification.error({
    message: title,
    description: descr,
  });
};
