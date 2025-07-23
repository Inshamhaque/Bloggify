import { useEffect, useState } from "react";
import axios from "axios";
import bloggify from "../assets/bloggify.png";
import { toast, ToastContainer } from "react-toastify";
import { BACKEND_URL } from "../config";
import { PencilLine, LayoutDashboard, LogOut } from "lucide-react";

type User = {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
  email: string;
  githubuserid: string;
  bio: string;
};

export default function GitHubNavbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const access_token = localStorage.getItem("token");
      if (!access_token) return;

      try {
        const response = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/vnd.github+json",
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching GitHub user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const loginUser = async () => {
      if (!user) return;

      try {
        const response = await axios.post(`${BACKEND_URL}/user/login`, {
          id: user.id,
          name: user.name,
          githubUsername: user.login,
          email: user.email ?? "none",
          avatarUrl: user.avatar_url || "none",
          bio: user.bio || "none",
          access_token: localStorage.getItem("token"),
        });

        if (response.data.status === 500) {
          return toast.error("Error logging in user", {
            position: "top-right",
          });
        }

        console.log("user authenticated");
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed", {
          position: "top-right",
        });
      }
    };

    loginUser();
    console.log(user)
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <nav className="bg-[#0a0a0a] text-white px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-500">
      <div className="flex justify-between w-full items-center">
        <img
          onClick={() => {
            window.location.href = "/";
          }}
          className="h-10 w-auto hover:cursor-pointer"
          src={bloggify}
          alt="Bloggify Logo"
        />

        <div className="flex gap-10 items-center">
          <a
            href="/create"
            className="flex items-center gap-2 hover:text-gray-300 transition"
          >
            <PencilLine className="w-5 h-5" />
            <span className="hidden sm:inline">Create</span>
          </a>

          <a
            href="/dashboard"
            className="flex items-center gap-2 hover:text-gray-300 transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="hidden sm:inline">Dashboard</span>
          </a>

          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-400">@{user.login}</div>
              </div>
              <img
                src={user.avatar_url}
                onClick={()=>{
                  window.location.href=`/u/${(user.name).split(" ")[0]}`
                }}
                alt="GitHub avatar"
                className="w-10 h-10 rounded-full border-2 border-white hover:scale-105 transition"
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-red-400 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
}
