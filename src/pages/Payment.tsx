import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Heart, Sparkles, Users, Zap, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const plans = [
    {
      id: "basic",
      name: "基礎報告",
      price: "NT$ 299",
      features: [
        "MBTI 類型結果",
        "基礎相容性分析",
        "3 個推薦伴侶類型",
        "簡易配對建議"
      ],
      popular: false
    },
    {
      id: "premium", 
      name: "完整靈魂報告",
      price: "NT$ 599",
      originalPrice: "NT$ 999",
      features: [
        "詳細 MBTI 分析報告",
        "深度相容性評估",
        "16 種類型完整配對指南",
        "個人化追愛策略",
        "最佳約會地點推薦",
        "溝通技巧指南",
        "長期關係發展建議"
      ],
      popular: true
    },
    {
      id: "vip",
      name: "VIP 專屬服務",
      price: "NT$ 1,299",
      features: [
        "包含完整靈魂報告所有功能",
        "一對一專業諮詢 (30分鐘)",
        "個人化配對服務",
        "專屬交友平台推薦",
        "3個月免費更新",
        "優先客服支援"
      ],
      popular: false
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // 模擬 Stripe 付款處理
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 儲存付款資訊
      localStorage.setItem('paymentCompleted', 'true');
      localStorage.setItem('selectedPlan', selectedPlan);
      
      toast({
        title: "付款成功！",
        description: "正在生成您的專屬報告...",
      });
      
      // 跳轉到結果頁面
      setTimeout(() => {
        navigate('/results');
      }, 1000);
      
    } catch (error) {
      toast({
        title: "付款失敗",
        description: "請重試或聯絡客服",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soul-pink-50 via-white to-soul-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            選擇您的靈魂報告
          </h1>
          <p className="text-xl text-gray-600">
            測驗完成！選擇適合的方案，獲得專屬的配對分析
          </p>
        </motion.div>

        {/* Test completion indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            🎉 測驗完成！
          </h3>
          <p className="text-green-700">
            您的 MBTI 類型已確定，立即解鎖詳細報告以發現您的理想伴侶
          </p>
        </motion.div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-soul-gradient text-white px-6 py-2 rounded-full text-sm font-semibold">
                    🔥 最受歡迎
                  </span>
                </div>
              )}
              
              <Card 
                className={`card-soul h-full cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id 
                    ? 'ring-4 ring-soul-pink-400 shadow-2xl' 
                    : 'hover:ring-2 hover:ring-soul-pink-200'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold gradient-text">
                      {plan.price}
                    </div>
                    {plan.originalPrice && (
                      <div className="text-lg text-gray-500 line-through">
                        {plan.originalPrice}
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-soul-pink-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security and guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: Heart, text: "100% 準確分析" },
            { icon: Sparkles, text: "科學化配對" },
            { icon: Users, text: "專業團隊保證" },
            { icon: Zap, text: "即時獲得結果" }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="p-3 bg-soul-gradient rounded-full mb-3">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-700 font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Payment Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="max-w-md mx-auto card-soul">
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  已選擇：{plans.find(p => p.id === selectedPlan)?.name}
                </h3>
                <div className="text-2xl font-bold gradient-text">
                  {plans.find(p => p.id === selectedPlan)?.price}
                </div>
              </div>
              
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn-soul w-full text-lg py-6"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    處理付款中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    立即付款並獲得報告
                  </div>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                🔒 採用 256 位 SSL 加密保護<br />
                💳 支援信用卡、Apple Pay、Google Pay<br />
                📧 付款後立即發送報告到您的信箱
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;