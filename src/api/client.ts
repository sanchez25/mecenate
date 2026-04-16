import axios from "axios";

export const api = axios.create({
  baseURL: "https://k8s.mectest.ru/test-app",
  timeout: 10000,
});

const DEMO_UUID = "550e8400-e29b-41d4-a716-446655440000";

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${DEMO_UUID}`;
  return config;
});