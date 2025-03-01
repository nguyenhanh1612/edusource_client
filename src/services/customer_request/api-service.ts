import axios from "axios";
import { CreateHiringPostRequest, HiringPostListResponse } from "./definition";

// Create an axios instance
const apiClient = axios.create({
  baseURL: "https://67b97a9d51192bd378dd88cf.mockapi.io",
});

// Add an interceptor to include the token in every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Fetch all hiring posts
export const fetchAllHiringPostsAPI = async (): Promise<HiringPostListResponse[]> => {
  try {
    console.log("CUSTOMER_REQUEST (api-service) : fetching ...");
    const response = await apiClient.get("/hiring-post");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};


// Create a new hiring post
export const createHiringPostAPI = async (postData: CreateHiringPostRequest): Promise<string> => {
  try {
    const response = await apiClient.post("/hiring-post", postData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create hiring post");
  }
};


//view detail

//create comment

//staff upload file cho customer => update  