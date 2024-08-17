import pic from "./th.jpeg";
import pic2 from './R.png'
import { Link } from "react-router-dom";

interface BlogCardParams {
    AuthorName: string;
    Date?: string;
    Content: string;
    Image: string;
    isMember: boolean;
    Title: string;
    AuthorImage: string;
    Tags?: string;
    id: string;
}

export const BlogCard = ({ id, AuthorName, Date, Title, Content, Image, AuthorImage, isMember, Tags }: BlogCardParams) => {
    const substring = Content.substring(0, 200);

    return (
        <Link to={`/blog/${id}`}>
            <div className="flex flex-col m-4 mr-12 hover:cursor-pointer">
                <div className="grid grid-cols-4 mr-12">
                    <div className="col-span-3 flex flex-col gap-y-2 m-10 mr-30">
                        <div className="flex items-center gap-x-2">
                            <img className="w-6 h-6 rounded-full" src={pic} alt="Author avatar" />
                            <div className="font-medium">{AuthorName}</div>
                            <div className="text-gray-500 text-sm">{Date}</div>
                            <div className="flex items-center gap-x-1 text-yellow-400 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-4 h-4 fill-yellow-400">
                                    <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
                                </svg>
                                <div>Member-Only</div>
                            </div>
                        </div>
                        <div className="font-bold text-2xl">
                            {Title}
                        </div>
                        <div className="text-gray-700 whitespace-normal break-words">
                            {substring}...
                        </div>
                        <div className="flex justify-between mt-5">
                            <div className="flex flex-row gap-x-4 items-center">
                                <div className="bg-gray-100 rounded-xl text-sm p-1">{Tags}</div>
                                <div className="text-sm text-slate-500">3 min read</div>
                            </div>

                            <div className="flex gap-x-2">
                                <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="grey" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="grey" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="grey" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                        <img className="w-full h-auto object-cover rounded-lg" src={pic2} alt="Blog Image" />
                    </div>
                </div>
                <div>
                    <div className="ml-8 mr-12">
                        <hr className="h-px my-5 bg-slate-300" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
