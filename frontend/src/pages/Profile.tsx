// @ts-nocheck
import GitHubNavbar from "../components/Navbar";
import { useEffect, useState } from 'react';
import { Users, GitFork, Star, Link, ArrowRight, Mail, MapPin, Briefcase } from 'lucide-react';
import { Rss, Link2, CheckCircle2, PlugZap } from 'lucide-react';
import { useParams } from "react-router-dom";
import { CardContainer, CardItem, CardBody } from "../components/ui/3d-card";
import { toast, ToastContainer } from "react-toastify";
import { BACKEND_URL } from "../config";
import axios from "axios";
import Modal from 'react-modal';
import UsernotFound from "../components/UserNotfound";

export default function Profile() {
  const [viewMode, setViewMode] = useState<'owner' | 'visitor' | 'loading'>('owner');
  const { username } = useParams();
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);
  const [ismedium, setismedium] = useState(false);
  const [ishashnode, setishashnode] = useState(false);
  const [integrationUsername, setIntegrationUsername] = useState<String>("");
  const [integrating, setIntegrating] = useState(false);
  const [medumBlogs,setmediumBlogs] = useState([])
  const [hashnodeBlogs, sethashnodeBlogs] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setViewMode('visitor');
    const checkViewer = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/user/distinguish`, { username }, {
          headers: { Authorization: localStorage.getItem("token") }
        });
        setViewMode(response.data.viewer);
      } catch (err) {
        console.error("Error distinguishing viewer:", err);
        setViewMode('visitor');
      }
    };
    checkViewer();
  }, []);

  useEffect(() => {
    const fetchGithubProfile = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/user/profile`, { username });
        if(response.data.status==404){
          setLoading(false)
          window.location.href='/user-not-found'
        }
        setUser(response.data.data);
        console.log("from fetch profile:",user)
        setishashnode(response.data.hashnodeStatus);
        console.log("hey:",ishashnode);
        setismedium(response.data.mediumStatus);
      } catch (err) {
        console.error("GitHub API Error:", err);
      }
    };
    fetchGithubProfile();
  }, []);

  useEffect(() => {
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      // fetch bloggify blogs
      const response = await axios.post(`${BACKEND_URL}/user/blog`, { username });
      if (response.status === 404) toast.error("No user present");
      setBlogs(response.data.blogs || []);

      // fetch medium blogs
      const response2 = await axios.post(`${BACKEND_URL}/user/medium/blogs`, {
        username
      });
      setmediumBlogs(response2.data.mediumBlogs || []);

      // fetch hashnode blogs
      const response3 = await axios.post(`${BACKEND_URL}/user/hashnode/blogs`, {
        username
      });
      sethashnodeBlogs(response3.data.hashnodeBlogs || []); // Added fallback to prevent undefined
      console.log('Hashnode blogs:', response3.data.blogs);

    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      toast.error("Failed to fetch blogs");
      // Ensure all arrays are initialized even on error
      setBlogs([]);
      setmediumBlogs([]);
      sethashnodeBlogs([]);
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };
  
  fetchBlogs();
}, []);

  const getTextContent = (arr) => {
    if (!arr || !Array.isArray(arr)) return "No content";
    return arr.find(i => i.type === "text")?.text || "No content";
  };

  const handleIntegrate = async (source) => {
  try {
    setIntegrating(true);
    const response = await axios.post(`${BACKEND_URL}/user/${source}`, {
      mediumusername: integrationUsername, 
      hashnodeusername: String(integrationUsername),
      githubUsername: username
    });
    
    if (response.data.status == 500) { // Fixed: using 'response' instead of 'res'
      return toast.error("error in integration", {
        position: "top-right"
      });
    }
    
    setModalOpen(false);
    setTimeout(() => {
      toast.success("Integrated successfully!", {
        position: "top-right",
      });
      setIntegrating(false);
      setModalOpen(null);
    }, 1500);
  } catch (error) {
    console.error("Integration error:", error);
    toast.error("Integration failed", {
      position: "top-right"
    });
    setIntegrating(false);
  }
};

  if (loading || !user) {
    return <div className="min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center"><p>Loading...</p><ToastContainer /></div>;
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <GitHubNavbar />
      <ToastContainer />

      <div className="bg-[#1b1b1b] border border-gray-700 rounded-xl p-8 animate-fade-in shadow-md max-w-5xl mx-auto mt-6">
       
  <div className="flex flex-col md:flex-row gap-6">
    <img
      src={user.avatar_url}
      alt="avatar"
      className="w-28 h-28 md:w-36 md:h-36 rounded-xl ring-2 ring-gray-700 object-cover"
    />
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-white">{user.name || user.login}</h1>
      <p className="text-gray-400 mb-1">@{user.login}</p>
      <a
        href={`https://github.com/${user.login}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-400 hover:underline mb-2 inline-block"
      >
        View GitHub Profile →
      </a>
      <p className="text-gray-300 mb-4">{user.bio}</p>
      <div className="flex flex-wrap gap-4">
        {user.email && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Mail size={16} /> {user.email}
          </div>
        )}
        {user.location && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={16} /> {user.location}
          </div>
        )}
        {user.company && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Briefcase size={16} /> {user.company}
          </div>
        )}
      </div>
      <div className="flex gap-6 mt-4">
        <span className="flex items-center gap-2 text-gray-300 text-sm">
          <Users size={16} /> {user.followers} followers
        </span>
        <span className="flex items-center gap-2 text-gray-300 text-sm">
          <GitFork size={16} /> {user.following} following
        </span>
        <span className="flex items-center gap-2 text-gray-300 text-sm">
          <Star size={16} /> {user.public_repos} repos
        </span>
      </div>
    </div>
  </div>



        

{viewMode === 'owner' && (
  <div className="flex gap-6 mt-6 justify-center">
    {/* Medium Integration */}
    <button
      onClick={() => setModalOpen('medium')}
      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-sm"
    >
      {ismedium ? (
        <>
          <CheckCircle2 className="text-green-400 w-5 h-5" />
          Medium Integrated
        </>
      ) : (
        <>
          <Rss className="text-yellow-300 w-5 h-5" />
          Integrate Medium
        </>
      )}
    </button>

    {/* Hashnode Integration */}
    <button
      onClick={() => setModalOpen('hashnode')}
      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-sm"
    >
      {ishashnode ? (
        <>
          <CheckCircle2 className="text-green-400 w-5 h-5" />
          Hashnode Integrated
        </>
      ) : (
        <>
          <PlugZap className="text-blue-400 w-5 h-5" />
          Integrate Hashnode
        </>
      )}
    </button>
  </div>
)}

      </div>

      {/* bloggify blogs sect */}
      <div className="mx-auto px-4 py-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <h2 className="text-2xl font-semibold text-gray-400">No blogs found</h2>
                  <p className="text-gray-500 mt-2">Be the first to create a blog!</p>
                </div>
              ) : (
                blogs.map((blog, idx) => (
                  <CardContainer key={blog._id || idx}>
                    <CardBody className="bg-[#1a1a1a] hover:bg-[#262626] transition-all duration-300 shadow-lg rounded-2xl p-5 border border-gray-800">
                      <CardItem
                        translateZ={30}
                        className="text-2xl min-h-[10px] font-semibold text-white mb-2 truncate"
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
                        
                        <Link
                          to={`/blog/${blog._id}`}
                          className="text-sm text-blue-400 hover:underline flex items-center gap-1"
                        >
                          Read <ArrowRight size={16} />
                        </Link>
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                ))
              )}
            </div>
        {/* Medium Header */}
        {medumBlogs.length === 0 ? (
  <div></div>
) : (
  <div className="px-4 pt-10">
    <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
      <img
        src="https://cdn.iconscout.com/icon/free/png-256/medium-47-433328.png"
        alt="medium"
        className="bg-white w-6 h-6"
      />
      Medium Blogs
    </h2>
  </div>
)}

      {/* medium blogs */}
    <div className="mx-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {medumBlogs.length === 0 ? (
    <div></div>
  ) : (
    medumBlogs.map((blog, idx) => (
      <CardContainer key={blog._id || idx}>
        <CardBody className="bg-[#1a1a1a] hover:bg-[#262626] transition-all duration-300 shadow-xl rounded-2xl p-6 border border-gray-800 flex flex-col h-full justify-between">
          <div>
            <CardItem
              translateZ={30}
              className="text-xl font-semibold text-white mb-3 truncate"
              style={{ minHeight: "48px", maxHeight: "48px" }}
            >
              {blog.title?.slice(0, 28) + "..." || "Untitled"}
            </CardItem>

            <CardItem
              translateZ={20}
              className="text-sm text-gray-400 mb-4 line-clamp-3"
              style={{ minHeight: "60px", maxHeight: "60px" }}
            >
              {blog.description?.slice(0, 100) || "No description"}...
            </CardItem>
          </div>

          <CardItem translateZ={15}>
            {/* ❌ Don't use <Link> for external links */}
            <a
              href={blog.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition"
            >
              Read <ArrowRight size={16} className="ml-1" />
            </a>
          </CardItem>
        </CardBody>
      </CardContainer>
    ))
  )}
</div>

      {hashnodeBlogs.length === 0 ? null : (
  <div className="px-4 pt-10">
    <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
      <img
        src="https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png"
        alt="hashnode"
        className="w-6 h-6"
      />
      Hashnode Blogs
    </h2>
    {/* You can render blog items here using map */}
  </div>
)}

      <div className="mx-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {hashnodeBlogs.length === 0 ? (
   <div></div>
  ) : (
    hashnodeBlogs.map((blog, idx) => (
      <CardContainer key={blog._id || idx}>
        <CardBody className="bg-[#1a1a1a] hover:bg-[#262626] transition-all duration-300 shadow-xl rounded-2xl p-6 border border-gray-800 flex flex-col h-full justify-between">
          <div>
            <CardItem
              translateZ={30}
              className="text-xl font-semibold text-white mb-3 truncate"
              style={{ minHeight: "48px", maxHeight: "48px" }}
            >
              {blog.title?.slice(0, 28) + "..." || "Untitled"}
            </CardItem>

            <CardItem
              translateZ={20}
              className="text-sm text-gray-400 mb-4 line-clamp-3"
              style={{ minHeight: "60px", maxHeight: "60px" }}
            >
              {blog.description?.slice(0, 100) || "No description"}...
            </CardItem>
          </div>

          <CardItem translateZ={15}>
            {/* ❌ Don't use <Link> for external links */}
            <a
              href={blog.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition"
            >
              Read <ArrowRight size={16} className="ml-1" />
            </a>
          </CardItem>
        </CardBody>
      </CardContainer>
    ))
  )}
</div>


      {modalOpen && (
        <Modal isOpen onRequestClose={() => setModalOpen(null)} className="bg-[#1f1f1f] p-6 rounded-xl max-w-md mx-auto mt-24 shadow-lg text-white" overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <h2 className="text-xl font-semibold mb-4">Integrate with {modalOpen}</h2>
          <input value={integrationUsername} onChange={e => setIntegrationUsername(e.target.value)} placeholder="Enter {modalOpen} username" className="w-full px-4 py-2 rounded-md bg-gray-800 text-white mb-4" />
          <button onClick={()=>{
            handleIntegrate(modalOpen)
          }} disabled={integrating} className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md">
            {integrating ? "Integrating..." : "Integrate"}
          </button>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
}
