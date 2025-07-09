import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Player } from "@/types/game";

interface CharacterInfoProps {
  player: Player;
}

export const CharacterInfo: React.FC<CharacterInfoProps> = ({ player }) => {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Характеристики</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-300">Уровень</span>
            <Badge
              variant="outline"
              className="border-amber-500 text-amber-400"
            >
              {player.level}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Атака</span>
            <span className="text-red-400">{player.attack}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Защита</span>
            <span className="text-blue-400">{player.defense}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Магия</span>
            <span className="text-purple-400">{player.magicPower}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">Класс</span>
            <span className="text-green-400">
              {player.class === "warrior" ? "Воин" : "Маг"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
