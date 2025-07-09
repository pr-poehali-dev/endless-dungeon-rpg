import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

// Типы для игры
type PlayerClass = "warrior" | "mage";
type EnemyType = "rat" | "skeleton" | "undead" | "undead_mage";
type ItemType = "sword" | "staff" | "leather_armor" | "cloth_armor";

interface Player {
  name: string;
  class: PlayerClass;
  level: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
  magicPower: number;
  experience: number;
  gold: number;
  equipment: {
    weapon?: Item;
    armor?: Item;
  };
}

interface Enemy {
  id: string;
  type: EnemyType;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  experience: number;
  gold: number;
}

interface Item {
  id: string;
  name: string;
  type: ItemType;
  attack?: number;
  defense?: number;
  magicPower?: number;
  price: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<
    "menu" | "character_select" | "game"
  >("menu");
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [dungeonLevel, setDungeonLevel] = useState(1);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"combat" | "inventory" | "stats">(
    "combat",
  );

  // Создание персонажа
  const createCharacter = (playerClass: PlayerClass) => {
    const baseStats =
      playerClass === "warrior"
        ? { health: 100, mana: 30, attack: 15, defense: 10, magicPower: 5 }
        : { health: 70, mana: 100, attack: 8, defense: 5, magicPower: 15 };

    const newPlayer: Player = {
      name: playerClass === "warrior" ? "Воин" : "Маг",
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
    generateEnemy();
  };

  // Генерация врага
  const generateEnemy = () => {
    const enemies: {
      type: EnemyType;
      name: string;
      baseHealth: number;
      baseAttack: number;
    }[] = [
      { type: "rat", name: "Крыса", baseHealth: 25, baseAttack: 8 },
      { type: "skeleton", name: "Скелет", baseHealth: 45, baseAttack: 12 },
      { type: "undead", name: "Нежить", baseHealth: 65, baseAttack: 16 },
      {
        type: "undead_mage",
        name: "Нежить-маг",
        baseHealth: 55,
        baseAttack: 20,
      },
    ];

    const enemyTemplate = enemies[Math.floor(Math.random() * enemies.length)];
    const levelMultiplier = 1 + (dungeonLevel - 1) * 0.3;

    const enemy: Enemy = {
      id: Math.random().toString(36).substr(2, 9),
      type: enemyTemplate.type,
      name: `${enemyTemplate.name} (ур. ${dungeonLevel})`,
      health: Math.floor(enemyTemplate.baseHealth * levelMultiplier),
      maxHealth: Math.floor(enemyTemplate.baseHealth * levelMultiplier),
      attack: Math.floor(enemyTemplate.baseAttack * levelMultiplier),
      defense: Math.floor(2 * levelMultiplier),
      experience: Math.floor(15 * levelMultiplier),
      gold: Math.floor(10 * levelMultiplier),
    };

    setCurrentEnemy(enemy);
    setBattleLog([`Вы встретили ${enemy.name}!`]);
  };

  // Атака игрока
  const playerAttack = () => {
    if (!player || !currentEnemy) return;

    const damage = Math.max(
      1,
      player.attack - currentEnemy.defense + Math.floor(Math.random() * 6) - 2,
    );
    const newEnemyHealth = Math.max(0, currentEnemy.health - damage);

    const newEnemy = { ...currentEnemy, health: newEnemyHealth };
    setCurrentEnemy(newEnemy);
    setBattleLog((prev) => [...prev, `Вы нанесли ${damage} урона!`]);

    if (newEnemyHealth <= 0) {
      // Враг побежден
      const newExp = player.experience + currentEnemy.experience;
      const newGold = player.gold + currentEnemy.gold;

      setBattleLog((prev) => [
        ...prev,
        `${currentEnemy.name} побежден! +${currentEnemy.experience} опыта, +${currentEnemy.gold} золота`,
      ]);

      // Проверка на повышение уровня
      const expForNextLevel = player.level * 100;
      let newLevel = player.level;
      let newMaxHealth = player.maxHealth;
      let newMaxMana = player.maxMana;
      let newAttack = player.attack;
      let newDefense = player.defense;
      let newMagicPower = player.magicPower;

      if (newExp >= expForNextLevel) {
        newLevel++;
        const statIncrease =
          player.class === "warrior"
            ? { health: 15, mana: 5, attack: 3, defense: 2, magicPower: 1 }
            : { health: 10, mana: 15, attack: 1, defense: 1, magicPower: 3 };

        newMaxHealth += statIncrease.health;
        newMaxMana += statIncrease.mana;
        newAttack += statIncrease.attack;
        newDefense += statIncrease.defense;
        newMagicPower += statIncrease.magicPower;

        setBattleLog((prev) => [
          ...prev,
          `Уровень повышен! Теперь ${newLevel} уровень!`,
        ]);
      }

      setPlayer({
        ...player,
        level: newLevel,
        health: Math.min(player.health, newMaxHealth),
        maxHealth: newMaxHealth,
        maxMana: newMaxMana,
        attack: newAttack,
        defense: newDefense,
        magicPower: newMagicPower,
        experience: newExp % (newLevel * 100),
        gold: newGold,
      });

      // Увеличиваем уровень подземелья
      setDungeonLevel((prev) => prev + 1);

      // Генерируем нового врага через секунду
      setTimeout(() => {
        generateEnemy();
      }, 1500);
    } else {
      // Атака врага
      setTimeout(() => {
        enemyAttack();
      }, 1000);
    }
  };

  // Атака врага
  const enemyAttack = () => {
    if (!player || !currentEnemy || currentEnemy.health <= 0) return;

    const damage = Math.max(
      1,
      currentEnemy.attack - player.defense + Math.floor(Math.random() * 4) - 1,
    );
    const newPlayerHealth = Math.max(0, player.health - damage);

    setPlayer({ ...player, health: newPlayerHealth });
    setBattleLog((prev) => [
      ...prev,
      `${currentEnemy.name} нанес вам ${damage} урона!`,
    ]);

    if (newPlayerHealth <= 0) {
      setBattleLog((prev) => [...prev, "Вы погибли! Игра окончена."]);
      // Можно добавить логику перезапуска
    }
  };

  // Цепная молния (способность мага)
  const chainLightning = () => {
    if (!player || !currentEnemy || player.mana < 20) return;

    const damage =
      Math.floor(player.magicPower * 1.5) + Math.floor(Math.random() * 10);
    const newEnemyHealth = Math.max(0, currentEnemy.health - damage);
    const newMana = player.mana - 20;

    setPlayer({ ...player, mana: newMana });
    setCurrentEnemy({ ...currentEnemy, health: newEnemyHealth });
    setBattleLog((prev) => [...prev, `Цепная молния нанесла ${damage} урона!`]);

    if (newEnemyHealth <= 0) {
      // Аналогично обычной атаке
      const newExp = player.experience + currentEnemy.experience;
      const newGold = player.gold + currentEnemy.gold;
      setBattleLog((prev) => [...prev, `${currentEnemy.name} побежден!`]);
      setPlayer((prev) =>
        prev ? { ...prev, experience: newExp, gold: newGold } : null,
      );
      setDungeonLevel((prev) => prev + 1);
      setTimeout(() => generateEnemy(), 1500);
    } else {
      setTimeout(() => enemyAttack(), 1000);
    }
  };

  // Рендер экрана выбора класса
  if (gameState === "character_select") {
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
                onClick={() => createCharacter("warrior")}
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
                    <div>❤️ Здоровье: 100</div>
                    <div>⚡ Мана: 30</div>
                    <div>⚔️ Атака: 15</div>
                    <div>🛡️ Защита: 10</div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="bg-slate-700 border-slate-600 hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => createCharacter("mage")}
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
                    <div>❤️ Здоровье: 70</div>
                    <div>⚡ Мана: 100</div>
                    <div>⚔️ Атака: 8</div>
                    <div>🔮 Магия: 15</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => setGameState("menu")}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Назад
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Рендер главного меню
  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <div className="mb-4">
              <Icon
                name="Castle"
                size={64}
                className="mx-auto text-amber-400"
              />
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
              onClick={() => setGameState("character_select")}
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
  }

  // Рендер игрового экрана
  if (gameState === "game" && player) {
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

          {/* Статусы */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

            {currentEnemy && (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <h3 className="text-red-400 font-semibold mb-2">
                    {currentEnemy.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Здоровье</span>
                      <span className="text-red-400">
                        {currentEnemy.health}/{currentEnemy.maxHealth}
                      </span>
                    </div>
                    <Progress
                      value={
                        (currentEnemy.health / currentEnemy.maxHealth) * 100
                      }
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Основной контент */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Боевые действия */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Боевые действия</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentEnemy &&
                  currentEnemy.health > 0 &&
                  player.health > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          onClick={playerAttack}
                          className="bg-red-600 hover:bg-red-700 text-white"
                          size="lg"
                        >
                          <Icon name="Sword" size={20} className="mr-2" />
                          Атаковать
                        </Button>

                        {player.class === "mage" && (
                          <Button
                            onClick={chainLightning}
                            disabled={player.mana < 20}
                            className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-600"
                            size="lg"
                          >
                            <Icon name="Zap" size={20} className="mr-2" />
                            Молния (20 маны)
                          </Button>
                        )}
                      </div>

                      {/* Логи боя */}
                      <Card className="bg-slate-900 border-slate-600">
                        <CardContent className="p-4 max-h-48 overflow-y-auto">
                          {battleLog.map((log, index) => (
                            <div
                              key={index}
                              className="text-sm text-slate-300 mb-1"
                            >
                              {log}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      {player.health <= 0 ? (
                        <div>
                          <p className="text-red-400 text-xl mb-4">
                            Вы погибли!
                          </p>
                          <Button
                            onClick={() => window.location.reload()}
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
            </div>

            {/* Статистики */}
            <div>
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
                      <span className="text-purple-400">
                        {player.magicPower}
                      </span>
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
