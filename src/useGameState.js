import { useState, useEffect, useRef, useCallback } from 'react';

export const INITIAL_UPGRADES = [
  {
    id: 'pouch_finger',
    name: 'Pouch Pinching Finger',
    desc: 'Increases click power by +1 Askepoint',
    baseCost: 15,
    costMultiplier: 1.15,
    type: 'click',
    power: 1,
    count: 0,
    icon: '👆',
  },
  {
    id: 'extra_strong',
    name: 'Extra Strong Mint Pouch',
    desc: 'Generates +1 Askepoint / sec automatically',
    baseCost: 50,
    costMultiplier: 1.15,
    type: 'cps',
    power: 1,
    count: 0,
    icon: '🍬',
  },
  {
    id: 'snus_cannon',
    name: 'Snus Cannon',
    desc: 'Fires fresh snus pouches into the air! +8 Askepoints / sec',
    baseCost: 250,
    costMultiplier: 1.18,
    type: 'cps',
    power: 8,
    count: 0,
    icon: '🚀',
  },
  {
    id: 'aske_fanclub',
    name: 'Aske Fan Club',
    desc: 'Devoted followers double clicking for you! +30 Askepoints / sec',
    baseCost: 1200,
    costMultiplier: 1.20,
    type: 'cps',
    power: 30,
    count: 0,
    icon: '🙌',
  },
  {
    id: 'snus_factory',
    name: 'Automated Snus Factory',
    desc: 'Mass-produces premium white fox and Siberia cans! +120 Askepoints / sec',
    baseCost: 8000,
    costMultiplier: 1.22,
    type: 'cps',
    power: 120,
    count: 0,
    icon: '🏭',
  },
  {
    id: 'quantum_snus',
    name: 'Quantum Snus Synthesizer',
    desc: 'Synthesizes infinite nicotine in parallel dimensions! +500 Askepoints / sec',
    baseCost: 50000,
    costMultiplier: 1.25,
    type: 'cps',
    power: 500,
    count: 0,
    icon: '⚛️',
  },
];

export const ASKE_FORMS = [
  {
    id: 1,
    name: 'Freshman Aske',
    title: 'The Innocent Turtle-neck',
    image: '/aske-form1.png',
    reqPoints: 0,
    multiplier: 1,
    bgGradient: 'from-blue-600 via-indigo-700 to-purple-900',
    accentColor: 'border-blue-400 text-blue-300',
    description: 'Fresh faced and ready to receive his first pack of snus.',
  },
  {
    id: 2,
    name: 'Snus Enjoyer Aske',
    title: 'Master of the Upper Lip',
    image: '/aske-form2.png',
    reqPoints: 100,
    multiplier: 2,
    bgGradient: 'from-amber-600 via-orange-700 to-red-900',
    accentColor: 'border-amber-400 text-amber-300',
    description: 'Always carrying at least 3 extra cans in his turtleneck.',
  },
  {
    id: 3,
    name: 'Cyber Aske',
    title: 'Neo-Nicotine Hacker',
    image: '/aske-form3.png',
    reqPoints: 2500,
    multiplier: 5,
    bgGradient: 'from-emerald-600 via-teal-700 to-cyan-900',
    accentColor: 'border-teal-400 text-teal-300',
    description: 'Hacking the matrix using pure mint energy waves.',
  },
  {
    id: 4,
    name: 'Golden Aske',
    title: 'Gilded Snus Baron',
    image: '/aske-form4.png',
    reqPoints: 50000,
    multiplier: 15,
    bgGradient: 'from-yellow-500 via-amber-600 to-amber-900',
    accentColor: 'border-yellow-300 text-yellow-200',
    description: 'Everything he touches turns into 24-karat gold snus pouches.',
  },
  {
    id: 5,
    name: 'Cosmic God Aske',
    title: 'Ruler of the Snus-iverse',
    image: '/aske-form5.png',
    reqPoints: 1000000,
    multiplier: 50,
    bgGradient: 'from-purple-600 via-pink-600 to-rose-900',
    accentColor: 'border-pink-400 text-pink-300',
    description: 'Transcended physical existence into pure celestial snus energy.',
  },
];

export const ACHIEVEMENTS = [
  { id: 'first_click', name: 'First Snus Pinch', desc: 'Click Aske for the first time', reqType: 'totalPoints', reqValue: 1 },
  { id: 'hundred_snus', name: 'Snus Collector', desc: 'Accumulate 100 total Askepoints', reqType: 'totalPoints', reqValue: 100 },
  { id: 'thousand_snus', name: 'Nicotine Lord', desc: 'Accumulate 1,000 total Askepoints', reqType: 'totalPoints', reqValue: 1000 },
  { id: 'million_snus', name: 'Snus Millionaire', desc: 'Accumulate 1,000,000 total Askepoints', reqType: 'totalPoints', reqValue: 1000000 },
  { id: 'first_upgrade', name: 'Industrialist', desc: 'Buy your first upgrade', reqType: 'upgradesCount', reqValue: 1 },
  { id: 'god_aske', name: 'Cosmic Transcendence', desc: 'Unlock Cosmic God Aske', reqType: 'unlockedForm', reqValue: 5 },
];

export function calculateUpgradeCost(upgrade) {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.count));
}

export function useGameState() {
  const STORAGE_KEY = 'aske_clicker_save_v1';

  const [points, setPoints] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.points ?? 0;
      }
    } catch (e) {
      console.error(e);
    }
    return 0;
  });

  const [totalPointsEarned, setTotalPointsEarned] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.totalPointsEarned ?? 0;
      }
    } catch (e) {
      console.error(e);
    }
    return 0;
  });

  const [unlockedFormId, setUnlockedFormId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.unlockedFormId ?? 1;
      }
    } catch (e) {
      console.error(e);
    }
    return 1;
  });

  const [currentFormId, setCurrentFormId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.currentFormId ?? 1;
      }
    } catch (e) {
      console.error(e);
    }
    return 1;
  });

  const [upgrades, setUpgrades] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && parsed_upgrades(saved)) {
        return parsed_upgrades(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_UPGRADES;
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.unlockedAchievements ?? [];
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [soundEnabled, setSoundEnabled] = useState(true);

  function parsed_upgrades(savedRaw) {
    const parsed = JSON.parse(savedRaw);
    if (!parsed.upgrades) return null;
    return INITIAL_UPGRADES.map(initU => {
      const savedU = parsed.upgrades.find(u => u.id === initU.id);
      return savedU ? { ...initU, count: savedU.count } : initU;
    });
  }

  // Save game state
  useEffect(() => {
    const data = {
      points,
      totalPointsEarned,
      unlockedFormId,
      currentFormId,
      upgrades: upgrades.map(u => ({ id: u.id, count: u.count })),
      unlockedAchievements,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }, [points, totalPointsEarned, unlockedFormId, currentFormId, upgrades, unlockedAchievements]);

  // Active form multiplier
  const currentForm = ASKE_FORMS.find(f => f.id === currentFormId) || ASKE_FORMS[0];
  const formMultiplier = currentForm.multiplier;

  // Calculate Points Per Click (PPC)
  const baseClickPower = 1;
  const clickUpgradesBonus = upgrades
    .filter(u => u.type === 'click')
    .reduce((sum, u) => sum + u.count * u.power, 0);
  const pointsPerClick = (baseClickPower + clickUpgradesBonus) * formMultiplier;

  // Calculate Points Per Second (PPS / CPS)
  const rawCps = upgrades
    .filter(u => u.type === 'cps')
    .reduce((sum, u) => sum + u.count * u.power, 0);
  const pointsPerSecond = rawCps * formMultiplier;

  // Game loop tick (every 100ms for smoothness)
  useEffect(() => {
    const interval = setInterval(() => {
      if (pointsPerSecond > 0) {
        const added = pointsPerSecond / 10;
        setPoints(p => p + added);
        setTotalPointsEarned(t => t + added);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [pointsPerSecond]);

  // Check achievements & forms unlock whenever stats change
  useEffect(() => {
    // Check form unlock requirement
    ASKE_FORMS.forEach(form => {
      if (totalPointsEarned >= form.reqPoints && unlockedFormId < form.id) {
        setUnlockedFormId(prev => Math.max(prev, form.id));
      }
    });

    // Check achievements
    const totalUpgradesCount = upgrades.reduce((sum, u) => sum + u.count, 0);
    ACHIEVEMENTS.forEach(ach => {
      if (!unlockedAchievements.includes(ach.id)) {
        if (ach.reqType === 'totalPoints' && totalPointsEarned >= ach.reqValue) {
          setUnlockedAchievements(prev => [...prev, ach.id]);
        } else if (ach.reqType === 'upgradesCount' && totalUpgradesCount >= ach.reqValue) {
          setUnlockedAchievements(prev => [...prev, ach.id]);
        } else if (ach.reqType === 'unlockedForm' && unlockedFormId >= ach.reqValue) {
          setUnlockedAchievements(prev => [...prev, ach.id]);
        }
      }
    });
  }, [totalPointsEarned, upgrades, unlockedFormId, unlockedAchievements]);

  const clickAske = useCallback(() => {
    setPoints(p => p + pointsPerClick);
    setTotalPointsEarned(t => t + pointsPerClick);
    return pointsPerClick;
  }, [pointsPerClick]);

  const buyUpgrade = useCallback((upgradeId) => {
    setUpgrades(prevUpgrades => {
      const upgrade = prevUpgrades.find(u => u.id === upgradeId);
      if (!upgrade) return prevUpgrades;
      const cost = calculateUpgradeCost(upgrade);

      if (points >= cost) {
        setPoints(p => p - cost);
        return prevUpgrades.map(u =>
          u.id === upgradeId ? { ...u, count: u.count + 1 } : u
        );
      }
      return prevUpgrades;
    });
  }, [points]);

  const selectForm = useCallback((formId) => {
    if (formId <= unlockedFormId) {
      setCurrentFormId(formId);
    }
  }, [unlockedFormId]);

  const resetGame = useCallback(() => {
    if (window.confirm('Are you sure you want to reset your Aske Clicker progress?')) {
      setPoints(0);
      setTotalPointsEarned(0);
      setUnlockedFormId(1);
      setCurrentFormId(1);
      setUpgrades(INITIAL_UPGRADES);
      setUnlockedAchievements([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
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
  };
}
