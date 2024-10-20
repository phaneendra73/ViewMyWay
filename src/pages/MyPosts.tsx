import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Notification from "../components/Notification";
import { useMyPosts } from "../hooks";
import SkeMyPosts from "../Skeletons/MyPosts";
import MyPostCard from "../components/MyPostCard";

const Posts: React.FC = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const { loading, posts, error } = useMyPosts();

    // Effect for redirecting if there's an authorization error
    useEffect(() => {
        if (error && (error.includes("Unauthorized") || error.includes("log in"))) {
            const timer = setTimeout(() => {
                navigate("/"); // Redirect to home after a short delay
            }, 3000); // Adjust the delay as needed

            return () => clearTimeout(timer); // Clear the timer on cleanup
        }
    }, [error, navigate]);

    if (loading) {
        return <SkeMyPosts />;
    }

    if (error) {
        return (
            <Notification
                message={error}
                type="error"
                onClose={() => { }} // Optional close function
            />
        );
    }

    return (
        <>
            <Nav />
            <div className="flex flex-col lg:flex-row min-h-screen text-white">


                {/* Main Content Section */}
                <div className="flex-grow p-8 lg:p-16 mt-20 lg:mt-0">
                    <h1 className="text-2xl font-bold mb-6">My Posts</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <MyPostCard
                                key={post.id}
                                title={post.title}
                                content={post.content}
                                date={post.createdAt}
                                link={`/post/Edit/${post.id}`}
                                isPublished={post.published}
                                id={post.id} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Posts;
