import { motion } from "framer-motion";
import Lottie from "lottie-react";
import robot404 from "./animations/usernotfound.json";

export default function UsernotFound() {
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
        className="text-4xl font-bold mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Whoops! This user is lost in the void.
      </motion.h1>

      <motion.p
        className="text-gray-400 mt-3 text-lg text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        Either they vanished into the matrix, or you just typed the wrong username.
        Our robot team is on it — but they're mostly just panicking.
      </motion.p>

      <motion.p
        className="text-gray-500 mt-2 text-sm text-center italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        (Pro tip: try not breaking the internet next time 🚀)
      </motion.p>

      <motion.a
        href="/"
        className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        🏠 Beam Me Home
      </motion.a>
    </div>
  );
}
