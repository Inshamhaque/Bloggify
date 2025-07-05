import pic from './th.jpeg';
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../hooks/ThemeToggle';

export const PublishBar = () => {
    const navigate = useNavigate();

    return ( 
        <div className="w-full py-3 px-6 flex justify-between items-center dark:bg-gray-900">
            {/* Left Section */}
            <div className="flex items-center gap-x-20">
                    <div className="flex gap-3 font-serif text-xl cursor-pointer font-semibold text-blue-900" onClick={() => navigate('/')}>
                        Bloggify
                        <img  className="h-10 w-auto transition-transform duration-200 hover:scale-105"  src={logo} alt="bloggify.icon" />
                    </div>
                
                <span className="font-mono text-gray-600 text-sm italic"> Draft in Progress... ✏️</span>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-x-6">
                <ThemeToggle/>
                {/* Publish Button */}
                <button
                    type="button"
                    className="px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-700 transition"
                    onClick={() => navigate('/edit')}
                >
                    Publish
                </button>

                {/* Icons Section */}
                <div className="flex items-center gap-x-4">
                    {/* Dots Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="grey" className="w-6 h-6 cursor-pointer hover:stroke-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>

                    {/* Notification Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="grey" className="w-6 h-6 cursor-pointer hover:stroke-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>

                    {/* Profile Image */}
                    <img className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer hover:border-red-500 transition" src={pic} alt="Author avatar" />
                </div>
            </div>
        </div>
    );
};
