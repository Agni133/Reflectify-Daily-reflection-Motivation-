import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold mb-6 max-w-3xl"
      >
        Reflectify Me
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl"
      >
        Feel lighter, think clearer, and stay motivated— all in one calm app.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Link to="/login">
          <Button className=" bg-blue-500/20 hover:bg-blue-800 text-white px-8 py-4 text-lg rounded-full shadow-lg transition">
            🌿 Start reflecting
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
