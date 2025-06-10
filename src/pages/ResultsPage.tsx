import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Clock, 
  BookOpen,
  Trophy,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function ResultsPage() {
  const { user } = useAuth();

  // Mock data - in production, this would come from your backend
  const recentTests = [
    {
      id: 1,
      subject: 'Pharmacology',
      code: 'PHARM301',
      score: 85,
      date: '2024-01-15',
      time: 'Today',
      questions: 25,
      timeSpent: '28m 30s',
      difficulty: 'Medium',
      improvement: +12
    },
    {
      id: 2,
      subject: 'Medicinal Chemistry',
      code: 'MEDCHEM301',
      score: 92,
      date: '2024-01-14',
      time: '1 day ago',
      questions: 30,
      timeSpent: '32m 45s',
      difficulty: 'Hard',
      improvement: +8
    },
    {
      id: 3,
      subject: 'Pharmaceutics',
      code: 'PHARM302',
      score: 78,
      date: '2024-01-13',
      time: '2 days ago',
      questions: 20,
      timeSpent: '22m 15s',
      difficulty: 'Medium',
      improvement: -3
    },
    {
      id: 4,
      subject: 'Pathophysiology',
      code: 'PATH301',
      score: 88,
      date: '2024-01-12',
      time: '3 days ago',
      questions: 25,
      timeSpent: '26m 00s',
      difficulty: 'Hard',
      improvement: +15
    },
  ];

  const subjectStats = [
    { subject: 'Pharmacology', tests: 12, avgScore: 82, bestScore: 95, trend: 'up' },
    { subject: 'Medicinal Chemistry', tests: 8, avgScore: 87, bestScore: 96, trend: 'up' },
    { subject: 'Pharmaceutics', tests: 10, avgScore: 75, bestScore: 89, trend: 'down' },
    { subject: 'Pathophysiology', tests: 6, avgScore: 79, bestScore: 91, trend: 'up' },
  ];

  const overallStats = [
    { 
      icon: Trophy, 
      label: 'Total Tests', 
      value: '36', 
      change: '+4 this week',
      color: 'text-yellow-600 bg-yellow-100'
    },
    { 
      icon: Target, 
      label: 'Average Score', 
      value: '81%', 
      change: '+3% this month',
      color: 'text-green-600 bg-green-100'
    },
    { 
      icon: Clock, 
      label: 'Total Study Time', 
      value: '18h 45m', 
      change: 'This month',
      color: 'text-blue-600 bg-blue-100'
    },
    { 
      icon: TrendingUp, 
      label: 'Improvement', 
      value: '+12%', 
      change: 'Compared to last month',
      color: 'text-purple-600 bg-purple-100'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-medical-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Performance Analytics
          </h1>
          <p className="text-gray-600">
            Track your progress and identify areas for improvement
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overallStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Tests */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Tests</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Last 7 days
                </div>
              </div>

              <div className="space-y-4">
                {recentTests.map((test, index) => (
                  <div
                    key={test.id}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{test.subject}</h3>
                        <p className="text-sm text-gray-500">{test.code} • {test.time}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          test.score >= 90 ? 'bg-green-100 text-green-800' :
                          test.score >= 80 ? 'bg-blue-100 text-blue-800' :
                          test.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {test.score}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {test.questions} questions
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {test.timeSpent}
                      </div>
                      <div className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        {test.difficulty}
                      </div>
                      <div className={`flex items-center ${
                        test.improvement > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {test.improvement > 0 ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(test.improvement)}% vs last
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Performance */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
              <div className="space-y-4">
                {subjectStats.map((subject, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{subject.subject}</h4>
                      <div className={`flex items-center text-sm ${
                        subject.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {subject.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-2">
                      {subject.tests} tests • Best: {subject.bestScore}%
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              subject.avgScore >= 90 ? 'bg-green-500' :
                              subject.avgScore >= 80 ? 'bg-blue-500' :
                              subject.avgScore >= 70 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${subject.avgScore}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {subject.avgScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Take New Test
                </Link>
                
                <button className="w-full flex items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}