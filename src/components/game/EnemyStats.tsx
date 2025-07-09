import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Enemy } from "@/types/game";

interface EnemyStatsProps {
  enemy: Enemy;
}

export const EnemyStats: React.FC<EnemyStatsProps> = ({ enemy }) => {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-4">
        <h3 className="text-red-400 font-semibold mb-2">{enemy.name}</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Здоровье</span>
            <span className="text-red-400">
              {enemy.health}/{enemy.maxHealth}
            </span>
          </div>
          <Progress
            value={(enemy.health / enemy.maxHealth) * 100}
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};
