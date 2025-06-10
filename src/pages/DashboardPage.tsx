import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Target,
  ArrowRight,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  // Year-based subject mapping
  const subjectsByYear = {
    1: [
      { name: 'General Chemistry', code: 'CHEM101', questions: 450, color: 'from-blue-500 to-blue-600' },
      { name: 'Biology', code: 'BIO101', questions: 380, color: 'from-green-500 to-green-600' },
      { name: 'Physics', code: 'PHYS101', questions: 320, color: 'from-purple-500 to-purple-600' },
      { name: 'Mathematics', code: 'MATH101', questions: 280, color: 'from-red-500 to-red-600' },
    ],
    2: [
      { name: 'Organic Chemistry', code: 'CHEM201', questions: 520, color: 'from-blue-500 to-blue-600' },
      { name: 'Anatomy & Physiology', code: 'ANAT201', questions: 480, color: 'from-green-500 to-green-600' },
      { name: 'Biochemistry', code: 'BIOCHEM201', questions: 420, color: 'from-purple-500 to-purple-600' },
      { name: 'Microbiology', code: 'MICRO201', questions: 360, color: 'from-orange-500 to-orange-600' },
    ],
    3: [
      { name: 'Pharmacology', code: 'PHARM301', questions: 650, color: 'from-blue-500 to-blue-600' },
      { name: 'Medicinal Chemistry', code: 'MEDCHEM301', questions: 580, color: 'from-green-500 to-green-600' },
      { name: 'Pharmaceutics', code: 'PHARM302', questions: 520, color: 'from-purple-500 to-purple-600' },
      { name: 'Pathophysiology', code: 'PATH301', questions: 450, color: 'from-red-500 to-red-600' },
    ],
    4: [
      { name: 'Clinical Pharmacology', code: 'CLINPHARM401', questions: 480, color: 'from-blue-500 to-blue-600' },
      { name: 'Pharmacy Practice', code: 'PRACT401', questions: 420, color: 'from-green-500 to-green-600' },
      { name: 'Pharmacokinetics', code: 'PHARKIN401', questions: 380, color: 'from-purple-500 to-purple-600' },
      { name: 'Drug Information', code: 'DRUGINFO401', questions: 320, color: 'from-orange-500 to-orange-600' },
    ],
    5: [
      { name: 'Clinical Therapeutics', code: 'CLINTER501', questions: 520, color: 'from-blue-500 to-blue-600' },
      { name: 'Hospital Pharmacy', code: 'HOSP501', questions: 450, color: 'from-green-500 to-green-600' },
      { name: 'Community Pharmacy', code: 'COMM501', questions: 380, color: 'from-purple-500 to-purple-600' },
      { name: 'Research Methods', code: 'RESEARCH501', questions: 280, color: 'from-red-500 to-red-600' },
    ],
  };

  const currentSubjects = user ? subjectsByYear[user.year as keyof typeof subjectsByYear] || [] : [];

  const stats = [
    { 
      icon: Trophy, 
      label: 'Tests Completed', 
      value: '12', 
      change: '+3 this week',
      color: 'text-yellow-600 bg-yellow-100'
    },
    { 
      icon: Target, 
      label: 'Average Score', 
      value: '78%', 
      change: '+5% improvement',
      color: 'text-green-600 bg-green-100'
    },
    { 
      icon: Clock, 
      label: 'Study Time', 
      value: '24h', 
      change: 'This month',
      color: 'text-blue-600 bg-blue-100'
    },
    { 
      icon: TrendingUp, 
      label: 'Streak', 
      value: '7 days', 
      change: 'Keep it up!',
      color: 'text-purple-600 bg-purple-100'
    },
  ];

  const recentActivity = [
    { subject: 'Pharmacology', score: 85, date: '2 hours ago', type: 'practice' },
    { subject: 'Medicinal Chemistry', score: 92, date: '1 day ago', type: 'test' },
    { subject: 'Pharmaceutics', score: 78, date: '2 days ago', type: 'practice' },
    { subject: 'Pathophysiology', score: 88, date: '3 days ago', type: 'test' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-medical-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Ready to continue your pharmacy studies? Let's pick up where you left off.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
          {/* Subjects Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Year {user?.year} Subjects
                </h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Current Semester
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {currentSubjects.map((subject, index) => (
                  <Link
                    key={subject.code}
                    to={`/test/${subject.code}`}
                    className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center`}>
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {subject.name}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{subject.code}</span>
                      <span>{subject.questions} questions</span>
                    </div>
                    
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${subject.color}`}
                        style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                      ></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all group">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 mr-3" />
                    Random Test
                  </div>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <Link
                  to="/results"
                  className="w-full flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all group"
                >
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-3" />
                    View Progress
                  </div>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.subject}
                      </p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        activity.score >= 80 ? 'bg-green-100 text-green-800' : 
                        activity.score >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {activity.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}