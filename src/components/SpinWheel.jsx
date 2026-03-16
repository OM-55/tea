import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';

const segments = [
  "20% OFF",
  "UP TO 50% OFF",
  "BUY 1 GET 1 FREE",
  "FREE SAMPLE",
  "BETTER LUCK NEXT TIME"
];

const colors = [
  { start: "#FF1B6B", end: "#FF4593" }, // Pink gradient
  { start: "#45CAFF", end: "#1971FF" }, // Blue gradient
  { start: "#FDC830", end: "#FB743E" }, // Orange/Yellow gradient
  { start: "#00FF87", end: "#60EFFF" }, // Mint/Aqua gradient
  { start: "#7117EA", end: "#EA07FE" }, // Purple gradient
];

const SpinWheel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState(null);
  const [isUsed, setIsUsed] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const savedReward = localStorage.getItem("spinReward");
    const spinUsed = localStorage.getItem("spinUsed") === "true";
    const hasSeenPopup = localStorage.getItem("hasSeenSpinPopup") === "true";

    if (savedReward) setReward(savedReward);
    if (spinUsed) setIsUsed(true);

    if (!spinUsed && !hasSeenPopup) {
      setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("hasSeenSpinPopup", "true");
      }, 2000);
    }
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setMessage("");

    const segmentAngle = 360 / segments.length;
    
    // Pick a random internal index for the logic
    const randomIndex = Math.floor(Math.random() * segments.length);
    
    // Calculate rotation: 10-15 full spins + center landing
    const centerOffset = segmentAngle / 2;
    const randomFudge = (Math.random() - 0.5) * (segmentAngle * 0.4);
    const extraSpins = (10 + Math.floor(Math.random() * 5)) * 360;
    
    // The target angle needs to bring the desired segment to the top (fixed pointer)
    const targetAngle = ((segments.length - randomIndex) * segmentAngle) + centerOffset + randomFudge;
    const finalRotation = rotation + extraSpins + targetAngle;
    
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setIsUsed(true);
      
      // Calculate reward based on final rotation to guarantee match
      const normalizedRotation = finalRotation % 360;
      const index = Math.floor((360 - normalizedRotation) / segmentAngle) % segments.length;
      
      let finalReward = segments[index];
      if (finalReward === "UP TO 50% OFF") {
        const randomDiscount = Math.floor(Math.random() * 50) + 1;
        finalReward = `${randomDiscount}% OFF`;
      }

      setReward(finalReward);
      localStorage.setItem("spinReward", finalReward);
      localStorage.setItem("spinUsed", "true");
      
      if (finalReward === "BETTER LUCK NEXT TIME") {
        setMessage("Aww, better luck next time!");
      } else {
        setMessage(`Congratulations! You won: ${finalReward}`);
      }
    }, 4100); // Slightly longer than CSS transition
  };

  const closeModal = () => {
    if (isSpinning) return;
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-6 z-40 bg-primary text-white px-4 py-3 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-2 font-bold animate-pulse text-sm"
      >
        <Gift className="w-5 h-5" />
        <span className="hidden sm:inline">Spin & Win 🎁</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-300">
          <div className="relative flex flex-col items-center max-w-lg w-full">
            
            <button
              onClick={closeModal}
              disabled={isSpinning}
              className="absolute -top-16 -right-4 w-16 h-16 flex items-center justify-center text-white/80 hover:text-white transition-colors disabled:opacity-30 z-50 bg-white/10 hover:bg-white/20 rounded-full"
            >
              <X className="w-10 h-10" />
            </button>

            <div className={`relative flex flex-col items-center transition-all duration-500 ${isUsed && !isSpinning ? 'opacity-90' : 'opacity-100'}`}>
              
              <div 
                className={`relative w-72 h-72 sm:w-96 sm:h-96 mb-12 cursor-pointer active:scale-95 transition-transform ${isSpinning ? 'cursor-not-allowed' : ''}`}
                onClick={handleSpin}
              >
                {/* Pointer - Top centered (Fixed) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-30">
                  <div className="w-6 h-10 bg-white shadow-lg rotate-180" 
                       style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                </div>
                
                <div 
                  className="w-full h-full rounded-full p-2 bg-slate-900/40 backdrop-blur-sm border-2 border-slate-900 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative"
                >
                  <div 
                    className="w-full h-full rounded-full transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1) relative overflow-hidden ring-1 ring-slate-900"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <defs>
                        {colors.map((color, i) => (
                          <linearGradient id={`grad-${i}`} key={i} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: color.start, stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: color.end, stopOpacity: 1 }} />
                          </linearGradient>
                        ))}
                      </defs>
                      {segments.map((name, i) => {
                        const angle = 360 / segments.length;
                        const startAngle = i * angle;
                        const endAngle = (i + 1) * angle;
                        
                        const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
                        const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);
                        
                        const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
                        
                        let firstLine, secondLine;
                        if (name === "BUY 1 GET 1 FREE") {
                          firstLine = "BUY 1 GET 1"; secondLine = "FREE";
                        } else if (name === "BETTER LUCK NEXT TIME") {
                          firstLine = "BETTER LUCK"; secondLine = "NEXT TIME";
                        } else if (name === "UP TO 50% OFF") {
                          firstLine = "UP TO"; secondLine = "50% OFF";
                        } else if (name === "FREE SAMPLE") {
                          firstLine = "FREE"; secondLine = "SAMPLE";
                        } else {
                          firstLine = name; secondLine = "";
                        }
                        
                        return (
                          <g key={i}>
                            <path d={pathData} fill={`url(#grad-${i})`} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
                            <line x1="50" y1="50" x2={x1} y2={y1} stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
                            <text
                              x="78" y="50" fill="white" fontSize="4.8" fontWeight="900" textAnchor="middle" alignmentBaseline="middle"
                              transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                              className="pointer-events-none uppercase tracking-tighter drop-shadow-md italic"
                              style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.3)', strokeWidth: '0.3px', fontFamily: '"Cormorant Garamond", serif' }}
                            >
                              {secondLine ? (
                                <><tspan x="78" dy="-2.2">{firstLine}</tspan><tspan x="78" dy="5.8">{secondLine}</tspan></>
                              ) : (
                                <tspan x="78">{firstLine}</tspan>
                              )}
                            </text>
                          </g>
                        );
                      })}
                      <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
                    </svg>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div 
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900 rounded-full border-2 border-slate-700 shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform group"
                    >
                      <span className="font-black text-white text-xl sm:text-2xl group-hover:text-accent transition-colors">GO</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                {message && (
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-3 rounded-2xl font-black text-xl shadow-2xl animate-bounce">
                    {message}
                  </div>
                )}
                
                {isUsed && !isSpinning && !message && reward && (
                  <div className="bg-white/5 border border-white/10 text-white/90 px-6 py-2 rounded-xl font-bold">
                    You won: {reward}
                  </div>
                )}

                {isUsed && !isSpinning && (
                  <div className="flex flex-col items-center">
                    <p className="text-white/60 text-sm font-medium mb-4">
                      The current reward will be automatically applied at checkout.
                    </p>
                    <p className="text-primary font-bold text-sm underline cursor-pointer hover:text-primary/80 transition-colors" onClick={handleSpin}>
                      Want to try again for a better reward?
                    </p>
                  </div>
                )}
                
                {!isUsed && !isSpinning && (
                  <p className="text-white/80 font-bold text-lg animate-pulse">
                    Click the wheel to spin!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpinWheel;
