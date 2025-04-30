import axios from 'axios';

const federatedAxios = axios.create({
  baseURL: '/federated', // 通过Vite代理到Python后端
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
