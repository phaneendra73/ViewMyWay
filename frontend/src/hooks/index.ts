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
  author: Author | undefined; // Author object
  tags: Tag[]; // Array of tags associated with the post
}

export const usePosts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("ViewMyWay")
  );

  const fetchPosts = async () => {
    // Check if token exists before fetching
    if (!token) {
      console.log(token);
      setLoading(false); // Stop loading since we won't fetch
      setError("Please log in to view posts."); // Set error message
      return; // Exit the function early
    }

    setLoading(true); // Start loading state
    setError(null); // Reset error state before the fetch

    try {
      const response = await axios.get(`${BACKEND_URL}/post`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      console.log(response); // Log the response for debugging
      setPosts(response.data); // Update the posts state with fetched data
    } catch (error) {
      console.error("Failed to fetch posts:", error); // Log error for debugging
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch posts. Please try again later."
      );
    } finally {
      setLoading(false); // Stop loading state regardless of success or failure
    }
  };

  // This effect runs when the component mounts or when the token changes
  useEffect(() => {
    fetchPosts(); // Attempt to fetch posts
  }, [token]); // Dependency array includes token

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
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("ViewMyWay")
  );
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

export const useMyPosts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("ViewMyWay")
  );
  console.log("hiting backend");
  const fetchPosts = async () => {
    // Check if token exists before fetching
    if (!token) {
      console.log(token);
      setLoading(false); // Stop loading since we won't fetch
      setError("Please log in to view posts."); // Set error message
      return; // Exit the function early
    }

    setLoading(true); // Start loading state
    setError(null); // Reset error state before the fetch

    try {
      const response = await axios.get(
        `${BACKEND_URL}/post/myposts`,
        //`http://127.0.0.1:8787/api/v1/post/myposts`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      console.log(response); // Log the response for debugging
      setPosts(response.data); // Update the posts state with fetched data
    } catch (error) {
      console.error("Failed to fetch posts:", error); // Log error for debugging
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch posts. Please try again later."
      );
    } finally {
      setLoading(false); // Stop loading state regardless of success or failure
    }
  };

  // This effect runs when the component mounts or when the token changes
  useEffect(() => {
    fetchPosts(); // Attempt to fetch posts
  }, [token]); // Dependency array includes token

  return {
    loading,
    posts,
    error, // Expose error state
    setToken, // Expose setToken to allow updating the token
  };
};

export const useTags = () => {
  const [tagloading, setTagLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<Tag[]>();
  const [tagerror, setTagError] = useState<string | null>(null); // Error state
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("ViewMyWay")
  );
  const navigate = useNavigate();

  const fetchPost = async () => {
    // Fetch posts only if the token is present
    if (!token) {
      navigate("/signin");
      return;
    }

    setTagLoading(true); // Start loading state
    setTagError(null); // Reset error state before the fetch
    try {
      const response = await axios.get(`${BACKEND_URL}/tag/tags`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });
      setTags(response.data); // Update the state with fetched posts
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setTagError("Failed to fetch posts. Please try again later."); // Set error message
    } finally {
      setTagLoading(false); // Stop loading state
    }
  };

  // This effect runs on every render
  useEffect(() => {
    fetchPost(); // Fetch posts every time the component mounts or the token changes
  }, [token]); // Dependency array with token

  return {
    tagloading,
    tags,
    tagerror,
    setToken,
  };
};
