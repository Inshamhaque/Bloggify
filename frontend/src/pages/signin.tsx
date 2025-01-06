import { Auth2 } from "../components/Auth_signin";

export const Signin = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
            <div className="w-full max-w-md mb-8 text-center text-white font-bold text-xl">
                Back to inspire the world? Let your words shine today!
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <Auth2 str="signin" />
            </div>
        </div>
    );
};
