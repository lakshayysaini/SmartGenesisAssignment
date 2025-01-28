"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillWrapper = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface Content {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "image",
];

export default function Editor() {
  const { data: session } = useSession();
  const [contents, setContents] = useState<Content[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchContents();
  }, []);

  const fetchContents = async () => {
    const response = await fetch("/api/content");
    const data = await response.json();
    setContents(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`/api/content/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    } else {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    }

    setTitle("");
    setContent("");
    setEditingId(null);
    fetchContents();
  };

  const handleEdit = (content: Content) => {
    setTitle(content.title);
    setContent(content.content);
    setEditingId(content._id);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/content/${id}`, {
      method: "DELETE",
    });
    fetchContents();
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <div className="mb-4 bg-white">
          <QuillWrapper
            modules={modules}
            formats={formats}
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write your content here..."
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {editingId ? "Update" : "Create"} Content
        </button>
      </form>

      <div className="space-y-4">
        {contents.map((content) => (
          <div
            key={content._id}
            className="border p-4 rounded bg-white shadow-sm"
          >
            <h2 className="text-xl font-bold">{content.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: content.content }}
              className="mt-2 prose max-w-none"
            />
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleEdit(content)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(content._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}