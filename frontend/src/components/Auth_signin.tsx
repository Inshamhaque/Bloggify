import { ChangeEvent, useState } from "react";
import { signininput } from '@haqueinsham/medium';
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface Authprops {
    str: string;
}

export const Auth2 = ({ str }: Authprops) => {
    const [postinput, setpostinput] = useState<signininput>({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    
    async function sendReq() {
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postinput);
        const response = res.data;
        const jwt = response.jwt;
        localStorage.setItem("jwt", jwt);
        navigate('/blogs');
    }
    
    return (
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                {str === 'signup' ? "Create an Account" : "Sign into Your account"}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                {str === 'signup' ? "Already have an Account?" : "Don't have an account?"}{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {str === 'signup' ? "Sign in" : "Sign up"}
                </a>
            </p>
            <InputPlaceholder
                label="Email"
                placeholder="m@example.com"
                onchange={(e) => {
                    setpostinput({
                        ...postinput,
                        email: e.target.value
                    });
                }}
            />
            <InputPlaceholder
                label="Password"
                type="password"
                placeholder="Enter password"
                onchange={(e) => {
                    setpostinput({
                        ...postinput,
                        password: e.target.value
                    });
                }}
            />
            <button
                onClick={sendReq}
                type="button"
                className="mt-6 w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-medium rounded-md text-sm px-5 py-2.5"
            >
                {str === 'signup' ? 'Sign Up' : 'Sign in'}
            </button>
        </div>
    );
};

interface InputPlaceholdertype {
    label: string;
    placeholder: string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function InputPlaceholder({ label, placeholder, onchange, type }: InputPlaceholdertype) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <input
                onChange={onchange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
