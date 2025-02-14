import type React from "react";
import { useState } from "react";

interface DesktopIconProps {
  name: string;
  icon: string; 
  onClick: () => void;
  top: number;
  left: number;
  url?: string;
}

export default function DesktopIcon({ name, icon, onClick, top, left, url }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSelected(true);
  };

  const handleDoubleClick = () => {
    if (url) {
      window.open(url, "_blank");
    } else {
      onClick();
    }
  };

  const handleBlur = () => {
    setIsSelected(false);
  };

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group"
      style={{ top: `${top}px`, left: `${left}px`, width: '64px' }} 
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <img
        src={icon}
        alt={name}
        className={`w-12 h-12 mb-1 ${isSelected ? "bg-blue-600" : "group-hover:bg-blue-600"}`}
      />
      <div
        className={`text-white text-xs text-center break-words px-2 ${isSelected ? "bg-blue-600" : "group-hover:bg-blue-600"}`}
        style={{ backgroundColor: isSelected ? undefined : "#018281" }}
      >
        {name}
      </div>
    </div>
  );
}
