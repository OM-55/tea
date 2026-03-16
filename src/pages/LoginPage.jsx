import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageGallery from '../components/Auth/ImageGallery';
import LoginCard from '../components/Auth/LoginCard';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = React.useState(false);

  const handleAuthSuccess = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem('userLoggedIn', 'true');
      navigate('/');
    }, 300);
  };

  const handleSkip = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem('loginSkipped', 'true');
      navigate('/');
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-white flex flex-col md:flex-row overflow-hidden transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
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
