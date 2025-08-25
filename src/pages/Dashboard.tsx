import React, { useState } from 'react';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { Eye, Check, X, MapPin, Clock, DollarSign } from 'lucide-react';
import { ClientRequest } from '../types';

export const Dashboard: React.FC = () => {
  const { user, clientRequests, activeSessions, updateClientRequest } = useAppContext();
  const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(null);

  const handleAccept = (id: string) => {
    // Check if user profile is complete
    if (user?.status !== 'approved') {
      alert('Please complete your profile to get verified before accepting requests.');
      return;
    }

    // Check active session limit
    const activeSessionCount = activeSessions.filter(session => session.status === 'ongoing').length;
    if (activeSessionCount >= 3) {
      alert('You have reached the maximum limit of 3 active sessions. Please complete or cancel existing sessions before accepting new ones.');
      return;
    }

    updateClientRequest(id, 'accepted');
    setSelectedRequest(null);
  };

  const handleReject = (id: string) => {
    // Check if user profile is complete
    if (user?.status !== 'approved') {
      alert('Please complete your profile to get verified before managing requests.');
      return;
    }

    updateClientRequest(id, 'rejected');
    setSelectedRequest(null);
  };

  const pendingRequests = clientRequests.filter(req => req.status === 'pending');

  return (
    <DashboardLayout>
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">Dashboard</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Manage your client requests and opportunities</p>
        </div>

        {/* Profile Completion Warning */}
        {user?.status === 'pending' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 rounded-r-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-2 sm:ml-3">
                <p className="text-xs sm:text-sm md:text-base text-yellow-700">
                  <strong>Verification Pending:</strong> Please complete your profile to get verified and start accepting client requests.
                  <span className="ml-1 sm:ml-2 font-medium text-yellow-800 block sm:inline mt-1 sm:mt-0">
                    Complete Profile →
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Active Session Limit Warning */}
        {user?.status === 'approved' && activeSessions.filter(session => session.status === 'ongoing').length >= 3 && (
          <div className="bg-red-50 border-l-4 border-red-400 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 rounded-r-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-2 sm:ml-3">
                <p className="text-xs sm:text-sm md:text-base text-red-700">
                  <strong>Session Limit Reached:</strong> You have 3 active sessions (maximum limit). Complete or cancel existing sessions to accept new requests.
                  <a href="/active-sessions" className="ml-1 sm:ml-2 font-medium underline hover:text-red-800 block sm:inline mt-1 sm:mt-0">
                    Manage Sessions →
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-3 sm:gap-4 md:gap-6">
          {pendingRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 text-center shadow-lg">
              <div className="text-gray-400 mb-4">
                <Clock className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 mb-2">No New Requests</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-500">Check back later for new opportunities</p>
            </div>
          ) : (
            pendingRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 sm:mb-4 space-y-2 md:space-y-0">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                      {request.clientName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {request.area}
                      </div>
                      <div>
                        {request.rooms} rooms
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        ${request.paymentOffered}
                      </div>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="text-xs sm:text-sm text-gray-500">
                      Posted {new Date(request.datePosted).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mb-3 sm:mb-4">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {request.tasks.map((task) => (
                      <span
                        key={task}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 md:mb-6 line-clamp-2">
                  {request.requirements}
                </p>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3">
                  <Button
                    onClick={() => setSelectedRequest(request)}
                    variant="secondary"
                    icon={Eye}
                    className="w-full sm:w-auto text-xs sm:text-sm"
                    size="small"
                  >
                    More Info
                  </Button>
                  <Button
                    onClick={() => handleAccept(request.id)}
                    variant="success"
                    icon={Check}
                    className="w-full sm:w-auto text-xs sm:text-sm"
                    size="small"
                    disabled={user?.status !== 'approved' || activeSessions.filter(session => session.status === 'ongoing').length >= 3}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleReject(request.id)}
                    variant="danger"
                    icon={X}
                    className="w-full sm:w-auto text-xs sm:text-sm"
                    size="small"
                    disabled={user?.status !== 'approved'}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Request Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 md:p-6 z-50">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-lg md:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Request Details</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl md:text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-1 sm:mb-2">Client</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">{selectedRequest.clientName}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div>
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-1 sm:mb-2">Location</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">{selectedRequest.area}</p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-1 sm:mb-2">Rooms</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">{selectedRequest.rooms}</p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-1 sm:mb-2">Payment</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">${selectedRequest.paymentOffered}</p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-1 sm:mb-2">Duration</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">{selectedRequest.duration}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-1 sm:mb-2">Services Required</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {selectedRequest.tasks.map((task) => (
                      <span
                        key={task}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-1 sm:mb-2">Requirements</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{selectedRequest.requirements}</p>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3 pt-4 sm:pt-6 border-t">
                  <Button
                    onClick={() => handleAccept(selectedRequest.id)}
                    variant="success"
                    icon={Check}
                    className="flex-1 w-full text-xs sm:text-sm"
                    size="small"
                    disabled={user?.status !== 'approved' || activeSessions.filter(session => session.status === 'ongoing').length >= 3}
                  >
                    Accept Request
                  </Button>
                  <Button
                    onClick={() => handleReject(selectedRequest.id)}
                    variant="danger"
                    icon={X}
                    className="flex-1 w-full text-xs sm:text-sm"
                    size="small"
                    disabled={user?.status !== 'approved'}
                  >
                    Reject Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};