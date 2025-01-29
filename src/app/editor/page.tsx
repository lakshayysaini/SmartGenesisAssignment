"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { ErrorPage } from "@/components/ErrorPage";
import "react-quill/dist/quill.snow.css";
import { PenLine, Trash2, Save } from "lucide-react";
import "../globals.css";

const QuillWrapper = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-md"></div>
    </div>
  ),
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
  const { data: session, status } = useSession();
  const [contents, setContents] = useState<Content[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchContents();
    }
  }, [status]);

  const fetchContents = async () => {
    const response = await fetch("/api/content");
    const data = await response.json();
    setContents(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/content/${editingId}` : "/api/content";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

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

  if (status === "loading") return null;
  if (status !== "authenticated") return <ErrorPage />;

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-[#1E1E1E] rounded-lg shadow-xl p-8 mb-8 border border-[#2A2A2A]">
          <h1 className="text-3xl font-semibold text-white mb-8">
            Content Editor
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a captivating title..."
                className="w-full px-4 py-3 text-lg bg-[#2A2A2A] border-[#3A3A3A] 
                          text-white rounded-lg focus:ring-2 focus:ring-blue-500 
                          focus:border-transparent transition-all duration-200 
                          placeholder-gray-500"
                required
              />
            </div>
            <div className="bg-white">
              <QuillWrapper
                modules={modules}
                formats={formats}
                value={content}
                onChange={setContent}
                placeholder="Write your content here..."
                />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 text-base font-medium 
                        text-white bg-blue-600 hover:bg-blue-700 rounded-lg 
                        transition-all duration-200"
            >
              <Save className="w-5 h-5 mr-2" />
              {editingId ? "Update" : "Create"} Content
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {contents?.map((content) => (
            <div
              key={content._id}
              className="bg-[#1E1E1E] rounded-lg shadow-xl p-8 border border-[#2A2A2A]
                        transition-all duration-200 hover:border-blue-500"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                {content.title}
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: content.content }}
                className="prose prose-invert max-w-none mb-6"
              />
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(content)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium 
                            text-white bg-amber-600 hover:bg-amber-700 rounded-lg 
                            transition-all duration-200"
                >
                  <PenLine className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(content._id)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium 
                            text-white bg-red-600 hover:bg-red-700 rounded-lg 
                            transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
