"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Blog = {
  id: string;
  title: string;
  content: string;
  image_url: string;
  category: string;
  published: boolean;
  created_at: string;
};

export default function BlogSection() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: "", content: "", image_url: "", category: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const addPost = async () => {
    if (!newPost.title) return;
    setSaving(true);
    await supabase.from("blog").insert([{ ...newPost, published: true }]);
    setNewPost({ title: "", content: "", image_url: "", category: "" });
    await fetchPosts();
    setSaving(false);
  };

  const togglePublished = async (id: string, published: boolean) => {
    await supabase.from("blog").update({ published: !published }).eq("id", id);
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, published: !published } : p));
  };

  const deletePost = async (id: string) => {
    await supabase.from("blog").delete().eq("id", id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const inputClass = "w-full bg-[#F5F5F3] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#BEF264] border border-transparent";

  return (
    <div>
      <h2 className="text-2xl font-black text-black mb-6">Blog Posts</h2>

      <div className="flex flex-col gap-4 mb-8">
        {loading ? <p className="text-sm text-gray-400">Loading...</p> :
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl border border-black/10 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-black text-black">{post.title}</p>
                  <p className="text-xs text-gray-400">{post.category} · {new Date(post.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-32 object-cover rounded-xl mb-3" />}
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{post.content}</p>
              <div className="flex gap-2">
                <button onClick={() => togglePublished(post.id, post.published)}
                  className="px-4 py-2 rounded-full bg-[#BEF264] text-black text-xs font-bold hover:bg-[#a8e050] transition-colors">
                  {post.published ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => deletePost(post.id)}
                  className="px-4 py-2 rounded-full bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="bg-white rounded-2xl border border-dashed border-black/20 p-5">
        <h3 className="text-sm font-black text-black mb-4">Add New Post</h3>
        <div className="flex flex-col gap-3 mb-4">
          <input value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} className={inputClass} placeholder="Post Title" />
          <input value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })} className={inputClass} placeholder="Category" />
          <input value={newPost.image_url} onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })} className={inputClass} placeholder="Image URL" />
          <textarea value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            rows={4} className={inputClass + " resize-none"} placeholder="Post content..." />
        </div>
        <button onClick={addPost} disabled={saving}
          className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors">
          {saving ? "Adding..." : "+ Add Post"}
        </button>
      </div>
    </div>
  );
}