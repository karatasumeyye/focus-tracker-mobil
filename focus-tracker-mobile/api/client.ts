import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://10.0.2.2:8000/"; 
// Örn: http://192.168.1.15:8000

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

// Request interceptor → token'i header'a ekle
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
