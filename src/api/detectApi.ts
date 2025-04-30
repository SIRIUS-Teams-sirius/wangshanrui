import axios from 'axios';

const detectAxios = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Python后端地址
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
