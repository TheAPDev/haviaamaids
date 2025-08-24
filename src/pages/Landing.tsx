import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowRight } from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-yellow-100 flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 via-transparent to-blue-100/50"></div>
      
      <div className="relative z-10 text-center px-2 sm:px-4 md:px-6 max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 leading-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Haviaa
            </span>
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 md:mb-12 font-light animate-slide-up px-1 sm:px-2">
            The Art of Effortless Living
          </p>
          
          <div className="animate-slide-up-delayed">
            <Button
              onClick={() => navigate('/auth')}
              size="large"
              icon={ArrowRight}
              className="text-sm sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-blue-200/30 rounded-full animate-float hidden sm:block"></div>
      <div className="absolute top-20 sm:top-40 right-8 sm:right-20 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-yellow-200/40 rounded-full animate-float-delayed hidden sm:block"></div>
      <div className="absolute bottom-10 sm:bottom-20 left-8 sm:left-20 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-blue-300/25 rounded-full animate-float hidden sm:block"></div>
      <div className="absolute bottom-20 sm:bottom-40 right-4 sm:right-10 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-yellow-100/50 rounded-full animate-float-delayed hidden sm:block"></div>
    </div>
  );
};