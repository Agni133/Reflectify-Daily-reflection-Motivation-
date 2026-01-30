import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function CTA() {
  const benefits = [
    "No credit card required",
    "Free of Cost",
  ];

  return (
    <footer className="relative py-24 text-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex -mt-9s items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6 text-sm"
        >
          <Sparkles className="w-4 h-4 mt-0 text-green-400 animate-pulse" />
          <span className="text-green-300">Start your mindful journey today</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-6 mt-7 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Ready to feel lighter & more focused?
          </span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Begin your journey toward more mindful, intentional living
        </motion.p>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-6 mb-10"
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>{benefit}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12"
        >
          <Link to="/register">
            <Button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 text-xl rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative flex items-center">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
        </motion.div>

        {/* Testimonial Preview   */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm relative">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-white mb-4">
                Ready to start reflecting?
              </h4>
              <p className="text-gray-300">
                Create your private journal space and begin building a habit of mindful reflection.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-gray-800"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto mb-8">
            {/* Product Column */}
            <div>
              <h5 className="text-white font-semibold mb-4">Product</h5>
              <ul className="space-y-2">
                <li className="text-gray-400 hover:text-white transition-colors">
                    Features
                </li>
                <li className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h5 className="text-white font-semibold mb-4">Support</h5>
              <ul className="space-y-2">
                <li className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                </li>
                <li className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h5 className="text-white font-semibold mb-4">Legal</h5>
              <ul className="space-y-2">
                <li className="text-gray-400 hover:text-white transition-colors">
                    Privacy
                </li>
                <li className="text-gray-400 hover:text-white transition-colors">
                    Terms
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright and Social Links */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Your Journal App
            </div>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}