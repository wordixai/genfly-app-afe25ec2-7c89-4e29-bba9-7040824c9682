import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: "靈魂匹配",
      description: "基於MBTI深度分析，找到真正與你心靈相通的伴侶"
    },
    {
      icon: Sparkles,
      title: "個性洞察",
      description: "詳細的性格分析報告，幫你更了解自己和理想伴侶"
    },
    {
      icon: Users,
      title: "精準配對",
      description: "科學的配對算法，提高遇見對的人的機率"
    },
    {
      icon: Zap,
      title: "即時結果",
      description: "快速獲得測試結果和詳細的伴侶指南"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soul-pink-50 via-white to-soul-purple-50">
      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold gradient-text"
          >
            ✨ SoulMatch
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-x-4"
          >
            <Button variant="ghost" className="text-soul-purple-600">關於我們</Button>
            <Button variant="outline" className="border-soul-pink-300">登入</Button>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              發現你的
              <span className="gradient-text block">靈魂伴侶</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              透過 MBTI 心理測驗，深度分析你的性格特質，找到最適合的人生伴侶
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                onClick={() => navigate('/quiz')}
                className="btn-soul text-lg px-12 py-6"
              >
                開始測驗 ✨
              </Button>
              <p className="text-sm text-gray-500">
                只需 5 分鐘，改變你的愛情命運
              </p>
            </div>
          </motion.div>
        </div>

        {/* Floating Hearts Animation */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-soul-pink-300 text-2xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 10, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💖
          </motion.div>
        ))}
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              為什麼選擇 <span className="gradient-text">SoulMatch</span>？
            </h2>
            <p className="text-xl text-gray-600">
              科學、準確、深入的心理分析配對系統
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-soul h-full">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 inline-flex p-3 bg-soul-gradient rounded-full">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MBTI Types Preview */}
      <section className="py-20 px-6 bg-gradient-to-r from-soul-pink-50 to-soul-purple-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              探索 <span className="gradient-text">16 種人格類型</span>
            </h2>
            <p className="text-xl text-gray-600">
              每種性格都有其獨特的愛情模式和理想伴侶
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'INTJ', 'INTP', 'ENTJ', 'ENTP',
              'INFJ', 'INFP', 'ENFJ', 'ENFP',
              'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
              'ISTP', 'ISFP', 'ESTP', 'ESFP'
            ].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="mbti-card"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">{type}</h3>
                <div className="text-xs text-gray-600">
                  {index % 4 === 0 && "分析型"}
                  {index % 4 === 1 && "外交型"}
                  {index % 4 === 2 && "守護型"}
                  {index % 4 === 3 && "探險型"}
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-soul-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-soul-purple-600 to-soul-pink-600 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              準備好遇見
              <br />
              你的靈魂伴侶了嗎？
            </h2>
            <p className="text-xl opacity-90">
              超過 10,000 位用戶已經透過我們找到了真愛
            </p>
            <Button
              onClick={() => navigate('/quiz')}
              className="bg-white text-soul-purple-600 hover:bg-gray-100 text-lg px-12 py-6 rounded-full font-semibold transform hover:scale-105 transition-all duration-300"
            >
              立即開始測驗 💕
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold gradient-text mb-4">✨ SoulMatch</div>
          <p className="text-gray-400 mb-8">
            讓科學幫助你找到真愛
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">隱私政策</a>
            <a href="#" className="hover:text-white transition-colors">服務條款</a>
            <a href="#" className="hover:text-white transition-colors">聯絡我們</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;