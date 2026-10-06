import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playClickSound } from '../utils/audio';

export function AskeClicker({ currentForm, clickAske, pointsPerClick, soundEnabled }) {
  const [isClicking, setIsClicking] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState([]);

  const handleClick = (e) => {
    // Play sound
    playClickSound(soundEnabled);

    // Click effect trigger
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 120);

    // Calculate click coordinates for floating text
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newText = {
      id: Date.now() + Math.random(),
      x,
      y,
      val: Math.floor(clickAske()),
    };

    setFloatingTexts((prev) => [...prev.slice(-15), newText]);

    // Random mini confetti pop on click
    if (Math.random() < 0.2) {
      confetti({
        particleCount: 12,
        spread: 50,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ['#3b82f6', '#f59e0b', '#ec4899', '#10b981'],
      });
    }
  };

  const removeFloatingText = (id) => {
    setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 relative select-none">
      {/* Current Form Title & Badge */}
      <div className="text-center mb-6">
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border bg-slate-800/80 backdrop-blur shadow-lg mb-2 ${currentForm.accentColor}`}>
          {currentForm.title}
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 drop-shadow-md">
          {currentForm.name}
        </h2>
      </div>

      {/* Main Interactive Aske Avatar Area */}
      <div
        onClick={handleClick}
        className="relative group cursor-pointer transition-transform duration-100 ease-out active:scale-95"
      >
        {/* Glow Ring Behind Image */}
        <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse-glow" />

        {/* Avatar Container */}
        <div
          className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-b from-white/30 to-white/5 backdrop-blur-md border-4 border-white/40 shadow-2xl overflow-hidden transition-all duration-100 ${
            isClicking ? 'scale-90 rotate-2' : 'scale-100 hover:scale-105'
          }`}
        >
          <img
            src={currentForm.image}
            alt={currentForm.name}
            className="w-full h-full object-cover rounded-full pointer-events-none transition-all"
          />

          {/* Form Multiplier Badge */}
          <div className="absolute bottom-3 right-3 bg-gradient-to-r from-amber-500 to-pink-500 text-white font-extrabold text-sm md:text-base px-3 py-1 rounded-full shadow-lg border border-white/40 flex items-center gap-1">
            <span>🔥</span>
            <span>{currentForm.multiplier}x Multiplier</span>
          </div>
        </div>

        {/* Floating "+Points" Popups */}
        {floatingTexts.map((item) => (
          <div
            key={item.id}
            onAnimationEnd={() => removeFloatingText(item.id)}
            style={{ left: `${item.x}px`, top: `${item.y}px` }}
            className="absolute pointer-events-none text-2xl md:text-3xl font-black text-yellow-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-float-up z-30 flex items-center gap-1"
          >
            <span>+{item.val}</span>
            <img src="/snus-can.png" alt="snus" className="w-6 h-6 inline-block" />
          </div>
        ))}
      </div>

      {/* Click Instructions */}
      <div className="mt-6 text-center text-slate-300 text-sm font-medium animate-bounce-slow">
        Click Aske to collect packets of snus! (+{pointsPerClick} / click)
      </div>
    </div>
  );
}
