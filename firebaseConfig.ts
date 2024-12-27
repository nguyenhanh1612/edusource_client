
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEwiOINQb3r3GFuZQglfz_zbegMiRWi6w",
  authDomain: "courses-4199c.firebaseapp.com",
  projectId: "courses-4199c",
  storageBucket: "courses-4199c.appspot.com",
  messagingSenderId: "948729332032",
  appId: "1:948729332032:web:d352d1df97f9440f6c7aa5",
  measurementId: "G-1XS776VEP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };