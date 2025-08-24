import React from 'react';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { Calendar, DollarSign, X, Clock } from 'lucide-react';

export const ActiveSessions: React.FC = () => {
  const { user, activeSessions, cancelSession } = useAppContext();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">Active Sessions</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Track and manage your current work assignments 
            ({activeSessions.filter(session => session.status === 'ongoing').length}/3 active sessions)
          </p>
        </div>

        {activeSessions.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 text-center shadow-lg">
            <div className="text-gray-400 mb-4">
              <Clock className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto" />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 mb-2">No Active Sessions</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-500">Your accepted requests will appear here</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {activeSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 sm:mb-4 space-y-2 md:space-y-0">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                      {session.clientName}
                    </h3>
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(session.status)}`}>
                      {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    </span>
                  </div>
                  {session.status === 'ongoing' && (
                    <Button
                      onClick={() => cancelSession(session.id)}
                      variant="danger"
                      size="small"
                      icon={X}
                      className="text-xs sm:text-sm"
                    >
                      Cancel
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Start Date</p>
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">{formatDate(session.startDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">End Date</p>
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">{formatDate(session.endDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Payment</p>
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">${session.paymentAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};