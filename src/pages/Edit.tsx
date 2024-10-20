import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { postSchema } from '@phaneendra73/blog-common';
import { BACKEND_URL } from '../config';
import { useNavigate, useParams } from 'react-router-dom';
import { useTags } from '../hooks'; // Import the useTags hook
import Button from '../components/Button';

const Edit: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the post ID from the URL params
    const [editorHtml, setEditorHtml] = useState('<p>Type your content here...</p>');
    const [title, setTitle] = useState('');
    const [published, setPublished] = useState(true);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [success, setSuccess] = useState<string>("");
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(localStorage.getItem("ViewMyWay"));
    const { tags: availableTags } = useTags(); // Fetch available tags
    const [quill, setQuill] = useState<Quill | null>(null); // Store the Quill instance

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/post/get/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const post = response.data;

                setTitle(post.title);
                setPublished(post.published);
                setSelectedTags(post.tags); // Assuming the post has a `tags` array

                if (quill) {
                    quill.root.innerHTML = post.content; // Set the Quill editor's content
                    setEditorHtml(post.content); // Update editorHtml state
                }
            } catch (err) {
                console.error("Error fetching post data:", err);
            }
        };

        fetchPostData();
    }, [id, token, quill]); // Added quill as a dependency

    useEffect(() => {
        const quillInstance = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ color: [] }],
                    [{ font: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ script: 'sub' }, { script: 'super' }],
                    [{ align: [] }],
                    ['code-block'],
                    [{ direction: 'rtl' }],
                    ['blockquote'],
                ],
            },
        });

        quillInstance.on('text-change', () => {
            setEditorHtml(quillInstance.root.innerHTML);
        });

        setQuill(quillInstance); // Store the Quill instance

        return () => {
            quillInstance.disable();
        };
    }, []);

    const validateInput = async (): Promise<boolean> => {
        const parsedBody = postSchema.safeParse({
            title,
            content: editorHtml,
            published,
            tags: selectedTags,
        });
        if (!parsedBody.success) {
            const newErrors: { [key: string]: string } = {};
            parsedBody.error.errors.forEach(err => {
                newErrors[err.path[0] as string] = err.message;
            });
            setErrors(newErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSave = async (): Promise<void> => {
        const isValid = await validateInput();
        if (!isValid) return;

        const postData = {
            title,
            content: editorHtml,
            published,
            tags: selectedTags,
        };

        try {
            const response = await axios.put(
                `${BACKEND_URL}/post/update/${id}`, // Update API endpoint
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            setSuccess("Post updated successfully! Redirecting...");
            setErrors({});

            setTimeout(() => {
                navigate("/posts");
            }, 2000);
        } catch (err: any) {
            if (err.response && err.response.data) {
                const { error } = err.response.data;
                setErrors({ api: error });
                setSuccess("");
            } else {
                setErrors({ api: "An error occurred. Please try again." });
                setSuccess("");
                setToken("");
            }
        }
    };

    // Toggle tag selection
    const toggleTagSelection = (tagId: number) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    return (
        <>
            <Nav />
            <div className="flex flex-col min-h-screen text-white bg-black">
                <div className="flex-grow p-8 lg:p-20 mt-10 lg:mt-0">
                    <div className="border border-white p-6 rounded-lg shadow-lg mb-8 relative">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-xl font-bold mb-2">Edit Post</h1>
                            <Button
                                className="bg-transparent border border-white text-white py-1 px-3 rounded-full"
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                            {errors.api && <div className="text-red-500">{errors.api}</div>}
                            {success && <div className="text-green-500">{success}</div>}
                        </div>
                        <hr className="border-t border-white my-4" />

                        {/* Title Input */}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full p-2 mb-4 rounded border border-white bg-black text-white"
                        />

                        {/* Published Toggle */}
                        <label className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={published}
                                onChange={() => setPublished(!published)}
                                className="mr-2"
                            />
                            Publish
                        </label>

                        {/* Tags Selection */}
                        <div className="mb-4">

                            <div className="flex flex-wrap gap-3">
                                <h2 className="text-lg font-semibold">Select Tags:</h2>
                                {availableTags?.map(tag => (
                                    <button
                                        key={tag.id}
                                        onClick={() => toggleTagSelection(tag.id)}
                                        className={`flex items-center bg-transparent border border-white rounded-full py-1 px-3 transition duration-300 
                      ${selectedTags.includes(tag.id) ? "font-bold bg-white text-black" : "bg-black text-white"}`}
                                    >
                                        {tag.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div id="editor" style={{ height: '300px' }} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Edit;
