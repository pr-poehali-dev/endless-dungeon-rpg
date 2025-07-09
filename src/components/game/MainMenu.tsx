import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface MainMenuProps {
  onStartGame: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="mb-4">
            <Icon name="Castle" size={64} className="mx-auto text-amber-400" />
          </div>
          <CardTitle className="text-4xl font-bold text-amber-400 mb-2">
            Бесконечное Подземелье
          </CardTitle>
          <p className="text-slate-300">
            Текстовая RPG с эпическими сражениями
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={onStartGame}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
            size="lg"
          >
            <Icon name="Play" size={20} className="mr-2" />
            Начать игру
          </Button>

          <div className="text-center text-sm text-slate-400 space-y-2">
            <div>🏰 Бесконечные подземелья</div>
            <div>⚔️ Эпические сражения</div>
            <div>📈 Система прокачки</div>
            <div>⚡ Цепная молния</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
