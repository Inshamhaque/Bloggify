import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { titleState, contentState } from "../atoms/atoms";
import { useRecoilState } from "recoil";

export const Editor = () => {
  const [title, setTitle] = useRecoilState(titleState);
  const [content, setContent] = useRecoilState(contentState);
  
  useEffect(() => {
    setValue(content);
  }, [content]);

  const [value, setValue] = useState(content);

  return (
    <section className="w-full text-left mt-6">
      {/* Blog Title Input */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-7xl text-4xl font-serif outline-none rounded-2xl border-b-2 border-gray-300 focus:border-Blue-500 transition p-2"
      />

      {/* Blog Content Editor */}
      <ReactQuill
        theme="bubble"
        value={value}
        onChange={(new_value) => {
          setValue(new_value);
          setContent(new_value);
        }}
        placeholder="Tell your story..."
        className="write my-5 p-4 bg-white shadow-md rounded-lg"
      />
    </section>
  );
};
