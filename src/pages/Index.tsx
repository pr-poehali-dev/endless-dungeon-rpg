import React from "react";
import { MainMenu } from "@/components/game/MainMenu";
import { CharacterSelect } from "@/components/game/CharacterSelect";
import { GameScreen } from "@/components/game/GameScreen";
import { useGame } from "@/hooks/useGame";

const Index = () => {
  const game = useGame();

  // Отображение экранов в зависимости от состояния игры
  if (game.gameState === "character_select") {
    return (
      <CharacterSelect
        onCreateCharacter={game.handleCharacterCreation}
        onBack={() => game.setGameState("menu")}
      />
    );
  }

  if (game.gameState === "menu") {
    return (
      <MainMenu onStartGame={() => game.setGameState("character_select")} />
    );
  }

  if (game.gameState === "game" && game.player) {
    return (
      <GameScreen
        player={game.player}
        currentEnemy={game.currentEnemy}
        dungeonLevel={game.dungeonLevel}
        battleLog={game.battleLog}
        onPlayerAttack={game.handlePlayerAttack}
        onChainLightning={game.handleChainLightning}
        onRestart={game.handleRestart}
      />
    );
  }

  return null;
};

export default Index;
