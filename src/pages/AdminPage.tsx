import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { 
  Users, 
  UserPlus, 
  UserX, 
  Calendar, 
  BookOpen, 
  Settings,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  year: number;
  hasAccess: boolean;
  accessExpiry?: Date;
  testsCompleted: number;
  averageScore: number;
  lastActive: string;
  registrationDate: string;
}

// Mock student data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ahmed Mohammed',
    email: 'ahmed.student@pharmacy.edu',
    year: 3,
    hasAccess: true,
    accessExpiry: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    testsCompleted: 12,
    averageScore: 85,
    lastActive: '2 hours ago',
    registrationDate: '2024-01-01'
  },
  {
    id: '2',
    name: 'Fatima Hassan',
    email: 'fatima.student@pharmacy.edu',
    year: 2,
    hasAccess: false,
    testsCompleted: 0,
    averageScore: 0,
    lastActive: 'Never',
    registrationDate: '2024-01-15'
  },
  {
    id: '3',
    name: 'Omar Ali',
    email: 'omar.student@pharmacy.edu',
    year: 4,
    hasAccess: true,
    accessExpiry: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    testsCompleted: 28,
    averageScore: 92,
    lastActive: '1 day ago',
    registrationDate: '2023-12-20'
  },
  {
    id: '4',
    name: 'Zahra Mahmoud',
    email: 'zahra.student@pharmacy.edu',
    year: 1,
    hasAccess: true,
    accessExpiry: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    testsCompleted: 8,
    averageScore: 78,
    lastActive: '3 hours ago',
    registrationDate: '2024-01-10'
  },
  {
    id: '5',
    name: 'Hassan Ibrahim',
    email: 'hassan.student@pharmacy.edu',
    year: 5,
    hasAccess: false,
    testsCompleted: 2,
    averageScore: 65,
    lastActive: '1 week ago',
    registrationDate: '2024-01-05'
  },
];

export default function AdminPage() {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState<number | 'all'>('all');
  const [filterAccess, setFilterAccess] = useState<'all' | 'active' | 'expired'>('all');

  const stats = [
    { 
      icon: Users, 
      label: 'Total Students', 
      value: students.length.toString(), 
      change: '+3 this week',
      color: 'text-blue-600 bg-blue-100'
    },
    { 
      icon: CheckCircle, 
      label: 'Active Access', 
      value: students.filter(s => s.hasAccess).length.toString(), 
      change: '80% of total',
      color: 'text-green-600 bg-green-100'
    },
    { 
      icon: XCircle, 
      label: 'No Access', 
      value: students.filter(s => !s.hasAccess).length.toString(), 
      change: 'Awaiting payment',
      color: 'text-red-600 bg-red-100'
    },
    { 
      icon: BookOpen, 
      label: 'Tests This Month', 
      value: '156', 
      change: '+23% vs last month',
      color: 'text-purple-600 bg-purple-100'
    },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === 'all' || student.year === filterYear;
    const matchesAccess = filterAccess === 'all' || 
                         (filterAccess === 'active' && student.hasAccess) ||
                         (filterAccess === 'expired' && !student.hasAccess);
    
    return matchesSearch && matchesYear && matchesAccess;
  });

  const toggleAccess = (studentId: string) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { 
            ...student, 
            hasAccess: !student.hasAccess,
            accessExpiry: !student.hasAccess 
              ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
              : undefined
          }
        : student
    ));
  };

  const extendAccess = (studentId: string, days: number) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { 
            ...student, 
            hasAccess: true,
            accessExpiry: new Date(Date.now() + days * 24 * 60 * 60 * 1000)
          }
        : student
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-medical-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage student access and monitor platform usage
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

        {/* Students Management */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Years</option>
                  <option value={1}>Year 1</option>
                  <option value={2}>Year 2</option>
                  <option value={3}>Year 3</option>
                  <option value={4}>Year 4</option>
                  <option value={5}>Year 5</option>
                </select>
                
                <select
                  value={filterAccess}
                  onChange={(e) => setFilterAccess(e.target.value as 'all' | 'active' | 'expired')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Access</option>
                  <option value="active">Active Access</option>
                  <option value="expired">No Access</option>
                </select>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Access Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        Year {student.year}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.hasAccess 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.hasAccess ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              No Access
                            </>
                          )}
                        </span>
                        {student.hasAccess && student.accessExpiry && (
                          <div className="text-xs text-gray-500 mt-1">
                            Expires: {student.accessExpiry.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>{student.testsCompleted} tests</div>
                        <div className="text-gray-500">Avg: {student.averageScore}%</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleAccess(student.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            student.hasAccess
                              ? 'bg-red-100 text-red-800 hover:bg-red-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {student.hasAccess ? 'Revoke' : 'Grant'}
                        </button>
                        
                        {student.hasAccess && (
                          <div className="relative group">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                              <div className="py-1">
                                <button
                                  onClick={() => extendAccess(student.id, 30)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Extend 30 days
                                </button>
                                <button
                                  onClick={() => extendAccess(student.id, 60)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Extend 60 days
                                </button>
                                <button
                                  onClick={() => extendAccess(student.id, 90)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Extend 90 days
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No students found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}