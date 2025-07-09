import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface GodModeToggleProps {
  isGodMode: boolean;
  onToggle: () => void;
}

export const GodModeToggle: React.FC<GodModeToggleProps> = ({
  isGodMode,
  onToggle,
}) => {
  return (
    <Button
      onClick={onToggle}
      variant={isGodMode ? "default" : "outline"}
      className={`
        transition-all duration-300 
        ${
          isGodMode
            ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg"
            : "border-slate-600 text-slate-300 hover:bg-slate-700"
        }
      `}
      size="sm"
    >
      <Icon
        name={isGodMode ? "Crown" : "Shield"}
        size={16}
        className={`mr-2 ${isGodMode ? "text-yellow-200" : "text-slate-400"}`}
      />
      {isGodMode ? "БОГ" : "Режим бога"}
    </Button>
  );
};
