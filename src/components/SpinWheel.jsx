import React, { useState, useEffect, useRef } from 'react';
import { X, Gift } from 'lucide-react';

const SpinWheel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState(null);
  const [isUsed, setIsUsed] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState("");
  
  const segments = [
    "20% OFF",
    "UP TO 50% OFF",
    "BUY 1 GET 1 FREE",
    "FREE SAMPLE",
    "BETTER LUCK NEXT TIME"
  ];

  const colors = [
    "#476A1D", // primary
    "#50801D", // secondary
    "#793747", // accent (ish)
    "#348681", // muted
    "#474115", // dark
  ];

  useEffect(() => {
    const savedReward = localStorage.getItem("spinReward");
    const spinUsed = localStorage.getItem("spinUsed") === "true";
    const hasSeenPopup = localStorage.getItem("hasSeenSpinPopup") === "true";

    if (savedReward) setReward(savedReward);
    if (spinUsed) setIsUsed(true);

    // Auto-popup on first visit (only if they haven't spun yet and haven't seen it this session/visit)
    if (!spinUsed && !hasSeenPopup) {
      setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("hasSeenSpinPopup", "true");
      }, 2000);
    }
  }, []);

  const handleSpin = () => {
    if (isUsed || isSpinning) return;

    setIsSpinning(true);
    setMessage("");

    // Randomize result
    const randomIndex = Math.floor(Math.random() * segments.length);
    const segmentAngle = 360 / segments.length;
    
    // Calculate rotation: 5-8 full spins + segment offset
    // We want the winner to be at the top (270 degrees in SVG coordinate if 0 is right)
    // Actually, simple way: target angle = (total segments - index) * segmentAngle
    const extraSpins = (5 + Math.floor(Math.random() * 5)) * 360;
    const finalRotation = rotation + extraSpins + ((segments.length - randomIndex) * segmentAngle);
    
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setIsUsed(true);
      
      let finalReward = segments[randomIndex];
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
    }, 4000); // Match CSS transition duration
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
        className="fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-2 font-bold animate-pulse"
      >
        <Gift className="w-6 h-6" />
        <span className="hidden sm:inline">Spin & Win 🎁</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative bg-background border-2 border-primary/20 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              disabled={isSpinning}
              className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-primary transition-colors disabled:opacity-30"
            >
              <X className="w-6 h-6" />
            </button>

            <div className={`flex flex-col items-center transition-all duration-500 ${isUsed && !isSpinning ? 'opacity-80' : 'opacity-100'}`}>
              <h2 className="text-3xl font-display font-bold text-primary mb-2 text-center">
                Luck of the Blend
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                {isUsed 
                  ? "You've already used your daily spin!" 
                  : "Spin for a chance to win exclusive discounts and freebies!"}
              </p>

              {/* Wheel Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8">
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
                  <div className="w-4 h-8 bg-accent clip-path-triangle rotate-180" 
                       style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                </div>
                
                {/* The Wheel */}
                <div 
                  className={`w-full h-full rounded-full border-4 border-primary/20 shadow-xl overflow-hidden transition-all duration-[4s] cubic-bezier(0.15, 0, 0.15, 1) ${isUsed && !isSpinning ? 'grayscale opacity-60' : ''}`}
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {segments.map((name, i) => {
                      const angle = 360 / segments.length;
                      const startAngle = i * angle;
                      const endAngle = (i + 1) * angle;
                      
                      // Calculate path for wedge
                      const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
                      const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
                      const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
                      const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);
                      
                      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
                      
                      return (
                        <g key={i}>
                          <path d={pathData} fill={colors[i]} />
                          <text
                            x="75"
                            y="50"
                            fill="white"
                            fontSize="4"
                            fontWeight="bold"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                            className="pointer-events-none uppercase tracking-tighter"
                            style={{ fontSize: name.length > 10 ? '3px' : '4px' }}
                          >
                            {name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Center Cap */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-background border-4 border-primary rounded-full z-10 shadow-inner flex items-center justify-center font-bold text-primary">
                    GO
                  </div>
                </div>
              </div>

              {/* Result Area */}
              <div className="h-16 flex flex-col items-center justify-center mb-6">
                {message && (
                  <div className="bg-primary/10 text-primary px-6 py-2 rounded-full font-bold animate-bounce">
                    {message}
                  </div>
                )}
                {isUsed && !isSpinning && !message && reward && (
                  <div className="text-secondary font-bold">
                    Stored Reward: {reward}
                  </div>
                )}
              </div>

              {/* Spin Button */}
              <button
                onClick={handleSpin}
                disabled={isSpinning || isUsed}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                  isSpinning || isUsed
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90 hover:-translate-y-1 active:scale-95'
                }`}
              >
                {isSpinning ? "SPINNING..." : isUsed ? "SPIN USED" : "SPIN NOW"}
              </button>
              
              {isUsed && (
                <p className="mt-4 text-xs text-muted-foreground">
                  The reward will be automatically applied at checkout.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpinWheel;
