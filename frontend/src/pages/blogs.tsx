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
import { Link  } from "react-router-dom";
// import { Link as LinkIcon } from "lucide-react"

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/blogs`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        if (
          response.status !== 200 ||
          !response.data.blogs ||
          response.data.blogs.length === 0
        ) {
          toast.error("No blogs present", { position: "top-right" });
          return;
        }

        setBlogs(response.data.blogs);
      } catch (err) {
        toast.error("Failed to fetch blogs", { position: "top-right" });
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      <div className=" mx-auto px-4 py-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, idx) => (
          <CardContainer key={idx}>
            <CardBody className="bg-[#1a1a1a] hover:bg-[#262626] transition-all duration-300 shadow-lg rounded-2xl p-5 border border-gray-800">
              <CardItem
                translateZ={30}
                className="text-2xl font-semibold text-white mb-2 truncate"
              >
                {blog.title}
              </CardItem>

              <CardItem
                translateZ={20}
                className="text-sm text-gray-400 mb-3 line-clamp-2"
              >
                {blog.subtitle}
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
                        src={
                            blog.user?.avatarUrl ||
                            "https://ui-avatars.com/api/?name=User&background=444&color=fff"
                        }
                        alt="Author Avatar"
                        className="w-9 h-9 rounded-full border border-gray-600 object-cover"
                        />
                        <span className="text-sm font-medium text-gray-200">
                        {blog.user?.name || "Unknown Author"}
                        </span> 
                    </div>

                    <Link
                        to={`/blog/${blog._id}`}
                        className="text-sm text-blue-400 hover:underline flex items-center gap-1"
                    >
                        Read <ArrowRight size={16} />
                    </Link>
                </CardItem>

            
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}
