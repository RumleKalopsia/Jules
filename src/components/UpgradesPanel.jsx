import React from 'react';
import { calculateUpgradeCost } from '../useGameState';
import { playBuySound } from '../utils/audio';

export function UpgradesPanel({ upgrades, points, buyUpgrade, soundEnabled }) {
  const handleBuy = (upgrade) => {
    const cost = calculateUpgradeCost(upgrade);
    if (points >= cost) {
      playBuySound(soundEnabled);
      buyUpgrade(upgrade.id);
    }
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/80 shadow-xl flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-700/60 pb-3">
        <span className="text-2xl">⚡</span>
        <h3 className="text-xl font-bold text-white tracking-wide">Snus Upgrades</h3>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1 custom-scrollbar">
        {upgrades.map((upgrade) => {
          const cost = calculateUpgradeCost(upgrade);
          const canAfford = points >= cost;

          return (
            <div
              key={upgrade.id}
              onClick={() => handleBuy(upgrade)}
              className={`p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                canAfford
                  ? 'bg-slate-700/60 hover:bg-slate-700 border-indigo-500/40 hover:border-indigo-400 cursor-pointer shadow-md hover:scale-[1.02]'
                  : 'bg-slate-900/40 border-slate-800 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Upgrade Icon & Details */}
              <div className="flex items-center gap-3">
                <div className="text-3xl bg-slate-800 p-2.5 rounded-lg border border-slate-700 shadow-inner">
                  {upgrade.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm md:text-base">{upgrade.name}</h4>
                    <span className="bg-indigo-600/80 text-indigo-100 text-xs px-2 py-0.5 rounded-full font-bold">
                      x{upgrade.count}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{upgrade.desc}</p>
                </div>
              </div>

              {/* Price Tag */}
              <div className="text-right flex-shrink-0">
                <div className={`flex items-center justify-end gap-1 font-bold text-sm md:text-base ${canAfford ? 'text-amber-400' : 'text-slate-500'}`}>
                  <span>{cost.toLocaleString()}</span>
                  <img src="/snus-can.png" alt="snus" className="w-4 h-4 inline-block" />
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  {upgrade.type === 'click' ? `+${upgrade.power} / click` : `+${upgrade.power} / sec`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
