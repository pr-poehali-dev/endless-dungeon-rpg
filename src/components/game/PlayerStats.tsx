import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Player } from "@/types/game";

interface PlayerStatsProps {
  player: Player;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ player }) => {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-4">
        <h3 className="text-green-400 font-semibold mb-2">Игрок</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Здоровье</span>
            <span className="text-red-400">
              {player.health}/{player.maxHealth}
            </span>
          </div>
          <Progress
            value={(player.health / player.maxHealth) * 100}
            className="h-2"
          />

          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Мана</span>
            <span className="text-blue-400">
              {player.mana}/{player.maxMana}
            </span>
          </div>
          <Progress
            value={(player.mana / player.maxMana) * 100}
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};
