import axios from 'axios';

const federatedAxios = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Python后端地址
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export const federatedPOST = async (url: string, params: any) => {
  const response = await federatedAxios.post(url, params);
  return response.data;
};

export const federatedGET = async (url: string, params?: any) => {
  const response = await federatedAxios.get(url, { params });
  return response.data;
};
