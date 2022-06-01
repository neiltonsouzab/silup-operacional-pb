import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pb.silup.com.br/api',
});

export default api;
