import { ClassStats, EnemyTemplate } from "@/types/game";

// Базовые характеристики классов
export const CLASS_BASE_STATS: Record<string, ClassStats> = {
  warrior: {
    health: 100,
    mana: 30,
    attack: 15,
    defense: 10,
    magicPower: 5,
  },
  mage: {
    health: 70,
    mana: 100,
    attack: 8,
    defense: 5,
    magicPower: 15,
  },
};

// Прирост характеристик при повышении уровня
export const CLASS_LEVEL_STATS: Record<string, ClassStats> = {
  warrior: {
    health: 15,
    mana: 5,
    attack: 3,
    defense: 2,
    magicPower: 1,
  },
  mage: {
    health: 10,
    mana: 15,
    attack: 1,
    defense: 1,
    magicPower: 3,
  },
};

// Шаблоны врагов
export const ENEMY_TEMPLATES: EnemyTemplate[] = [
  { type: "rat", name: "Крыса", baseHealth: 25, baseAttack: 8 },
  { type: "skeleton", name: "Скелет", baseHealth: 45, baseAttack: 12 },
  { type: "undead", name: "Нежить", baseHealth: 65, baseAttack: 16 },
  { type: "undead_mage", name: "Нежить-маг", baseHealth: 55, baseAttack: 20 },
];

// Константы игры
export const GAME_CONSTANTS = {
  CHAIN_LIGHTNING_COST: 20,
  EXPERIENCE_PER_LEVEL: 100,
  LEVEL_MULTIPLIER: 0.3,
  BASE_DEFENSE_MULTIPLIER: 2,
};
