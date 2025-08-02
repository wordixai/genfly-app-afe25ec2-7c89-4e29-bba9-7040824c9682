import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 0,
      category: "E/I",
      question: "在派對中，你更傾向於？",
      options: [
        { value: "E", label: "主動與很多人交談，成為聚會的焦點" },
        { value: "I", label: "與少數幾個親近的朋友深入交談" }
      ]
    },
    {
      id: 1,
      category: "E/I",
      question: "週末你更喜歡？",
      options: [
        { value: "E", label: "參加聚會或戶外活動，與朋友們共度時光" },
        { value: "I", label: "在家休息，看書或做自己喜歡的事情" }
      ]
    },
    {
      id: 2,
      category: "S/N",
      question: "在做決定時，你更重視？",
      options: [
        { value: "S", label: "具體的事實和已有的經驗" },
        { value: "N", label: "可能性和未來的發展潛力" }
      ]
    },
    {
      id: 3,
      category: "S/N",  
      question: "你更喜歡的學習方式是？",
      options: [
        { value: "S", label: "按部就班，從基礎開始循序漸進" },
        { value: "N", label: "跳躍式思考，先了解大概念再填補細節" }
      ]
    },
    {
      id: 4,
      category: "T/F",
      question: "在幫助朋友解決問題時？",
      options: [
        { value: "T", label: "客觀分析問題，提供實際的解決方案" },
        { value: "F", label: "先關心朋友的感受，給予情感上的支持" }
      ]
    },
    {
      id: 5,
      category: "T/F",
      question: "你認為更重要的是？",
      options: [
        { value: "T", label: "公正和原則，即使有時會傷害到他人" },
        { value: "F", label: "和諧與體諒，盡量避免衝突" }
      ]
    },
    {
      id: 6,
      category: "J/P",
      question: "對於計劃，你的態度是？",
      options: [
        { value: "J", label: "喜歡提前制定詳細計劃並嚴格執行" },
        { value: "P", label: "保持彈性，根據情況隨時調整" }
      ]
    },
    {
      id: 7,
      category: "J/P",
      question: "面對截止日期？",
      options: [
        { value: "J", label: "提早完成，避免最後一刻的壓力" },
        { value: "P", label: "在截止日期前有壓力時才最有動力" }
      ]
    },
    // 愛情相關問題
    {
      id: 8,
      category: "Love-E/I",
      question: "理想的約會是？",
      options: [
        { value: "E", label: "熱鬧的活動，和很多朋友一起聚會" },
        { value: "I", label: "安靜的兩人世界，深入分享彼此的想法" }
      ]
    },
    {
      id: 9,
      category: "Love-S/N",
      question: "你希望伴侶？",
      options: [
        { value: "S", label: "實際可靠，能處理好生活中的各種事務" },
        { value: "N", label: "有創意和想像力，能和你一起夢想未來" }
      ]
    },
    {
      id: 10,
      category: "Love-T/F",
      question: "在關係中遇到分歧時？",
      options: [
        { value: "T", label: "希望能理性討論，找出最佳解決方案" },
        { value: "F", label: "更關注彼此的感受，維持關係的和諧" }
      ]
    },
    {
      id: 11,
      category: "Love-J/P",
      question: "你期望的相處模式是？",
      options: [
        { value: "J", label: "有規律的生活節奏和明確的未來規劃" },
        { value: "P", label: "自然隨性的相處，保持一定的自由空間" }
      ]
    }
  ];

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      toast({
        title: "請選擇一個答案",
        description: "在進入下一題前，請先選擇一個最符合你的答案",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // 測驗完成，進入付費頁面
      const mbtiResult = calculateMBTI(answers);
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
      localStorage.setItem('mbtiResult', mbtiResult);
      navigate('/payment');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateMBTI = (answers: Record<number, string>) => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    Object.values(answers).forEach(answer => {
      if (counts.hasOwnProperty(answer)) {
        counts[answer as keyof typeof counts]++;
      }
    });

    const mbti = 
      (counts.E >= counts.I ? 'E' : 'I') +
      (counts.S >= counts.N ? 'S' : 'N') +
      (counts.T >= counts.F ? 'T' : 'F') +
      (counts.J >= counts.P ? 'J' : 'P');

    return mbti;
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soul-pink-50 via-white to-soul-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">
            MBTI 靈魂伴侶測驗
          </h1>
          <p className="text-gray-600">
            回答問題，發現真實的自己和理想伴侶
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              問題 {currentQuestion + 1} / {totalQuestions}
            </span>
            <span className="text-sm font-medium text-soul-purple-600">
              {Math.round(progress)}% 完成
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="card-soul mb-8">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-soul-gradient rounded-full">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl font-semibold text-gray-800">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswerChange}
                className="space-y-4"
              >
                {currentQ.options.map((option, index) => (
                  <motion.div
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-soul-pink-200 transition-colors cursor-pointer"
                    onClick={() => handleAnswerChange(option.value)}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label 
                      htmlFor={option.value}
                      className="text-gray-700 leading-relaxed cursor-pointer flex-1"
                    >
                      {option.label}
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            上一題
          </Button>

          <Button
            onClick={handleNext}
            className="btn-soul flex items-center gap-2"
          >
            {currentQuestion === totalQuestions - 1 ? "完成測驗" : "下一題"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Category indicator */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
            測驗類別: {currentQ.category.replace('Love-', '愛情偏好-')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Quiz;