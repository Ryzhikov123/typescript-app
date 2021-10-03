import axios from 'axios';

export const getRequest = (url: string) =>
  axios.get(url, {
    headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
  });
