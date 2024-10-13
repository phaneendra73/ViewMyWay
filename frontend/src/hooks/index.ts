import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

// Define the interface for the Tag
export interface Tag {
  id: number;
  name: string;
}

// Define the interface for the Author
export interface Author {
  id: string;
  email: string;
  name: string | null; // Name can be null
  password: string; // Password should be hashed and handled securely
  profileImageUrl: string | null; // Profile image can also be null
  role: number; // Assuming role is an integer (0, 1, etc.)
  status: boolean; // Active or inactive
}

// Define the main Post interface
export interface Post {
  id: string; // Unique identifier for the post
  title: string; // Title of the post
  content: string; // Content of the post
  published: boolean; // Whether the post is published
  authorId: string; // ID of the author (reference)
  createdAt: string; // Timestamp when the post was created
  updatedAt: string; // Timestamp when the post was last updated
  author: Author; // Author object
  tags: Tag[]; // Array of tags associated with the post
}

export const usePosts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null); // Error state
  const [token, setToken] = useState<string | null>(localStorage.getItem("ViewMyWay"));
  const navigate = useNavigate();

  const fetchPosts = async () => {
    // Fetch posts only if the token is present
    if (!token) {
      navigate("/signin");
      return; 
    }

    setLoading(true); // Start loading state
    setError(null); // Reset error state before the fetch
    try {
      const response = await axios.get(`${BACKEND_URL}/post`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });
      console.log(response);
      setPosts(response.data); // Update the state with fetched posts
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setError("Failed to fetch posts. Please try again later."); // Set error message
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // This effect runs on every render
  useEffect(() => {
    fetchPosts(); // Fetch posts every time the component mounts or the token changes
  }, [token]); // Dependency array with token

  return {
    loading,
    posts,
    error, // Expose error state
    setToken, // Expose setToken to allow updating the token
  };
};


export const usePost = (id: string) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [post, setPost] = useState<Post>();
    const [error, setError] = useState<string | null>(null); // Error state
    const [token, setToken] = useState<string | null>(localStorage.getItem("ViewMyWay"));
    const navigate = useNavigate();
  
    const fetchPost = async () => {
      // Fetch posts only if the token is present
      if (!token) {
        navigate("/signin");
        return; 
      }
  
      setLoading(true); // Start loading state
      setError(null); // Reset error state before the fetch
      try {
        const response = await axios.get(`${BACKEND_URL}/post/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        });
        console.log(response);
        setPost(response.data); // Update the state with fetched posts
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Failed to fetch posts. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Stop loading state
      }
    };
  
    // This effect runs on every render
    useEffect(() => {
      fetchPost(); // Fetch posts every time the component mounts or the token changes
    }, [token]); // Dependency array with token
  
  
    return {
      loading,
      post,
      error,
      setToken,
    };
  };
  