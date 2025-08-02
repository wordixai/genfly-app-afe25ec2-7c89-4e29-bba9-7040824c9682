import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Download, 
  Share2, 
  MapPin, 
  MessageCircle, 
  Calendar,
  Star,
  Users,
  Coffee
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mbtiType, setMbtiType] = useState("");

  useEffect(() => {
    const paymentCompleted = localStorage.getItem('paymentCompleted');
    const storedMbtiType = localStorage.getItem('mbtiResult');
    
    if (!paymentCompleted || !storedMbtiType) {
      navigate('/');
      return;
    }
    
    setMbtiType(storedMbtiType);
  }, [navigate]);

  const mbtiData: Record<string, any> = {
    "INTJ": {
      name: "建築師",
      description: "獨立、創新的戰略思考者",
      traits: ["理性", "獨立", "有遠見", "完美主義"],
      compatibility: {
        perfect: ["ENFP", "ENTP"],
        good: ["INFJ", "INFP", "ENTJ"],
        challenging: ["ESFJ", "ISFJ"]
      },
      loveStyle: "深度連結型",
      idealPartner: "能夠理解你的深層思考，並與你一起規劃未來的人",
      strengths: ["忠誠專一", "深度溝通", "理性決策"],
      challenges: ["表達情感", "日常浪漫", "社交場合"]
    },
    "ENFP": {
      name: "競選者",
      description: "熱情、創意的自由靈魂",
      traits: ["熱情", "創新", "同理心", "靈活"],
      compatibility: {
        perfect: ["INTJ", "INFJ"],
        good: ["ENFJ", "INTP", "ENTP"],
        challenging: ["ISTJ", "ESTJ"]
      },
      loveStyle: "浪漫冒險型",
      idealPartner: "能欣賞你的創意和熱情，願意一起探索世界的人",  
      strengths: ["浪漫創意", "情感豐富", "支持鼓勵"],
      challenges: ["承諾焦慮", "注意力分散", "過度理想化"]
    }
    // 可以添加更多 MBTI 類型
  };

  const currentData = mbtiData[mbtiType] || mbtiData["ENFP"];

  const compatibilityColors = {
    perfect: "compatibility-high",
    good: "compatibility-medium", 
    challenging: "compatibility-low"
  };

  const datingTips = [
    {
      category: "首次約會",
      icon: Coffee,
      tips: [
        "選擇安靜的咖啡廳，便於深度對話",
        "準備一些有趣的話題，避免沉默",
        "展現你的真實想法和專業知識"
      ]
    },
    {
      category: "約會地點",
      icon: MapPin,
      tips: [
        "博物館、藝廊等文化場所",
        "書店或圖書館咖啡區",
        "有特色的小餐廳"
      ]
    },
    {
      category: "溝通技巧",
      icon: MessageCircle,
      tips: [
        "主動分享你的想法和計劃",
        "詢問對方的觀點和感受",
        "給予對方足夠的思考時間"
      ]
    },
    {
      category: "長期發展",
      icon: Calendar,
      tips: [
        "建立共同目標和未來規劃",
        "保持個人空間和獨立思考",
        "定期進行深度對話"
      ]
    }
  ];

  const findPartnerPlatforms = [
    {
      name: "Coffee Meets Bagel",
      type: "質量導向",
      description: "每日精選配對，適合尋找認真關係",
      suitability: 95
    },
    {
      name: "Hinge",
      type: "深度了解",
      description: "透過回答問題展現個性，更容易找到匹配的人",
      suitability: 90
    },
    {
      name: "eHarmony", 
      type: "科學配對",
      description: "基於心理測驗的科學配對系統",
      suitability: 85
    },
    {
      name: "Bumble",
      type: "女性主導",
      description: "讓女性先開啟對話，減少不必要的打擾",
      suitability: 75
    }
  ];

  const handleDownload = () => {
    toast({
      title: "報告下載中",
      description: "完整 PDF 報告將發送到您的信箱"
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SoulMatch MBTI 測驗結果',
        text: `我的 MBTI 類型是 ${mbtiType} - ${currentData.name}！`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "連結已複製",
        description: "快去分享給你的朋友吧！"
      });
    }
  };

  if (!mbtiType) {
    return <div>載入中...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soul-pink-50 via-white to-soul-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-soul-gradient rounded-full">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            您的 <span className="gradient-text">MBTI 靈魂分析</span>
          </h1>
          
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 max-w-2xl mx-auto shadow-lg">
            <div className="text-6xl font-bold gradient-text mb-2">
              {mbtiType}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {currentData.name}
            </h2>
            <p className="text-lg text-gray-600">
              {currentData.description}
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4 mb-12"
        >
          <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            下載完整報告
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            分享結果
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personality Traits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="card-soul mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-soul-pink-500" />
                  個性特質
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {currentData.traits.map((trait: string, index: number) => (
                    <Badge key={index} variant="secondary" className="px-3 py-2 text-center">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Love Style */}
            <Card className="card-soul">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-soul-pink-500" />
                  愛情風格
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-4">
                    {currentData.loveStyle}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {currentData.idealPartner}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Compatibility */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="card-soul mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-soul-pink-500" />
                  配對相容性
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(currentData.compatibility).map(([level, types]: [string, any]) => (
                  <div key={level}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-4 h-4 rounded-full ${compatibilityColors[level as keyof typeof compatibilityColors]}`}></div>
                      <span className="font-semibold capitalize">
                        {level === 'perfect' && '完美配對'}
                        {level === 'good' && '良好配對'}  
                        {level === 'challenging' && '需要努力'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {types.map((type: string) => (
                        <Badge key={type} variant="outline" className="font-mono">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Strengths and Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          <Card className="card-soul">
            <CardHeader>
              <CardTitle className="text-green-600">愛情優勢 💪</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentData.strengths.map((strength: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="card-soul">
            <CardHeader>
              <CardTitle className="text-orange-600">需要注意 ⚠️</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentData.challenges.map((challenge: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dating Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            專屬 <span className="gradient-text">約會指南</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {datingTips.map((section, index) => (
              <Card key={index} className="card-soul">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <section.icon className="w-5 h-5 text-soul-purple-500" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <span className="text-soul-pink-500 mt-1">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Where to Find Your Partner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            在哪裡<span className="gradient-text">尋找伴侶</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {findPartnerPlatforms.map((platform, index) => (
              <Card key={index} className="card-soul">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{platform.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {platform.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">
                        {platform.suitability}%
                      </div>
                      <div className="text-xs text-gray-500">適合度</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{platform.description}</p>
                  
                  <Progress value={platform.suitability} className="h-2 mb-4" />
                  
                  <Button variant="outline" className="w-full">
                    了解更多
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-soul-purple-600 to-soul-pink-600 text-white rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            準備開始你的愛情旅程了嗎？
          </h2>
          <p className="text-xl opacity-90 mb-8">
            現在你已經了解自己，是時候去尋找你的靈魂伴侶了！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-soul-purple-600 hover:bg-gray-100"
            >
              分享給朋友一起測試
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-soul-purple-600"
            >
              重新測驗
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;