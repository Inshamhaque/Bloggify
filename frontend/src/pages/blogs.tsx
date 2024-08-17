import { useDebugValue } from "react";
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from '../hooks'
import { Blogtop } from "../components/Blogstop";
import { AppbarFull } from "../components/AppbarFull";

export const Blogs = ()=>{
    const {loading,blogs} = useBlogs();
    
    if(loading){
        return <h1>Loading...</h1>
    }
    //@ts-ignore
    const posts = blogs.posts;
    console.log(posts[0]);
    return(
        <div>
            <div>
                <AppbarFull />
            </div>
            <div>
                <Blogtop></Blogtop>
            </div>
            <div>
            {posts.map((post:object)=>(
                //@ts-ignore
                <BlogCard id={post.id} AuthorName={post.author.name} Content={post.content} Title={post.title} Tags="Side-hustle" />
            ))}
        </div>
        </div>
        
    )
}