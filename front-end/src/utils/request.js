import axios from "axios";

const request = axios.create({
  baseURL:
    import.meta.env.VITE_ENV == "development"
      ? "http://localhost:3004/"
      : "https://blog1.production-server.tech/",
  withCredentials: true,
});

export default request;
