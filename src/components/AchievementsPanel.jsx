import React from 'react';
import { ACHIEVEMENTS } from '../useGameState';

export function AchievementsPanel({ unlockedAchievements }) {
  const totalCount = ACHIEVEMENTS.length;
  const unlockedCount = unlockedAchievements.length;

  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/80 shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          <h3 className="text-xl font-bold text-white tracking-wide">Achievements</h3>
        </div>
        <div className="bg-indigo-600/60 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/40">
          {unlockedCount} / {totalCount} Unlocked
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedAchievements.includes(ach.id);

          return (
            <div
              key={ach.id}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-r from-amber-500/20 to-pink-500/20 border-amber-500/50 text-white shadow-md'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className="text-2xl p-2 rounded-lg bg-slate-800 border border-slate-700">
                {isUnlocked ? '🌟' : '🔒'}
              </div>
              <div>
                <h4 className="font-bold text-xs md:text-sm">{ach.name}</h4>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{ach.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
