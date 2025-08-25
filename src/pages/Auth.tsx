import React, { useState } from 'react';
// @ts-ignore
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [isLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [idProofFile, setIdProofFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let authUser;
    if (!isLogin) {
      // Sign up
      if (!idProofFile) {
        alert('Please upload your ID proof.');
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error || !data.user) {
        alert(error?.message || 'Sign up failed');
        return;
      }
      authUser = data.user;
      // Upload ID proof to Supabase Storage
      setUploading(true);
      const fileExt = idProofFile.name.split('.').pop();
      const filePath = `idproofs/${authUser.id}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('idproofs').upload(filePath, idProofFile, { upsert: true });
      setUploading(false);
      if (uploadError) {
        alert('Failed to upload ID proof: ' + uploadError.message);
        return;
      }
      // Get public URL
      const { data: publicUrlData } = supabase.storage.from('idproofs').getPublicUrl(filePath);
      const idProofUrl = publicUrlData?.publicUrl || '';
      // Upsert maid profile with all required fields (avoid duplicate key error)
      const { error: upsertError } = await supabase
        .from('maids')
        .upsert([
          {
            user_id: authUser.id,
            full_name: formData.name,
            phone: '',
            location: '',
            experience_years: 0,
            skillset: [],
            username: formData.email,
            id_proof_url: idProofUrl
          }
        ], { onConflict: ['user_id'] });
      if (upsertError) {
        alert('Error saving maid: ' + upsertError.message);
        return;
      }
    } else {
      // Login (Supabase Auth only)
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (authError) {
        console.error("Login failed:", authError.message);
      } else {
        console.log("Login success:", authData.user);
      }
      if (authError || !authData.user) {
        alert(authError?.message || 'Login failed');
        return;
      }
      authUser = authData.user;
      // Fetch maid data for the current user
      const { data: maid, error: fetchError } = await supabase
        .from('maids')
        .select('*') // If you want to select specific fields: .select('name, skillset')
        .eq('user_id', authUser.id)
        .maybeSingle();
      if (fetchError) {
        alert('Error fetching maid: ' + fetchError.message);
        return;
      }
      // Determine if profile is complete
      const profileComplete = !!(
        maid?.full_name &&
        maid?.phone &&
        maid?.location &&
        maid?.experience_years &&
        maid?.skillset &&
        maid?.username
      );
      setUser({
        id: authUser.id,
        name: maid?.full_name || maid?.name || formData.name || formData.email,
        email: maid?.username || formData.email,
        contactNumber: maid?.phone || '',
        address: maid?.location || '',
        yearsOfExperience: maid?.experience_years || 0,
        // Convert array to comma-separated string for display
        skillset: Array.isArray(maid?.skillset) ? maid.skillset.join(', ') : (maid?.skillset || ''),
        status: profileComplete ? 'approved' : 'pending',
        profileComplete
      });
      navigate('/dashboard');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdProofFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-yellow-100 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6">
        <Button
          onClick={() => navigate('/')}
          variant="secondary"
          icon={ArrowLeft}
          className="text-xs sm:text-sm"
        >
          Back
        </Button>
      </div>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-3 sm:mx-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 backdrop-blur-lg bg-opacity-95">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Welcome to Haviaa
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">for Domestic Help</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {!isLogin && (
              <>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base"
                    required={!isLogin}
                  />
                </div>
                <div className="relative mt-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Upload ID Proof</label>
                  <div className="w-full flex items-center">
                    <span className="flex-1 text-xs sm:text-sm border border-gray-200 rounded-xl p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {idProofFile ? idProofFile.name : 'No file chosen'}
                    </span>
                    <input
                      id="id-proof-file-input"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      required={!isLogin}
                      title="Upload your ID proof"
                    />
                    <button
                      type="button"
                      className="ml-2 px-3 py-1 bg-blue-500 text-white rounded cursor-pointer text-xs sm:text-sm"
                      onClick={() => document.getElementById('id-proof-file-input')?.click()}
                    >
                      Choose File
                    </button>
                  </div>
                  {uploading && <span className="block mt-1 text-xs text-blue-500">Uploading...</span>}
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base"
                required
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium">
                  Forgot Password?
                </a>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="large"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Removed sign up/sign in toggle as requested */}
        </div>
      </div>
    </div>
  );
};