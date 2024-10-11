import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const EditorPage: React.FC = () => {
  const [editorHtml, setEditorHtml] = useState('<p>Type your content here...</p>');
  const [title, setTitle] = useState('');
  const [published, setPublished] = useState(true);
  //const [tags, setTags] = useState<number[]>([]); // Assuming tags are numeric IDs

  useEffect(() => {
    const quill = new Quill('#editor', {
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
          ['clean'],
          ['code-block'],
          [{ direction: 'rtl' }],
          ['blockquote'],
          ['formula'],
          ['insert'],
        ],
      },
    });

    quill.on('text-change', () => {
      setEditorHtml(quill.root.innerHTML);
    });

    return () => {
      quill.disable();
    };
  }, []);

  const handleSave = async () => {
    try {
      const postData = {
        title,
        content: editorHtml,
        published,
        //tags,
      };
      console.log(postData.content)
      await axios.post(`/api/save`, postData);
     
      alert("Content saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content.");
    }
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col min-h-screen text-white bg-black">
        <div className="flex-grow p-8 lg:p-20 mt-10 lg:mt-0">
          <div className="border border-white p-6 rounded-lg shadow-lg mb-8 relative">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-xl font-bold mb-2">Blog Content</h1>
              <button
                className="bg-transparent border border-white text-white py-1 px-3 rounded-full"
                onClick={handleSave}
              >
                Save
              </button>
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

            {/* Tags Input (as an example, you can replace with your own implementation) */}
          

            <div id="editor" style={{ height: '300px' }} />


          </div>
        
        </div>
       
      </div>
      
      <Footer />
    </>
  );
};

export default EditorPage;
