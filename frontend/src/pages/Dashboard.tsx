import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import {
  CardContainer,
  CardBody,
  CardItem
} from "../components/ui/3d-card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        // if (!userId) {
        //   toast.error("User not logged in");
        //   return;
        // }

        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/userblog`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setBlogs(response.data.blogs || []);
      } catch (err) {
        toast.error("Failed to fetch your blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [userId]);

  const getTextContent = (contentArray) => {
    if (!contentArray || !Array.isArray(contentArray)) return "No content";
    const textItem = contentArray.find(item => item.type === "text");
    return textItem?.text || "No content";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-xl">Loading your blogs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      <div className="mx-auto px-4 py-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-400">You haven't created any blogs yet</h2>
            <p className="text-gray-500 mt-2">Go ahead and share your thoughts!</p>
          </div>
        ) : (
          blogs.map((blog, idx) => (
            <CardContainer key={blog._id || idx}>
              <CardBody className="bg-[#1a1a1a] hover:bg-[#262626] transition-all duration-300 shadow-lg rounded-2xl p-5 border border-gray-800">
                <CardItem
                  translateZ={30}
                  className="text-2xl font-semibold text-white mb-2 truncate"
                  style={{ minHeight: "48px", maxHeight: "48px" }}
                >
                  {
                    getTextContent(blog.title?.content).length > 20
                    ? getTextContent(blog.title?.content).slice(0, 30) + '...'
                    : getTextContent(blog.title?.content)
                  }
                </CardItem>
                <CardItem
                  translateZ={20}
                  className="text-sm text-gray-400 mb-3 line-clamp-2"
                  style={{ minHeight: "48px", maxHeight: "48px" }}
                >
                  {
                  getTextContent(blog.subtitle?.content).length > 100
                    ? getTextContent(blog.subtitle?.content).slice(0, 100) + '...'
                    : getTextContent(blog.subtitle?.content)
                  }
                </CardItem>
                <CardItem translateZ={20} className="mb-4 rounded-xl overflow-hidden">
                  <img
                    src={blog.cover_photo || "https://picsum.photos/600/300?grayscale"}
                    alt="Blog Cover"
                    className="w-full h-44 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                  />
                </CardItem>
                <CardItem translateZ={15} className="flex items-center w-full justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={blog.user?.avatarUrl || "https://ui-avatars.com/api/?name=User&background=444&color=fff"}
                      alt="Author Avatar"
                      className="w-9 h-9 rounded-full border border-gray-600 object-cover"
                    />
                    <span className="text-sm font-medium text-gray-200">
                      {blog.user?.name || "You"}
                    </span>
                  </div>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-sm text-blue-400 hover:underline flex items-center gap-1"
                  >
                    View <ArrowRight size={16} />
                  </Link>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))
        )}
      </div>
    </div>
  );
}
