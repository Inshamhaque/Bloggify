import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export const Signup = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
            {/* Auth Component */}
            <Auth str="signup" />

            {/* Quote Component */}
            <div className="absolute bottom-4 right-4 hidden lg:block">
                <Quote />
            </div>
        </div>
    );
};
