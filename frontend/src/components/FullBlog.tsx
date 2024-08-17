import { useBlog } from "../hooks"
import pic from './th.jpeg'
import { Blog } from "../hooks"
import { AppbarFull } from "./AppbarFull";
const monthChart = {
    1:"January",
    2:"February",
    3:"March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12:"December"
}
export const FullBlog = ({ blog }: { blog: Blog }) => {
    console.log(blog.date);
    const date = new Date(blog.date);
    //@ts-ignore
    const formattedDate = `${monthChart[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`;
    console.log(formattedDate);

    return (
        <div className="">
            <div>
                <AppbarFull />
            </div>
            <div className="grid grid-cols-12 m-10 px-10 gap-x-4">
                <div className="col-span-8">
                    <div className="text-3xl font-bold">{blog.title}</div>
                    <div className="mt-2 mb-2 text-sm text-slate-500">Posted on {formattedDate}</div>
                    <div className="mt-4 whitespace-normal break-words">{blog.content}</div>
                </div>
                <div className="col-span-4 h-screen">
                    <div>Author</div>
                    <div className="grid grid-cols-8 mt-4 items-center ">
                        <div className="col-span-1">
                        <img className="w-8 h-8 rounded-full" src={pic} alt="Author avatar" />
                        </div>
                        <div className="col-span-7">
                            <div className="text-xl font-bold">{blog.author.name||"anonymous"}</div>
                            <div>Description</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
