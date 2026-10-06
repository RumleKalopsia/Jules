import { describe, it, expect } from 'vitest';
import { calculateUpgradeCost, ASKE_FORMS, INITIAL_UPGRADES, ACHIEVEMENTS } from './useGameState';

describe('Aske Clicker Game Logic', () => {
  it('calculates upgrade costs with exponential scaling', () => {
    const upgrade = { ...INITIAL_UPGRADES[0], count: 0 };
    expect(calculateUpgradeCost(upgrade)).toBe(15);

    upgrade.count = 1;
    // 15 * 1.15^1 = 17.25 -> 17
    expect(calculateUpgradeCost(upgrade)).toBe(17);

    upgrade.count = 5;
    // 15 * 1.15^5 = 30.17 -> 30
    expect(calculateUpgradeCost(upgrade)).toBe(30);
  });

  it('contains 5 progressive Aske forms with increasing multipliers', () => {
    expect(ASKE_FORMS).toHaveLength(5);
    expect(ASKE_FORMS[0].name).toBe('Freshman Aske');
    expect(ASKE_FORMS[0].multiplier).toBe(1);

    expect(ASKE_FORMS[4].name).toBe('Cosmic God Aske');
    expect(ASKE_FORMS[4].multiplier).toBe(50);
    expect(ASKE_FORMS[4].reqPoints).toBe(1000000);
  });

  it('contains achievements with proper structure', () => {
    expect(ACHIEVEMENTS.length).toBeGreaterThan(0);
    const firstAch = ACHIEVEMENTS[0];
    expect(firstAch).toHaveProperty('id');
    expect(firstAch).toHaveProperty('name');
    expect(firstAch).toHaveProperty('desc');
    expect(firstAch).toHaveProperty('reqType');
  });
});
