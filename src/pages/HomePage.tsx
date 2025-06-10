import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const { user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Question Bank',
      description: 'Thousands of MCQs covering all pharmacy subjects across all academic years'
    },
    {
      icon: Clock,
      title: 'Timed Practice Tests',
      description: 'Simulate real exam conditions with customizable time limits'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Track your progress and identify areas for improvement'
    },
    {
      icon: Award,
      title: 'Subject-wise Testing',
      description: 'Focus on specific subjects based on your current year of study'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Practice Questions' },
    { number: '50+', label: 'Pharmacy Subjects' },
    { number: '500+', label: 'Active Students' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 text-sm font-medium rounded-full mb-6">
              <GraduationCap className="h-4 w-4 mr-2" />
              For Pharmacy Students
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Your{' '}
              <span className="bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent">
                Pharmacy
              </span>{' '}
              Exams
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive MCQ practice platform designed specifically for pharmacy students. 
              Test your knowledge, track your progress, and excel in your academic journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl group"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="#features"
                    className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-primary-300 hover:text-primary-700 transition-all"
                  >
                    Learn More
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PharmaMCQ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to excel in your pharmacy studies, all in one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-medical-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-medical-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Excel in Your Pharmacy Studies?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join hundreds of pharmacy students who are already improving their grades with PharmaMCQ.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-medical-300 mr-3 flex-shrink-0" />
                <span>Year-specific content</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-medical-300 mr-3 flex-shrink-0" />
                <span>Detailed explanations</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-medical-300 mr-3 flex-shrink-0" />
                <span>Progress tracking</span>
              </div>
            </div>
          </div>
          
          {!user && (
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-primary-500 to-medical-500 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">PharmaMCQ</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering pharmacy students with comprehensive MCQ practice and performance analytics.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:admin@pharmacy.edu" className="hover:text-white transition-colors">admin@pharmacy.edu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 PharmaMCQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}