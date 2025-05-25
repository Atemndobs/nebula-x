import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DashboardNavbar } from '../components/dashboard/DashboardNavbar';
import { DashboardDrawer } from '../components/dashboard/DashboardDrawer';

export const DashboardPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useAuth();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex pt-16">
      <DashboardDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar onMenuClick={toggleDrawer} />
        
        {/* Main content area with padding */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.email?.split('@')[0] || 'User'}</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Here's what's happening with your projects today.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { name: 'Total Projects', value: '12', change: '+2.5%', changeType: 'positive' },
                    { name: 'Active Tasks', value: '8', change: '+3.2%', changeType: 'positive' },
                    { name: 'Completed', value: '24', change: '+10.5%', changeType: 'positive' },
                    { name: 'Overdue', value: '2', change: '-1.8%', changeType: 'negative' },
                  ].map((stat) => (
                    <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd className="mt-1 flex items-baseline">
                            <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
                            <span
                              className={`ml-2 flex items-baseline text-sm font-semibold ${
                                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                              }`}
                            >
                              {stat.change}
                            </span>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Activity */}
                  <div className="bg-white shadow rounded-lg lg:col-span-2">
                    <div className="px-4 py-5 sm:p-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex items-start">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-600 font-medium">
                                {user?.email?.charAt(0).toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div className="ml-4">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">You</span> completed task "{['Update homepage', 'Fix navigation', 'Add user profile', 'Optimize images'][i - 1]}"
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {i} {i === 1 ? 'hour' : 'hours'} ago
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          New Project
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Invite Team Member
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          View Reports
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
