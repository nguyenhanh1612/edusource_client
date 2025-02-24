import axios from "axios";
import { HiringPost } from "./definition";

export const fetchHiringPostsAPI = async (): Promise<HiringPost[]> => {
  try {
    const response = await axios.get("https://67b97a9d51192bd378dd88cf.mockapi.io/hiring-post");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

