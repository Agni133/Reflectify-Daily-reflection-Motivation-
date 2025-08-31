import { Sparkles, Heart, PenLine, Shield, Zap, TrendingUp, Clock, Smile } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      icon: PenLine,
      title: "Daily Journaling",
      description: "Pour your heart out in a private, safe space. Write freely with prompts and guidance when you need it.",
      highlight: "Private & Secure",
      stats: "100% Safe and trusted"
    },
    {
      icon: Sparkles,
      title: "Mood & Quote Collection",
      description: "Track how you feel each day and save inspiring random anime quotes that spark joy and motivation.",
      highlight: "Track Progress",
      stats: "Visual mood trends"
    },
    {
      icon: Heart,
      title: "Mindful Habits",
      description: "Build simple daily rituals that lift your mind with gentle reminders and streak tracking.",
      highlight: "Habit Building",
      stats: "21-day challenges"
    }
  ];

  const benefits = [
    { icon: TrendingUp, title: "Track Progress", desc: "Visual mood trends" },
    { icon: Shield, title: "Private & Secure", desc: "Your data stays yours" },
    { icon: Clock, title: "Quick & Easy", desc: "5-min daily check-ins" },
    { icon: Smile, title: "Feel Better", desc: "Build positive habits" },
    { icon: Zap, title: "Stay Motivated", desc: "Streak tracking & goals" },
    { icon: Sparkles, title: "Get Inspired", desc: "Save meaningful random quotes" }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 -mt-20"
        > 
          <h2 className="text-4xl md:text-5xl font-bold mb-6 p-5 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Why Reflectify Me?
          </h2> 
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Simple, powerful tools for daily reflection and mindful living
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/5 border border-blue-500/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                    {feature.highlight}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <Sparkles className="w-4 h-4" />
                  <span>{feature.stats}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-white">
            Everything you need for mindful growth
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/20 transition-all duration-300 hover:transform hover:scale-105"
              >
                <benefit.icon className="w-8 h-8 mx-auto mb-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <h4 className="font-medium text-white text-sm mb-1">{benefit.title}</h4>
                <p className="text-gray-400 text-xs">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">Private</div>
              <div className="text-gray-300 text-sm">Your thoughts stay yours</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">Simple</div>
              <div className="text-gray-300 text-sm">5 minutes daily</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">Secure</div>
              <div className="text-gray-300 text-sm">Safe and trustful</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
