import axios from "axios";
import { BookSelectBoxResponse, CommentUser, CreateHiringPostRequest, HiringPostDetailResponse, HiringPostListResponse } from "./definition";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ynukcgulpeejixpngtvv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludWtjZ3VscGVlaml4cG5ndHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3Mjk3NDgsImV4cCI6MjA1NzMwNTc0OH0.rfuwAZYfalGXhi69MSb0xR7Kbo1SO_umBmm_8UQjARI";

const supabase = createClient(supabaseUrl, supabaseKey);

// Create an axios instance
const apiClient = axios.create({
  baseURL: "https://67b97a9d51192bd378dd88cf.mockapi.io",
});

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
    const response = await apiClient.get("/hiring-post");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
//Fetch hiring post by the customer id
export const fetchCustomerPersonalHiringAPI = async (customerId: string): Promise<HiringPostListResponse[]> => {
  try {
    const response = await apiClient.get("/hiring-post");
    return response.data.filter((post: HiringPostListResponse) => post.customerId === customerId);
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
//Fetch hiring post detail by the id
export const fetchDetailHiringPostByIdAPI = async (id: number): Promise<HiringPostDetailResponse> => {
  try {
    const response = await apiClient.get(`/hiring-post/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

//Post to create the hiring post
export const createHiringPostAPI = async (postData: CreateHiringPostRequest): Promise<string> => {
  try {
    const response = await apiClient.post("/hiring-post", postData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create hiring post");
  }
};

// Assign the task
export const assignTaskAPI = async (postId: number, staffId: string, staffName: string): Promise<string> => {
  try {
    console.log(postId + " " + staffId + " " + staffName);
    const response = await apiClient.put(`/hiring-post/${postId}`, { staffId, staffName });
    return "OK";
  } catch (e) {
    throw new Error("Failed to assign task");
  }
};

const getLinkFile = async (fileInput: File): Promise<string | null> => {
  try {
    const bucketName = "fu-testing"; // ✅ Correct bucket name
    const filePath = `uploads/${Date.now()}_${fileInput.name}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileInput, {
        cacheControl: "3600",
        upsert: false, // Prevents overwriting existing files
      });

    if (error || !data) {
      console.error("Supabase Upload Error:", error?.message || "Unknown error");
      return null;
    }

    // ✅ Get public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Unexpected Upload Error:", err);
    return null;
  }
};

// Put method to upload the file
export const uploadCompleteFileAPI = async (postId: number, file: File): Promise<string> => {
  try {
    const fileUrl = await getLinkFile(file);
    if (!fileUrl) {
      throw new Error("Failed to upload file to Supabase");
    }
    const response = await apiClient.put(`/hiring-post/${postId}`, { file: fileUrl });
    return fileUrl;
  } catch (e) {
    throw new Error("Failed to upload file");
  }
};

// Put method to upload the demo file
export const uploadDemoFileAPI = async (postId: number, file: File): Promise<string> => {
  try {
    const fileUrl = await getLinkFile(file);

    if (!fileUrl) {
      throw new Error("Failed to upload file to Supabase");
    }
    const response = await apiClient.put(`/hiring-post/${postId}`, { demoFile: fileUrl, status: "ready" });
    return fileUrl;
  } catch (e) {
    throw new Error("Failed to upload file");
  }
};

//Fetch book select box
export const fetchBookSelectBoxAPI = async (): Promise<BookSelectBoxResponse[]> => {
  throw new Error("Please using book data from client side");
}

//Fetch All Comment base on the hiring post id
export const fetchCommentAPI = async (postId: number): Promise<CommentUser[]> => {
  try {
    const response = await apiClient.get(`/comment?postId=${postId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch comment");
  }
}
//Post method to comment to the specific hiring post
export const postCommentAPI = async (request: CommentUser): Promise<string> => {
  try {
    const response = await apiClient.post("/comment", request);
    return "OK";
  } catch (error) {
    throw new Error("Failed to create comment");
  }
}



//create edusource client instance
const EduSourceClient = axios.create({
  baseURL: "https://edusource-fwchfeb2hra6haat.southeastasia-01.azurewebsites.net/api"
});

EduSourceClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const GetThePaymentURLAPI = async (postId: number, postTitle: string): Promise<string> => {
  try {
    const response = await EduSourceClient.post("/CustomerRequestPayment", { postId, postTitle });
    return response.data.paymentUrl;
  } catch (error) {
    throw new Error("Failed to gen QR code");
  }
}



//CHAT BOT

const ChatBotClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const sendMessageAPI = async (message: string): Promise<string> => {
  try {
    const response = await ChatBotClient.post("/ChatBot", { Message: message });
    return response.data.response;
  } catch (error) {
    return "Failed to send message";
  }
};



