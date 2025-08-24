import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { Save, Upload, User, Mail, Phone, MapPin, Briefcase, Award } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    yearsOfExperience: 0,
    skillset: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        contactNumber: user.contactNumber || '',
        address: user.address || '',
        yearsOfExperience: user.yearsOfExperience || 0,
        skillset: user.skillset || ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'yearsOfExperience' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    alert('Profile completed successfully! You are now a verified member and can start accepting client requests.');
  };

  const isFormValid = formData.name && formData.email && formData.contactNumber && 
                      formData.address && formData.yearsOfExperience > 0 && formData.skillset;

  return (
    <DashboardLayout>
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">Profile Settings</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Complete your profile to start receiving requests</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-xs sm:text-sm md:text-base"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-xs sm:text-sm md:text-base"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Contact Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-xs sm:text-sm md:text-base"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Years of Experience *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-xs sm:text-sm md:text-base"
                    placeholder="Years of experience"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 sm:top-4 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none text-xs sm:text-sm md:text-base"
                  placeholder="Enter your full address"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Skillset / Services Offered *
              </label>
              <div className="relative">
                <Award className="absolute left-3 top-3 sm:top-4 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <textarea
                  name="skillset"
                  value={formData.skillset}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none text-xs sm:text-sm md:text-base"
                  placeholder="Describe your skills and services (e.g., house cleaning, laundry, cooking, organizing)"
                  required
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 md:p-8 text-center">
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1 sm:mb-2">Upload ID Proof</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-4">
                Upload a clear photo of your government-issued ID
              </p>
              <Button variant="secondary" size="small">
                Choose File
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
              <Button
                type="submit"
                icon={Save}
                disabled={!isFormValid}
                className="flex-1 w-full"
              >
                Save Profile
              </Button>
            </div>

            {!isFormValid && (
              <p className="text-xs sm:text-sm text-red-600">
                All fields marked with * are required to complete your profile
              </p>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};