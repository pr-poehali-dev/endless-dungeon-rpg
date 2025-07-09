import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Player, Enemy } from "@/types/game";
import { GAME_CONSTANTS } from "@/constants/gameData";

interface CombatActionsProps {
  player: Player;
  currentEnemy: Enemy | null;
  isGodMode: boolean;
  onPlayerAttack: () => void;
  onChainLightning: () => void;
  onRestart: () => void;
}

export const CombatActions: React.FC<CombatActionsProps> = ({
  player,
  currentEnemy,
  isGodMode,
  onPlayerAttack,
  onChainLightning,
  onRestart,
}) => {
  const isPlayerAlive = player.health > 0;
  const isEnemyAlive = currentEnemy && currentEnemy.health > 0;
  const canUseMagic =
    isGodMode || player.mana >= GAME_CONSTANTS.CHAIN_LIGHTNING_COST;

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Боевые действия</CardTitle>
      </CardHeader>
      <CardContent>
        {isEnemyAlive && isPlayerAlive ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={onPlayerAttack}
                className="bg-red-600 hover:bg-red-700 text-white"
                size="lg"
              >
                <Icon name="Sword" size={20} className="mr-2" />
                Атаковать
              </Button>

              {player.class === "mage" && (
                <Button
                  onClick={onChainLightning}
                  disabled={!canUseMagic}
                  className={`
                    ${
                      isGodMode
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg"
                        : "bg-blue-600 hover:bg-blue-700"
                    } 
                    text-white disabled:bg-slate-600
                  `}
                  size="lg"
                >
                  <Icon name="Zap" size={20} className="mr-2" />
                  {isGodMode
                    ? "⚡БОЖЕСТВЕННАЯ МОЛНИЯ⚡"
                    : `Молния (${GAME_CONSTANTS.CHAIN_LIGHTNING_COST} маны)`}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            {!isPlayerAlive ? (
              <div>
                <p className="text-red-400 text-xl mb-4">Вы погибли!</p>
                <Button
                  onClick={onRestart}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Начать заново
                </Button>
              </div>
            ) : (
              <div className="text-green-400">
                <p>Подготовка следующего противника...</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
