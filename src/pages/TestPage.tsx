import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  CheckCircle,
  AlertCircle,
  RotateCcw
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Mock questions - in production, these would come from your backend
const mockQuestions: Question[] = [
  {
    id: 1,
    question: "Which of the following is the primary mechanism of action of aspirin?",
    options: [
      "Inhibition of cyclooxygenase (COX) enzymes",
      "Blockade of sodium channels",
      "Activation of GABA receptors",
      "Inhibition of acetylcholinesterase"
    ],
    correctAnswer: 0,
    explanation: "Aspirin irreversibly inhibits cyclooxygenase (COX) enzymes, particularly COX-1 and COX-2, which are responsible for prostaglandin synthesis. This inhibition leads to its anti-inflammatory, analgesic, and antipyretic effects.",
    difficulty: 'medium'
  },
  {
    id: 2,
    question: "What is the recommended first-line treatment for hypertension in patients without compelling indications?",
    options: [
      "Beta-blockers",
      "ACE inhibitors or ARBs",
      "Calcium channel blockers",
      "Diuretics"
    ],
    correctAnswer: 1,
    explanation: "According to current guidelines, ACE inhibitors or ARBs are recommended as first-line therapy for hypertension in most patients without compelling indications, due to their cardiovascular protective effects.",
    difficulty: 'easy'
  },
  {
    id: 3,
    question: "Which pharmacokinetic parameter describes the fraction of administered drug that reaches systemic circulation?",
    options: [
      "Clearance",
      "Volume of distribution",
      "Bioavailability",
      "Half-life"
    ],
    correctAnswer: 2,
    explanation: "Bioavailability (F) is defined as the fraction of administered drug that reaches the systemic circulation in unchanged form. For IV administration, F = 1 (100%), while oral bioavailability is often less due to first-pass metabolism and incomplete absorption.",
    difficulty: 'medium'
  },
  {
    id: 4,
    question: "Which of the following antibiotics works by inhibiting bacterial cell wall synthesis?",
    options: [
      "Tetracycline",
      "Gentamicin",
      "Penicillin",
      "Ciprofloxacin"
    ],
    correctAnswer: 2,
    explanation: "Penicillin and other beta-lactam antibiotics work by inhibiting bacterial cell wall synthesis. They bind to penicillin-binding proteins (PBPs) and prevent the cross-linking of peptidoglycan chains in the bacterial cell wall.",
    difficulty: 'easy'
  },
  {
    id: 5,
    question: "What is the primary concern with concurrent use of warfarin and aspirin?",
    options: [
      "Reduced anticoagulant effect",
      "Increased risk of bleeding",
      "Hepatotoxicity",
      "Nephrotoxicity"
    ],
    correctAnswer: 1,
    explanation: "The concurrent use of warfarin (anticoagulant) and aspirin (antiplatelet) significantly increases the risk of bleeding complications. Both drugs affect hemostasis through different mechanisms, leading to additive effects.",
    difficulty: 'hard'
  }
];

export default function TestPage() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(mockQuestions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [showResults, setShowResults] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  
  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
  }, [timeLeft, showResults]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleQuestionNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (direction === 'next' && currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === mockQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / mockQuestions.length) * 100);
  };

  const finishTest = () => {
    setShowResults(true);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(mockQuestions.length).fill(null));
    setTimeLeft(30 * 60);
    setShowResults(false);
    setFlaggedQuestions(new Set());
  };

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = selectedAnswers.filter((answer, index) => answer === mockQuestions[index].correctAnswer).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-medical-50">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-8">
              <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                score >= 80 ? 'bg-green-100' : score >= 70 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <CheckCircle className={`h-10 w-10 ${
                  score >= 80 ? 'text-green-600' : score >= 70 ? 'text-yellow-600' : 'text-red-600'
                }`} />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Completed!</h1>
              <p className="text-gray-600">{subject} Assessment</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-primary-600 mb-2">{score}%</div>
                <div className="text-gray-600">Overall Score</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-2">{correctAnswers}/{mockQuestions.length}</div>
                <div className="text-gray-600">Correct Answers</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">{formatTime(30 * 60 - timeLeft)}</div>
                <div className="text-gray-600">Time Taken</div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Question Review</h3>
              <div className="space-y-4">
                {mockQuestions.map((question, index) => {
                  const isCorrect = selectedAnswers[index] === question.correctAnswer;
                  const wasAnswered = selectedAnswers[index] !== null;
                  
                  return (
                    <div key={question.id} className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900 flex-1">
                          {index + 1}. {question.question}
                        </h4>
                        <div className={`ml-4 p-2 rounded-full ${
                          isCorrect ? 'bg-green-100 text-green-600' : 
                          wasAnswered ? 'bg-red-100 text-red-600' : 
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {isCorrect ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border ${
                              optionIndex === question.correctAnswer ? 'bg-green-50 border-green-200 text-green-800' :
                              optionIndex === selectedAnswers[index] && selectedAnswers[index] !== question.correctAnswer ? 'bg-red-50 border-red-200 text-red-800' :
                              'bg-gray-50 border-gray-200 text-gray-700'
                            }`}
                          >
                            {String.fromCharCode(65 + optionIndex)}. {option}
                            {optionIndex === question.correctAnswer && <span className="ml-2 font-medium">(Correct)</span>}
                            {optionIndex === selectedAnswers[index] && selectedAnswers[index] !== question.correctAnswer && <span className="ml-2 font-medium">(Your answer)</span>}
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={restartTest}
                className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Retake Test
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = mockQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-medical-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{subject} Assessment</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span className={`font-mono ${timeLeft < 300 ? 'text-red-600' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-medical-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                {question.question}
              </h2>
            </div>
            
            <button
              onClick={toggleFlag}
              className={`ml-4 p-2 rounded-lg transition-colors ${
                flaggedQuestions.has(currentQuestion) 
                  ? 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200' 
                  : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
              }`}
              title="Flag for review"
            >
              <Flag className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:border-primary-300 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-700 mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleQuestionNavigation('prev')}
              disabled={currentQuestion === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </button>

            <div className="flex items-center space-x-2">
              {mockQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                    index === currentQuestion
                      ? 'bg-primary-600 text-white'
                      : selectedAnswers[index] !== null
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : flaggedQuestions.has(index)
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === mockQuestions.length - 1 ? (
              <button
                onClick={finishTest}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Finish Test
              </button>
            ) : (
              <button
                onClick={() => handleQuestionNavigation('next')}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Next
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}