import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {  ArrowRight} from "lucide-react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 px-6">
      {/* Starting  line pitch  */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6 text-sm"
      >
        <span className="text-gray-300 text-xl italic">Your personal space for daily reflection</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl leading-tight"
      >
        <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Reflectify Me
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl leading-relaxed"
      >
        Feel lighter, think clearer, and stay motivated— all in one calm app.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-lg text-gray-400 mb-10 max-w-xl"
      >
        Your private space for daily journaling, mood tracking, and building mindful habits that stick.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        <Link to="/register">
          <Button className="group bg-gradient-to-r font-bold from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 items-center">
                🌿 Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform font-bold" />
          </Button>
        </Link> 
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="flex flex-wrap justify-center items-center gap-6 mt-12 text-sm text-gray-400"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>No credit card required</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>Intial Launch Free of Cost </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span>Cancel anytime till than enjoy free version  </span>
        </div>
      </motion.div>

      {/* Floating App Preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="mt-16 relative"
      >
        <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm shadow-2xl max-w-2xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-75"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 text-left">
              <div className="mb-4">
                <h4 className="text-sm text-gray-400 mb-2 ">Quote of the Day</h4>
                <p className="text-gray-300 text-base italic mb-2">
                  "The way to get started is to quit talking and begin doing."
                </p>
                <p className="text-sm text-gray-500">— Walt Disney</p>
                <div className="flex gap-2 mt-3">
                  <div className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">Random Quote</div>
                  <div className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-full">Happy Quote</div>
                </div>
              </div>
              
              <div className="border-t border-gray-600 pt-4">
                <h4 className="text-sm text-gray-400 mb-2">Write Your Thoughts</h4>
                <p className="text-gray-300 text-base">
                  "Feeling motivated after reading that quote. Today I want to focus on taking action rather than just planning..."
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-blue-400 text-sm">📝 Journal Entry</span>
                  <span className="text-gray-500 text-sm">Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}