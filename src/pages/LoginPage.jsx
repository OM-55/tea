import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageGallery from '../components/Auth/ImageGallery';
import LoginCard from '../components/Auth/LoginCard';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    localStorage.setItem('userLoggedIn', 'true');
    navigate('/');
  };

  const handleSkip = () => {
    localStorage.setItem('loginSkipped', 'true');
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Left side: Gallery (Hidden on micro screens, stacks on mobile) */}
      <div className="hidden md:block md:w-3/5 lg:w-[65%] border-r border-stone-100">
        <ImageGallery />
      </div>

      {/* Mobile background/gallery preview */}
      <div className="block md:hidden h-48 w-full">
        <ImageGallery />
      </div>

      {/* Right side: Login Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-stone-50 overflow-y-auto">
        <LoginCard onLogin={handleAuthSuccess} onSkip={handleSkip} />
      </div>
    </div>
  );
};

export default LoginPage;
