import React from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-yellow-100">
      <Sidebar />
      <div className="flex-1 overflow-auto w-full md:w-auto">
        {children}
      </div>
    </div>
  );
};