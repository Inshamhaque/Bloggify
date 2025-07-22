//@ts-nocheck
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import GitHubNavbar from "../components/Navbar";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import { Loader2 } from "./Loader2";

export const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogById = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BACKEND_URL}/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });

                console.log("Blog Response:", response.data);

                if (response.status === 200) {
                    setBlog(response.data.blog || response.data);
                } else {
                    toast.error("Blog not found", { position: "top-right" });
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                toast.error("Failed to load blog", { position: "top-right" });
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlogById();
        }
    }, [id]);

    // Function to render block content (similar to Preview component)
    const renderBlock = (block, index) => {
        const getTextContent = (content) => {
            if (typeof content === 'string') return content;
            if (Array.isArray(content)) {
                return content.map(item => getTextContent(item)).join('');
            }
            if (content && typeof content === 'object' && content.text) {
                return content.text;
            }
            return '';
        };

        const textContent = getTextContent(block.content);

        switch (block.type) {
            case 'heading':
                const level = block.props?.level || 1;
                const HeadingTag = `h${level}`;
                return (
                    <HeadingTag
                        key={index}
                        className={`font-bold mb-4 ${
                            level === 1 ? 'text-4xl' :
                            level === 2 ? 'text-3xl' :
                            level === 3 ? 'text-2xl' : 'text-xl'
                        }`}
                    >
                        {textContent}
                    </HeadingTag>
                );

            case 'quote':
                return (
                    <blockquote 
                        key={index} 
                        className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-300 bg-gray-800 rounded-r-lg"
                    >
                        {textContent || <em className="text-gray-500">Empty quote</em>}
                    </blockquote>
                );

            case 'toggleList':
                return (
                    <details key={index} className="mb-4 border border-gray-600 rounded-lg">
                        <summary className="cursor-pointer p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                            {textContent || "Toggle section"}
                        </summary>
                        <div className="p-3 bg-gray-800 rounded-b-lg">
                            {block.children?.map((child, childIndex) => 
                                renderBlock(child, `${index}-${childIndex}`)
                            ) || <p className="text-gray-400">No content</p>}
                        </div>
                    </details>
                );

            case 'numberedListItem':
                return (
                    <li key={index} className="mb-2 ml-6 list-decimal">
                        {textContent}
                        {block.children && block.children.length > 0 && (
                            <ol className="mt-2">
                                {block.children.map((child, childIndex) => 
                                    renderBlock(child, `${index}-${childIndex}`)
                                )}
                            </ol>
                        )}
                    </li>
                );

            case 'bulletListItem':
                return (
                    <li key={index} className="mb-2 ml-6 list-disc">
                        {textContent}
                        {block.children && block.children.length > 0 && (
                            <ul className="mt-2">
                                {block.children.map((child, childIndex) => 
                                    renderBlock(child, `${index}-${childIndex}`)
                                )}
                            </ul>
                        )}
                    </li>
                );

            case 'checkListItem':
                const isChecked = block.props?.checked || false;
                return (
                    <div key={index} className="flex items-center mb-2">
                        <input 
                            type="checkbox" 
                            checked={isChecked} 
                            readOnly 
                            className="mr-3 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className={isChecked ? 'line-through text-gray-400' : ''}>
                            {textContent}
                        </span>
                    </div>
                );

            case 'codeBlock':
                const language = block.props?.language || 'text';
                return (
                    <div key={index} className="mb-4">
                        <div className="bg-gray-900 rounded-t-lg px-3 py-2 text-sm text-gray-400 border-b border-gray-700">
                            {language}
                        </div>
                        <pre className="bg-black rounded-b-lg p-4 overflow-x-auto">
                            <code className="text-green-400 text-sm font-mono">
                                {textContent || '// Empty code block'}
                            </code>
                        </pre>
                    </div>
                );

            case 'table':
                if (!block.content || !block.content.rows) {
                    return (
                        <div key={index} className="mb-4 p-4 border border-gray-600 rounded-lg">
                            <p className="text-gray-400">Empty table</p>
                        </div>
                    );
                }
                
                return (
                    <div key={index} className="mb-4 overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-600 rounded-lg">
                            <tbody>
                                {block.content.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-700' : 'bg-gray-800'}>
                                        {row.map((cell, cellIndex) => {
                                            const CellTag = rowIndex === 0 ? 'th' : 'td';
                                            return (
                                                <CellTag 
                                                    key={cellIndex}
                                                    className="border border-gray-600 px-3 py-2 text-left"
                                                >
                                                    {getTextContent(cell) || ''}
                                                </CellTag>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'paragraph':
            default:
                return (
                    <p key={index} className="mb-4 leading-relaxed">
                        {textContent || <em className="text-gray-400">Empty paragraph</em>}
                    </p>
                );
        }
    };

    // Group consecutive list items (similar to Preview component)
    const groupedContent = (content) => {
        const grouped = [];
        let currentList = [];
        let listType = null;

        content.forEach((block, index) => {
            if (block.type === 'bulletListItem' || block.type === 'numberedListItem' || block.type === 'checkListItem') {
                if (listType === null) {
                    listType = block.type;
                    currentList = [block];
                } else if (listType === block.type) {
                    currentList.push(block);
                } else {
                    grouped.push({ type: `${listType}Group`, items: currentList });
                    listType = block.type;
                    currentList = [block];
                }
            } else {
                if (currentList.length > 0) {
                    grouped.push({ type: `${listType}Group`, items: currentList });
                    currentList = [];
                    listType = null;
                }
                grouped.push(block);
            }
        });

        if (currentList.length > 0) {
            grouped.push({ type: `${listType}Group`, items: currentList });
        }

        return grouped;
    };

    const renderGroupedBlock = (block, index) => {
        if (block.type === 'bulletListItemGroup') {
            return (
                <ul key={index} className="mb-4">
                    {block.items.map((item, itemIndex) => 
                        renderBlock(item, `${index}-${itemIndex}`)
                    )}
                </ul>
            );
        } else if (block.type === 'numberedListItemGroup') {
            return (
                <ol key={index} className="mb-4">
                    {block.items.map((item, itemIndex) => 
                        renderBlock(item, `${index}-${itemIndex}`)
                    )}
                </ol>
            );
        } else if (block.type === 'checkListItemGroup') {
            return (
                <div key={index} className="mb-4">
                    {block.items.map((item, itemIndex) => 
                        renderBlock(item, `${index}-${itemIndex}`)
                    )}
                </div>
            );
        }
        
        return renderBlock(block, index);
    };

    const getTextContent = (content) => {
        if (!content || !Array.isArray(content)) return "No content";
        const textItem = content.find(item => item.type === "text");
        return textItem?.text || "No content";
    };

    if (loading) {
        return (
            <div className="h-screen flex flex-col bg-[#1e1e1e] text-white">
                <GitHubNavbar />
                {/* <div className="flex-1 flex items-center justify-center">
                    <div className="text-xl"></div>
                </div> */}
                <Loader2 />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="h-screen flex flex-col bg-[#1e1e1e] text-white">
                <GitHubNavbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-xl text-gray-400">Blog not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1e1e1e] text-white">
            <GitHubNavbar />
            
            {/* Blog Header */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={blog.user?.avatarUrl || "https://ui-avatars.com/api/?name=User&background=444&color=fff"}
                        alt="Author Avatar"
                        className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover"
                    />
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            {blog.user?.name || "Unknown Author"}
                        </h3>
                        <p className="text-sm text-gray-400">
                            @{blog.user?.githubUsername || "unknown"}
                        </p>
                    </div>
                </div>

                {/* Blog Title
                <h1 className="text-4xl font-bold text-white mb-4">
                    {getTextContent(blog.title?.content)}
                </h1> */}

                {/* Blog Subtitle
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    {getTextContent(blog.subtitle?.content)}
                </p> */}

                {/* Cover Image */}
                {blog.cover_photo && (
                    <div className="mb-8 rounded-lg overflow-hidden">
                        <img
                            src={blog.cover_photo}
                            alt="Blog Cover"
                            className="w-full h-64 object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Blog Content */}
            <div className="max-w-4xl mx-auto px-6 pb-12">
                <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 p-8">
                    <div className="prose prose-invert max-w-none">
                        {blog.content && blog.content.length > 0 ? (
                            groupedContent(blog.content).map((block, index) => 
                                renderGroupedBlock(block, index)
                            )
                        ) : (
                            <p className="text-gray-400">No content available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};