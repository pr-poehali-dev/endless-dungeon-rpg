import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { PlayerClass } from "@/types/game";
import { CLASS_BASE_STATS } from "@/constants/gameData";

interface CharacterSelectProps {
  onCreateCharacter: (playerClass: PlayerClass) => void;
  onBack: () => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({
  onCreateCharacter,
  onBack,
}) => {
  const getClassStats = (playerClass: PlayerClass) =>
    CLASS_BASE_STATS[playerClass];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-amber-400 mb-2">
            Выберите класс
          </CardTitle>
          <p className="text-slate-300">
            Каждый класс имеет уникальные способности
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="bg-slate-700 border-slate-600 hover:border-red-500 transition-colors cursor-pointer"
              onClick={() => onCreateCharacter("warrior")}
            >
              <CardContent className="p-6 text-center">
                <Icon
                  name="Sword"
                  size={48}
                  className="mx-auto mb-4 text-red-400"
                />
                <h3 className="text-xl font-bold text-white mb-2">Воин</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Мастер ближнего боя с высокой защитой
                </p>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>❤️ Здоровье: {getClassStats("warrior").health}</div>
                  <div>⚡ Мана: {getClassStats("warrior").mana}</div>
                  <div>⚔️ Атака: {getClassStats("warrior").attack}</div>
                  <div>🛡️ Защита: {getClassStats("warrior").defense}</div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-700 border-slate-600 hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => onCreateCharacter("mage")}
            >
              <CardContent className="p-6 text-center">
                <Icon
                  name="Sparkles"
                  size={48}
                  className="mx-auto mb-4 text-blue-400"
                />
                <h3 className="text-xl font-bold text-white mb-2">Маг</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Мастер магии с разрушительными заклинаниями
                </p>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>❤️ Здоровье: {getClassStats("mage").health}</div>
                  <div>⚡ Мана: {getClassStats("mage").mana}</div>
                  <div>⚔️ Атака: {getClassStats("mage").attack}</div>
                  <div>🔮 Магия: {getClassStats("mage").magicPower}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={onBack}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Назад
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
