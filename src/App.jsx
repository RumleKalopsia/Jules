import React, { useState } from 'react';
import { useGameState } from './useGameState';
import { AskeClicker } from './components/AskeClicker';
import { UpgradesPanel } from './components/UpgradesPanel';
import { EvolutionsPanel } from './components/EvolutionsPanel';
import { AchievementsPanel } from './components/AchievementsPanel';
import { Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';

export default function App() {
  const {
    points,
    totalPointsEarned,
    pointsPerClick,
    pointsPerSecond,
    currentForm,
    unlockedFormId,
    upgrades,
    unlockedAchievements,
    soundEnabled,
    setSoundEnabled,
    clickAske,
    buyUpgrade,
    selectForm,
    resetGame,
  } = useGameState();

  const [activeTab, setActiveTab] = useState('upgrades'); // 'upgrades' | 'evolutions'

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentForm.bgGradient} text-white transition-colors duration-700 font-sans pb-12`}>
      {/* Top Navigation Bar */}
      <header className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img src="/snus-can.png" alt="logo" className="w-9 h-9 animate-bounce-slow" />
          <h1 className="text-2xl md:text-3xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-200 to-white drop-shadow">
            ASKE CLICKER
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 transition shadow hover:scale-105"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-yellow-400" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Reset Game */}
          <button
            onClick={resetGame}
            className="p-2.5 rounded-xl bg-red-600/80 hover:bg-red-500 border border-red-400 transition shadow hover:scale-105 text-white"
            title="Reset All Progress"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Aske Interactive Avatar & Stats */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Snus Points Scoreboard */}
          <div className="w-full bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center shadow-2xl mb-6 relative overflow-hidden">
            <div className="text-xs uppercase font-extrabold tracking-widest text-amber-400/90 mb-1 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              Total Askepoints
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 drop-shadow-lg">
                {Math.floor(points).toLocaleString()}
              </span>
              <img src="/snus-can.png" alt="snus" className="w-10 h-10 md:w-12 md:h-12 drop-shadow-md animate-bounce-slow" />
            </div>

            {/* Rates Dashboard */}
            <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-white/10">
              <div className="bg-slate-800/60 p-3 rounded-2xl border border-white/5">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Per Second</span>
                <span className="text-lg md:text-xl font-extrabold text-emerald-400">
                  +{pointsPerSecond.toLocaleString()} / sec
                </span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-2xl border border-white/5">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Per Click</span>
                <span className="text-lg md:text-xl font-extrabold text-cyan-400">
                  +{pointsPerClick.toLocaleString()} / click
                </span>
              </div>
            </div>
          </div>

          {/* Clicker Avatar */}
          <AskeClicker
            currentForm={currentForm}
            clickAske={clickAske}
            pointsPerClick={pointsPerClick}
            soundEnabled={soundEnabled}
          />
        </div>

        {/* Right Column: Upgrades & Evolutions Tabs */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Tab Selection */}
          <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-700/80 mb-4 shadow-lg">
            <button
              onClick={() => setActiveTab('upgrades')}
              className={`flex-1 py-2.5 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'upgrades'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⚡ Upgrades</span>
            </button>
            <button
              onClick={() => setActiveTab('evolutions')}
              className={`flex-1 py-2.5 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'evolutions'
                  ? 'bg-gradient-to-r from-amber-500 to-pink-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🧬 Forms ({unlockedFormId}/5)</span>
            </button>
          </div>

          {/* Active Tab Component */}
          {activeTab === 'upgrades' ? (
            <UpgradesPanel
              upgrades={upgrades}
              points={points}
              buyUpgrade={buyUpgrade}
              soundEnabled={soundEnabled}
            />
          ) : (
            <EvolutionsPanel
              currentForm={currentForm}
              unlockedFormId={unlockedFormId}
              selectForm={selectForm}
              totalPointsEarned={totalPointsEarned}
              soundEnabled={soundEnabled}
            />
          )}
        </div>
      </main>

      {/* Achievements Section */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <AchievementsPanel unlockedAchievements={unlockedAchievements} />
      </section>
    </div>
  );
}
