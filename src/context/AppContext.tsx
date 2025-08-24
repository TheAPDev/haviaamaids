import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, ClientRequest, ActiveSession } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  clientRequests: ClientRequest[];
  activeSessions: ActiveSession[];
  updateClientRequest: (id: string, status: 'accepted' | 'rejected') => void;
  cancelSession: (id: string) => void;
  updateProfile: (profileData: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const mockClientRequests: ClientRequest[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    area: 'Downtown',
    rooms: 3,
    tasks: ['Cleaning', 'Laundry', 'Kitchen'],
    requirements: 'Deep cleaning of 3-bedroom apartment, including bathroom sanitization and kitchen deep clean.',
    paymentOffered: 150,
    duration: '4 hours',
    datePosted: '2025-01-09',
    status: 'pending'
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    area: 'Uptown',
    rooms: 2,
    tasks: ['Cleaning', 'Organizing'],
    requirements: 'Regular weekly cleaning service for 2-bedroom condo. Focus on organizing and maintaining cleanliness.',
    paymentOffered: 120,
    duration: '3 hours',
    datePosted: '2025-01-08',
    status: 'pending'
  }
];

const mockActiveSessions: ActiveSession[] = [
  // Start with empty active sessions for demo
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [clientRequests, setClientRequests] = useState<ClientRequest[]>(mockClientRequests);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>(mockActiveSessions);

  const updateClientRequest = (id: string, status: 'accepted' | 'rejected') => {
    setClientRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status } : request
      )
    );

    // If accepted, add to active sessions
    if (status === 'accepted') {
      const acceptedRequest = clientRequests.find(req => req.id === id);
      if (acceptedRequest) {
        const newSession: ActiveSession = {
          id: Date.now().toString(),
          clientName: acceptedRequest.clientName,
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
          paymentAmount: acceptedRequest.paymentOffered,
          status: 'ongoing'
        };
        setActiveSessions(prev => [...prev, newSession]);
      }
    }
  };

  const cancelSession = (id: string) => {
    setActiveSessions(prev => 
      prev.map(session => 
        session.id === id ? { ...session, status: 'cancelled' as const } : session
      )
    );
  };

  const updateProfile = (profileData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      updatedUser.profileComplete = !!(
        updatedUser.name &&
        updatedUser.email &&
        updatedUser.contactNumber &&
        updatedUser.address &&
        updatedUser.yearsOfExperience &&
        updatedUser.skillset
      );
      
      // Update status to approved when profile is complete
      if (updatedUser.profileComplete) {
        updatedUser.status = 'approved';
      }
      
      setUser(updatedUser);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      clientRequests,
      activeSessions,
      updateClientRequest,
      cancelSession,
      updateProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};