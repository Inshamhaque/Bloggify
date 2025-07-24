// components/Funny404.jsx
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import robot404 from "./animations/robot404.json"; // Your JSON file

export default function Funny404() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Lottie animationData={robot404} loop={true} />
      </motion.div>

      <motion.h1
        className="text-4xl font-bold mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Uh-oh... You broke the internet.
      </motion.h1>

      <motion.p
        className="text-gray-400 mt-3 text-lg text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        Our servers are sending a search party (made of robots) to find your page. 
        In the meantime, maybe try turning it off and on again?
      </motion.p>

      <motion.a
        href="/"
        className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        🏠 Go Back Home
      </motion.a>
    </div>
  );
}
