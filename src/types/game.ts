// Типы для RPG игры

export type PlayerClass = "warrior" | "mage";
export type EnemyType = "rat" | "skeleton" | "undead" | "undead_mage";
export type ItemType = "sword" | "staff" | "leather_armor" | "cloth_armor";
export type GameState = "menu" | "character_select" | "game";
export type GameTab = "combat" | "inventory" | "stats";

export interface Player {
  name: string;
  class: PlayerClass;
  level: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
  magicPower: number;
  experience: number;
  gold: number;
  equipment: {
    weapon?: Item;
    armor?: Item;
  };
}

export interface Enemy {
  id: string;
  type: EnemyType;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  experience: number;
  gold: number;
}

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  attack?: number;
  defense?: number;
  magicPower?: number;
  price: number;
}

export interface ClassStats {
  health: number;
  mana: number;
  attack: number;
  defense: number;
  magicPower: number;
}

export interface EnemyTemplate {
  type: EnemyType;
  name: string;
  baseHealth: number;
  baseAttack: number;
}
