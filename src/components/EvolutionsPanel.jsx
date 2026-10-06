import React from 'react';
import { ASKE_FORMS } from '../useGameState';
import { playUnlockSound } from '../utils/audio';

export function EvolutionsPanel({ currentForm, unlockedFormId, selectForm, totalPointsEarned, soundEnabled }) {
  const handleSelectForm = (form) => {
    if (form.id <= unlockedFormId) {
      playUnlockSound(soundEnabled);
      selectForm(form.id);
    }
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/80 shadow-xl flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-700/60 pb-3">
        <span className="text-2xl">🧬</span>
        <div>
          <h3 className="text-xl font-bold text-white tracking-wide">Aske Evolutions</h3>
          <p className="text-xs text-slate-400">Unlock higher forms by collecting Askepoints!</p>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1 custom-scrollbar">
        {ASKE_FORMS.map((form) => {
          const isUnlocked = form.id <= unlockedFormId;
          const isSelected = form.id === currentForm.id;
          const progressPercent = Math.min(100, Math.floor((totalPointsEarned / (form.reqPoints || 1)) * 100));

          return (
            <div
              key={form.id}
              onClick={() => handleSelectForm(form)}
              className={`p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-900/50 border-yellow-400 ring-2 ring-yellow-400/50 shadow-lg scale-[1.02] cursor-default'
                  : isUnlocked
                  ? 'bg-slate-700/50 hover:bg-slate-700 border-slate-600 hover:border-slate-400 cursor-pointer'
                  : 'bg-slate-900/60 border-slate-800/80 opacity-70 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Form Image */}
                <div className="relative">
                  <img
                    src={form.image}
                    alt={form.name}
                    className={`w-14 h-14 rounded-full object-cover border-2 ${
                      isUnlocked ? 'border-amber-400 shadow' : 'border-slate-600 grayscale opacity-50'
                    }`}
                  />
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full text-lg">
                      🔒
                    </div>
                  )}
                </div>

                {/* Form Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-bold text-sm md:text-base ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {form.name}
                    </h4>
                    <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                      {form.multiplier}x Multiplier
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 italic mt-0.5">{form.title}</p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{form.description}</p>

                  {/* Locked Progress Bar */}
                  {!isUnlocked && (
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] text-slate-400 font-semibold mb-0.5">
                        <span>Requires {form.reqPoints.toLocaleString()} pts</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-pink-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow">
                  ACTIVE
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
