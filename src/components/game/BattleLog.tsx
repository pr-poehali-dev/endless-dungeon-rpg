import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface BattleLogProps {
  battleLog: string[];
}

export const BattleLog: React.FC<BattleLogProps> = ({ battleLog }) => {
  return (
    <Card className="bg-slate-900 border-slate-600">
      <CardContent className="p-4 max-h-48 overflow-y-auto">
        <div className="space-y-1">
          {battleLog.map((log, index) => (
            <div key={index} className="text-sm text-slate-300">
              {log}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
