import React from "react";
import { Player, Enemy } from "@/types/game";
import { PlayerStats } from "./PlayerStats";
import { EnemyStats } from "./EnemyStats";
import { CombatActions } from "./CombatActions";
import { CharacterInfo } from "./CharacterInfo";
import { BattleLog } from "./BattleLog";

interface GameScreenProps {
  player: Player;
  currentEnemy: Enemy | null;
  dungeonLevel: number;
  battleLog: string[];
  onPlayerAttack: () => void;
  onChainLightning: () => void;
  onRestart: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  player,
  currentEnemy,
  dungeonLevel,
  battleLog,
  onPlayerAttack,
  onChainLightning,
  onRestart,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-amber-400 mb-2">
            Подземелье - Уровень {dungeonLevel}
          </h1>
          <div className="flex justify-center space-x-6 text-sm text-slate-300">
            <div>
              👤 {player.name} (ур. {player.level})
            </div>
            <div>💰 {player.gold} золота</div>
            <div>
              ✨ {player.experience}/{player.level * 100} опыта
            </div>
          </div>
        </div>

        {/* Статусы игрока и врага */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PlayerStats player={player} />
          {currentEnemy && <EnemyStats enemy={currentEnemy} />}
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Боевые действия */}
          <div className="lg:col-span-2">
            <CombatActions
              player={player}
              currentEnemy={currentEnemy}
              onPlayerAttack={onPlayerAttack}
              onChainLightning={onChainLightning}
              onRestart={onRestart}
            />
            <div className="mt-4">
              <BattleLog battleLog={battleLog} />
            </div>
          </div>

          {/* Информация о персонаже */}
          <div>
            <CharacterInfo player={player} />
          </div>
        </div>
      </div>
    </div>
  );
};
