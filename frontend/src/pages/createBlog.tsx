import { useNavigate } from 'react-router-dom';
import { Editor } from "../components/editor";
import { PublishBar } from "../components/PublishBar";

export const Createblog = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-blue-100">
      {/* Publish Bar at the top */}
      <div className="w-full flex justify-center py-4 bg-white shadow-md">
        <PublishBar />
      </div>

      {/* Blog Editor Section */}
      <div className="w-[90%] lg:w-[60%] mx-auto py-[3rem] text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Create Your Blog
        </h1>
        <p className="text-gray-600 mt-2">
          Express your ideas and share them with the world.
        </p>

        <Editor />
        
        {/* Publish Button */}
        <button className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition transform hover:scale-105" onClick={()=>{ navigate('/edit');}}>          Publish Blog
        </button>
      </div>
    </div>
  );
};
