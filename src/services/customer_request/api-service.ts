import axios from "axios";
import { HiringPost } from "./definition";

export const fetchAllHiringPostsAPI = async (): Promise<HiringPost[]> => {
  try {
    console.log("CUSTOMER_REQUEST (api-service) : fetching ...");
    const response = await axios.get("https://67b97a9d51192bd378dd88cf.mockapi.io/hiring-post");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const fetchHiringPostsByCustomerIdAPI = async (customerId : string): Promise<HiringPost[]> => {
    try {
      console.log("CUSTOMER_REQUEST (api-service) : fetching ...");
      const response = await axios.get("https://67b97a9d51192bd378dd88cf.mockapi.io/hiring-post");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };
