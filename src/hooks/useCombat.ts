import { Player, Enemy } from "@/types/game";
import {
  ENEMY_TEMPLATES,
  GAME_CONSTANTS,
  CLASS_LEVEL_STATS,
} from "@/constants/gameData";

export const useCombat = () => {
  const generateEnemy = (dungeonLevel: number): Enemy => {
    const enemyTemplate =
      ENEMY_TEMPLATES[Math.floor(Math.random() * ENEMY_TEMPLATES.length)];
    const levelMultiplier =
      1 + (dungeonLevel - 1) * GAME_CONSTANTS.LEVEL_MULTIPLIER;

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: enemyTemplate.type,
      name: `${enemyTemplate.name} (ур. ${dungeonLevel})`,
      health: Math.floor(enemyTemplate.baseHealth * levelMultiplier),
      maxHealth: Math.floor(enemyTemplate.baseHealth * levelMultiplier),
      attack: Math.floor(enemyTemplate.baseAttack * levelMultiplier),
      defense: Math.floor(
        GAME_CONSTANTS.BASE_DEFENSE_MULTIPLIER * levelMultiplier,
      ),
      experience: Math.floor(15 * levelMultiplier),
      gold: Math.floor(10 * levelMultiplier),
    };
  };

  const calculateDamage = (
    attacker: { attack: number },
    defender: { defense: number },
    variance = 6,
  ): number => {
    return Math.max(
      1,
      attacker.attack -
        defender.defense +
        Math.floor(Math.random() * variance) -
        Math.floor(variance / 2),
    );
  };

  const calculatePlayerLevelUp = (player: Player, newExp: number) => {
    const expForNextLevel = player.level * GAME_CONSTANTS.EXPERIENCE_PER_LEVEL;

    if (newExp >= expForNextLevel) {
      const statIncrease = CLASS_LEVEL_STATS[player.class];

      return {
        shouldLevelUp: true,
        newLevel: player.level + 1,
        newMaxHealth: player.maxHealth + statIncrease.health,
        newMaxMana: player.maxMana + statIncrease.mana,
        newAttack: player.attack + statIncrease.attack,
        newDefense: player.defense + statIncrease.defense,
        newMagicPower: player.magicPower + statIncrease.magicPower,
        remainingExp:
          newExp % ((player.level + 1) * GAME_CONSTANTS.EXPERIENCE_PER_LEVEL),
      };
    }

    return {
      shouldLevelUp: false,
      remainingExp: newExp,
    };
  };

  const performPlayerAttack = (player: Player, enemy: Enemy) => {
    const damage = calculateDamage(player, enemy);
    const newEnemyHealth = Math.max(0, enemy.health - damage);

    return {
      damage,
      newEnemyHealth,
      isEnemyDefeated: newEnemyHealth <= 0,
    };
  };

  const performEnemyAttack = (
    enemy: Enemy,
    player: Player,
    godMode = false,
  ) => {
    const damage = calculateDamage(enemy, player, 4);
    const newPlayerHealth = godMode
      ? player.health
      : Math.max(0, player.health - damage);

    return {
      damage,
      newPlayerHealth,
      isPlayerDefeated: !godMode && newPlayerHealth <= 0,
    };
  };

  const performChainLightning = (
    player: Player,
    enemy: Enemy,
    godMode = false,
  ) => {
    if (!godMode && player.mana < GAME_CONSTANTS.CHAIN_LIGHTNING_COST) {
      return null;
    }

    const damage = godMode
      ? GAME_CONSTANTS.GOD_MODE_LIGHTNING_DAMAGE
      : Math.floor(player.magicPower * 1.5) + Math.floor(Math.random() * 10);
    const newEnemyHealth = Math.max(0, enemy.health - damage);
    const newMana = godMode
      ? player.mana
      : player.mana - GAME_CONSTANTS.CHAIN_LIGHTNING_COST;

    return {
      damage,
      newEnemyHealth,
      newMana,
      isEnemyDefeated: newEnemyHealth <= 0,
    };
  };

  return {
    generateEnemy,
    calculateDamage,
    calculatePlayerLevelUp,
    performPlayerAttack,
    performEnemyAttack,
    performChainLightning,
  };
};
