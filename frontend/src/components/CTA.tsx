import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function CTA() {
  const benefits = [
    "7-day free trial",
    "No credit card required",
    "Cancel anytime",
    "24/7 support"
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
        {/* Urgency Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex -mt-4 items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6 text-sm"
        >
          <Sparkles className="w-4 h-4 mt-0 text-green-400 animate-pulse" />
          <span className="text-green-300">Start your mindful journey today</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
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

        {/* Final Trust Signal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-gray-400 text-sm"
        >
          🔒 Your thoughts stay private and secure
        </motion.div>
      </div>
    </footer>
  );
}