import { useState } from "react";
import { GameState, Player, Enemy, PlayerClass } from "@/types/game";
import { CLASS_BASE_STATS } from "@/constants/gameData";

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [dungeonLevel, setDungeonLevel] = useState(1);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  const createCharacter = (playerClass: PlayerClass) => {
    const baseStats = CLASS_BASE_STATS[playerClass];
    const className = playerClass === "warrior" ? "Воин" : "Маг";

    const newPlayer: Player = {
      name: className,
      class: playerClass,
      level: 1,
      health: baseStats.health,
      maxHealth: baseStats.health,
      mana: baseStats.mana,
      maxMana: baseStats.mana,
      attack: baseStats.attack,
      defense: baseStats.defense,
      magicPower: baseStats.magicPower,
      experience: 0,
      gold: 50,
      equipment: {},
    };

    setPlayer(newPlayer);
    setGameState("game");
  };

  const resetGame = () => {
    setGameState("menu");
    setPlayer(null);
    setCurrentEnemy(null);
    setDungeonLevel(1);
    setBattleLog([]);
  };

  return {
    // State
    gameState,
    player,
    currentEnemy,
    dungeonLevel,
    battleLog,

    // Actions
    setGameState,
    setPlayer,
    setCurrentEnemy,
    setDungeonLevel,
    setBattleLog,
    createCharacter,
    resetGame,
  };
};
