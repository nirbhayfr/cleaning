import axios from "axios";

export const http = axios.create({
	baseURL: "https://cleaning-service-uylo.onrender.com/api",
	withCredentials: false,
});
