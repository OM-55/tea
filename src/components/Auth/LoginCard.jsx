import React, { useState } from 'react';
import { Eye, EyeOff, Smartphone, Mail, User, Chrome } from 'lucide-react';
import Reveal from '../Reveal';

const LoginCard = ({ onLogin, onSkip }) => {
  const [activeTab, setActiveTab] = useState('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      setIsOtpSent(true);
    }
  };

  return (
    <Reveal className="w-full max-w-md p-8 sm:p-12 bg-white rounded-[40px] shadow-2xl shadow-stone-900/10 border border-stone-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-stone-900 mb-2">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-stone-500">
          {isSignup ? 'Join PushpRas for exclusive blends' : 'Login to your wellness journey'}
        </p>
      </div>

      {!isSignup && (
        <div className="flex p-1 bg-stone-100 rounded-2xl mb-8">
          {[
            { id: 'phone', icon: Smartphone, label: 'Phone' },
            { id: 'username', icon: User, label: 'Username' },
            { id: 'gmail', icon: Mail, label: 'Gmail' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {isSignup ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 ml-1">Full Name</label>
              <input required type="text" placeholder="John Doe" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 ml-1">Phone or Email</label>
              <input required type="text" placeholder="john@example.com" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
            </div>
          </>
        ) : (
          <>
            {activeTab === 'phone' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 ml-1">Phone Number</label>
                  <div className="relative">
                    <input 
                      required 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 00000 00000" 
                      className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" 
                    />
                    {!isOtpSent && (
                      <button 
                        type="button"
                        onClick={handleSendOTP}
                        className="absolute right-2 top-2 bottom-2 px-4 bg-primary/10 text-primary text-xs font-black rounded-xl hover:bg-primary/20 transition-all"
                      >
                        SEND OTP
                      </button>
                    )}
                  </div>
                </div>
                {isOtpSent && (
                  <Reveal className="space-y-2">
                    <label className="text-sm font-bold text-stone-700 ml-1">Enter OTP</label>
                    <input 
                      required 
                      autoFocus
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456" 
                      className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all tracking-[1em] text-center font-mono text-xl" 
                    />
                    <p className="text-[10px] text-stone-400 text-center">Use dummy OTP: 123456</p>
                  </Reveal>
                )}
              </div>
            )}

            {activeTab === 'username' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 ml-1">Username / Email</label>
                  <input required type="text" placeholder="pushp_ras" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                </div>
              </div>
            )}

            {activeTab === 'gmail' && (
              <div className="py-4">
                <button 
                  type="button"
                  onClick={onLogin}
                  className="w-full flex items-center justify-center gap-4 py-4 rounded-2xl bg-white border-2 border-stone-100 hover:border-primary hover:bg-primary/5 transition-all text-stone-700 font-bold"
                >
                  <Chrome className="w-6 h-6 text-[#4285F4]" />
                  Continue with Google
                </button>
              </div>
            )}
          </>
        )}

        {(isSignup || activeTab === 'username') && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 ml-1">Password</label>
            <div className="relative">
              <input 
                required 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••" 
                className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {(!isSignup && activeTab === 'gmail') ? null : (
          <button 
            type="submit"
            className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {isSignup ? 'Create Account' : 'Login'}
          </button>
        )}
      </form>

      <div className="mt-8 text-center space-y-4">
        <p className="text-sm text-stone-500">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={() => setIsSignup(!isSignup)}
            className="text-primary font-bold hover:underline"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>

        <button 
          onClick={onSkip}
          className="mt-8 px-8 py-2.5 rounded-full border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group mx-auto text-[15px]"
        >
          Skip for now 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </Reveal>
  );
};

export default LoginCard;
