import { useEffect, useState } from "react";
import axios from "axios";

// TODO : add zod validation with reference to the server schema of user
export default function GitHubNavbar() {
  const [user, setUser] = useState(null);

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

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold tracking-wide">Bloggify</div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-400">@{user.login}</div>
          </div>
          <img
            src={user.avatar_url}
            alt="GitHub avatar"
            className="w-10 h-10 rounded-full border-2 border-white hover:scale-105 transition"
          />
        </div>
      )}
    </nav>
  );
}
