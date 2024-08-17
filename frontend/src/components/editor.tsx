import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { titleState,contentState } from "../atoms/atoms";
import { useRecoilState } from "recoil";

export const Editor = ()=>{
  const [title,setTitle] = useRecoilState(titleState);
  const [content,setContent] = useRecoilState(contentState);
  useEffect(()=>{
    setValue(content)
  },[content])
  const [value,setValue] = useState(content);
  return(
    <section className="w-[90%] lg:w-[60%] mx-auto py-[3rem] font-">
      <input type="text" placeholder="Title" className="text-4xl outline-none font-serif" onChange={(e)=>{
        setTitle(e.target.value);
      }} />
      <ReactQuill theme="bubble" value={value} onChange={(new_value)=>{
        setValue(new_value);
        setContent(new_value);
      }} placeholder="Tell your story..." className="write my-5"/>
    </section>
  )
}
