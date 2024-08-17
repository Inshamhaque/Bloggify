import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Content } from "./previewContent";
import { Tagbar } from "./tagbar";

export const Preview = ()=>{
    
    const imageFile = useRef(null);
    const [image,setImage]  = useState("");
    const handleClick = ()=>{
        imageFile.current.click();

    }
    const createMarkup = (html:string)=>{
        return { __html: DOMPurify.sanitize(html) };
    }
    

    return(
        <div className="flex flex-col m-5 mr-20 ml-20">
            <div className="flex justify-end text-slate-500 hover:text-black ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" cursor-pointer size-6">
                    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />  
                </svg>
            </div>
            <div className="grid grid-cols-2 mt-20 gap-x-20">
                <div className="col-span-1 p-5 ">
                    <div className="font-medium"> Story preview</div>
                        <div style = {{backgroundImage : `url(${image})`}}    onClick={handleClick} className=" cursor-pointer flex justify-center items-center bg-slate-50 h-[200px] w-[400px] my-5 mr-20  bg-cover bg-no-repeat ">
                            {!image && "Add image"}
                        </div>
                        <input onChange={(e)=>{setImage(URL.createObjectURL(e.target.files[0]))}} type="file" id="file" ref={imageFile} hidden />
                        <div className="font-medium w-full border-slate-300 border-b">
                            <input className="outline-none" type="text" name="preview title" placeholder="Write a preview title" />
                        </div>
                        <div>
                            <Content />
                        </div>
                    </div>
                <div className="col-span-1 p-5 flex flex-col">
                    <div className="flex flex-row gap-x-3">
                        <div>Publishing to:</div>
                        <div className="font-bold">User</div>
                    </div>
                    <div className="mt-5 gap-y-5">
                        <div className=" text-sm mb-3">Add a suitable Tag to your blog</div>
                        <div>
                            <Tagbar />

                        </div>
                    </div>
                    <div></div>

                </div>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}
