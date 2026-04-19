import { ACCESS_TOKEN, BASE_URL } from "@/constants/api.constant";
import axios, { AxiosInstance } from "axios";

class ApiClient {
  authorizedClient: AxiosInstance;

  constructor() {
    this.authorizedClient = axios.create({
      baseURL: BASE_URL,
    });

    this.authorizedClient.interceptors.request.use(async function (config) {
      config.headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
      config.params = config.params;
      return config;
    });
  }
}

const client = new ApiClient();

export default client;
