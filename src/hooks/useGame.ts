import { useEffect } from "react";
import { useGameState } from "./useGameState";
import { useCombat } from "./useCombat";

export const useGame = () => {
  const gameState = useGameState();
  const combat = useCombat();

  // Генерация первого врага при старте игры
  useEffect(() => {
    if (
      gameState.gameState === "game" &&
      gameState.player &&
      !gameState.currentEnemy
    ) {
      generateNewEnemy();
    }
  }, [gameState.gameState, gameState.player]);

  const generateNewEnemy = () => {
    const enemy = combat.generateEnemy(gameState.dungeonLevel);
    gameState.setCurrentEnemy(enemy);
    gameState.setBattleLog((prev) => [...prev, `Вы встретили ${enemy.name}!`]);
  };

  const handlePlayerAttack = () => {
    if (!gameState.player || !gameState.currentEnemy) return;

    const attackResult = combat.performPlayerAttack(
      gameState.player,
      gameState.currentEnemy,
    );

    // Обновляем здоровье врага
    gameState.setCurrentEnemy({
      ...gameState.currentEnemy,
      health: attackResult.newEnemyHealth,
    });

    gameState.setBattleLog((prev) => [
      ...prev,
      `Вы нанесли ${attackResult.damage} урона!`,
    ]);

    if (attackResult.isEnemyDefeated) {
      handleEnemyDefeated();
    } else {
      // Атака врага через секунду
      setTimeout(handleEnemyAttack, 1000);
    }
  };

  const handleChainLightning = () => {
    if (!gameState.player || !gameState.currentEnemy) return;

    const lightningResult = combat.performChainLightning(
      gameState.player,
      gameState.currentEnemy,
      gameState.gameSettings.godMode,
    );

    if (!lightningResult) return;

    // Обновляем ману игрока и здоровье врага
    gameState.setPlayer({
      ...gameState.player,
      mana: lightningResult.newMana,
    });

    gameState.setCurrentEnemy({
      ...gameState.currentEnemy,
      health: lightningResult.newEnemyHealth,
    });

    const damageText = gameState.gameSettings.godMode
      ? `БОЖЕСТВЕННАЯ молния испепелила врага! ${lightningResult.damage} урона! ⚡🔥`
      : `Цепная молния нанесла ${lightningResult.damage} урона!`;

    gameState.setBattleLog((prev) => [...prev, damageText]);

    if (lightningResult.isEnemyDefeated) {
      handleEnemyDefeated();
    } else {
      setTimeout(handleEnemyAttack, 1000);
    }
  };

  const handleEnemyDefeated = () => {
    if (!gameState.player || !gameState.currentEnemy) return;

    const newExp =
      gameState.player.experience + gameState.currentEnemy.experience;
    const newGold = gameState.player.gold + gameState.currentEnemy.gold;

    gameState.setBattleLog((prev) => [
      ...prev,
      `${gameState.currentEnemy!.name} побежден! +${gameState.currentEnemy!.experience} опыта, +${gameState.currentEnemy!.gold} золота`,
    ]);

    // Проверка на повышение уровня
    const levelUpResult = combat.calculatePlayerLevelUp(
      gameState.player,
      newExp,
    );

    if (levelUpResult.shouldLevelUp) {
      gameState.setPlayer({
        ...gameState.player,
        level: levelUpResult.newLevel!,
        health: Math.min(gameState.player.health, levelUpResult.newMaxHealth!),
        maxHealth: levelUpResult.newMaxHealth!,
        maxMana: levelUpResult.newMaxMana!,
        attack: levelUpResult.newAttack!,
        defense: levelUpResult.newDefense!,
        magicPower: levelUpResult.newMagicPower!,
        experience: levelUpResult.remainingExp,
        gold: newGold,
      });

      gameState.setBattleLog((prev) => [
        ...prev,
        `Уровень повышен! Теперь ${levelUpResult.newLevel} уровень!`,
      ]);
    } else {
      gameState.setPlayer({
        ...gameState.player,
        experience: levelUpResult.remainingExp,
        gold: newGold,
      });
    }

    // Увеличиваем уровень подземелья
    gameState.setDungeonLevel((prev) => prev + 1);

    // Генерируем нового врага через 1.5 секунды
    setTimeout(generateNewEnemy, 1500);
  };

  const handleEnemyAttack = () => {
    if (
      !gameState.player ||
      !gameState.currentEnemy ||
      gameState.currentEnemy.health <= 0
    )
      return;

    const attackResult = combat.performEnemyAttack(
      gameState.currentEnemy,
      gameState.player,
      gameState.gameSettings.godMode,
    );

    gameState.setPlayer({
      ...gameState.player,
      health: attackResult.newPlayerHealth,
    });

    const damageText = gameState.gameSettings.godMode
      ? `${gameState.currentEnemy!.name} пытался нанести ${attackResult.damage} урона, но вы НЕУЯЗВИМЫ! 🛡️✨`
      : `${gameState.currentEnemy!.name} нанес вам ${attackResult.damage} урона!`;

    gameState.setBattleLog((prev) => [...prev, damageText]);

    if (attackResult.isPlayerDefeated) {
      gameState.setBattleLog((prev) => [...prev, "Вы погибли! Игра окончена."]);
    }
  };

  const handleCharacterCreation = (playerClass: "warrior" | "mage") => {
    gameState.createCharacter(playerClass);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return {
    ...gameState,
    handlePlayerAttack,
    handleChainLightning,
    handleCharacterCreation,
    handleRestart,
  };
};
