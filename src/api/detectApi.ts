import axios from 'axios';

const detectAxios = axios.create({
  baseURL: '/detect', // 通过Vite代理到Python后端
  timeout: 20000,
});

export const detectTraffic = async (file: File, location: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('location', location);
  const response = await detectAxios.post('/server/detect', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
