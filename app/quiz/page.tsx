'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface Quiz {
  id: string;
  question: string;
  type: string;
  options: string[];
  answer_key: { correct: number };
  feedback: Record<string, string>;
}

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuizzes, setAnsweredQuizzes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  async function fetchQuizzes() {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .limit(5);

      if (error) throw error;

      setQuizzes(data || []);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  }

  const currentQuiz = quizzes[currentQuizIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    
    if (selectedAnswer === currentQuiz.answer_key.correct) {
      setScore(score + 1);
    }
    
    setAnsweredQuizzes([...answeredQuizzes, currentQuizIndex]);
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuizzes([]);
  };

  const getAnswerColor = (index: number) => {
    if (!showFeedback) return 'bg-gray-50 hover:bg-blue-50 border-gray-200';
    
    if (index === currentQuiz.answer_key.correct) {
      return 'bg-green-50 border-green-500 text-green-700';
    }
    
    if (index === selectedAnswer && index !== currentQuiz.answer_key.correct) {
      return 'bg-red-50 border-red-500 text-red-700';
    }
    
    return 'bg-gray-50 border-gray-200';
  };

  const getAnswerIcon = (index: number) => {
    if (!showFeedback) return null;
    
    if (index === currentQuiz.answer_key.correct) {
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    }
    
    if (index === selectedAnswer && index !== currentQuiz.answer_key.correct) {
      return <XCircle className="h-5 w-5 text-red-600" />;
    }
    
    return null;
  };

  const getFeedbackType = (index: number) => {
    if (index === currentQuiz.answer_key.correct) return 'Korrekt';
    
    const feedback = currentQuiz.feedback[index.toString()];
    if (feedback.includes('Delvist')) return 'Delvist';
    if (feedback.includes('Problematisk') || feedback.includes('Ineffektivt')) return 'Problematisk';
    return 'Ikke effektivt';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">Henter quiz...</div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="text-center py-8">
            <p>Ingen quiz tilgængelige endnu.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz completed
  if (currentQuizIndex >= quizzes.length) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Gennemført! 🎉</CardTitle>
            <CardDescription>
              Du scorede {score} ud af {quizzes.length} korrekte svar
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl font-bold text-blue-600">
              {Math.round((score / quizzes.length) * 100)}%
            </div>
            <div className="space-y-2">
              {score === quizzes.length && (
                <p className="text-green-600 font-medium">Fantastisk! Du har styr på det! 🌟</p>
              )}
              {score >= quizzes.length * 0.7 && score < quizzes.length && (
                <p className="text-blue-600 font-medium">Rigtig godt klaret! 👏</p>
              )}
              {score < quizzes.length * 0.7 && (
                <p className="text-orange-600 font-medium">God indsats - øvelse gør mester! 💪</p>
              )}
            </div>
            <Button onClick={handleRestartQuiz} className="mt-4">
              Prøv Igen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Quiz</h1>
          <Badge variant="outline">
            Spørgsmål {currentQuizIndex + 1} af {quizzes.length}
          </Badge>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuizIndex) / quizzes.length) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuiz.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Answer options */}
          <div className="space-y-3">
            {currentQuiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${getAnswerColor(index)} ${
                  selectedAnswer === index ? 'ring-2 ring-blue-500' : ''
                } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{option}</span>
                  {getAnswerIcon(index)}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback section */}
          {showFeedback && selectedAnswer !== null && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-blue-900 mb-2">
                    {getFeedbackType(selectedAnswer)}
                  </div>
                  <p className="text-blue-800">
                    {currentQuiz.feedback[selectedAnswer.toString()]}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-between pt-4">
            <div className="text-sm text-gray-500">
              Score: {score}/{answeredQuizzes.length}
            </div>
            
            <div className="space-x-2">
              {!showFeedback ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                >
                  Bekræft Svar
                </Button>
              ) : (
                <Button onClick={handleNextQuiz}>
                  {currentQuizIndex < quizzes.length - 1 ? (
                    <>
                      Næste Spørgsmål
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    'Se Resultat'
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}