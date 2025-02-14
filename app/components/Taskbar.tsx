"use client";

import { useState, useEffect } from "react";
import StartMenu from "./StartMenu";

interface TaskbarProps {
  openWindows: Array<{ name: string; icon: string }>;
  activeWindow: string | null;
  minimizedWindows: string[];
  onWindowClick: (window: string) => void;
  className?: string;
}

export default function Taskbar({
  openWindows,
  activeWindow,
  minimizedWindows,
  onWindowClick,
  className,
}: TaskbarProps) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      className={`bg-[#c0c0c0] h-10 flex items-center px-1 border-t-2 border-white relative ${className}`}
    >
      <button
        className="px-2 py-1 bg-[#c0c0c0] border-2 border-white hover:bg-[#d4d0c8] active:border-black mr-2 font-bold text-sm flex items-center"
        style={{
          boxShadow:
            "inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff",
        }}
        onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
      >
        <img
          src="/icons/win95-icon.png"
          alt="Start"
          className="w-4 h-4 mr-2"
        />
        Start
      </button>

      <div className="flex-grow flex">
        {openWindows.map((window) => (
          <button
            key={window.name}
            className={`px-2 py-1 bg-[#c0c0c0] border-2 mr-1 text-sm flex items-center ${
              activeWindow === window.name
                ? "border-[#808080] border-t-white border-l-white"
                : minimizedWindows.includes(window.name)
                ? "border-[#dfdfdf] border-t-[#808080] border-l-[#808080]"
                : "border-white border-t-[#dfdfdf] border-l-[#dfdfdf] hover:bg-[#d4d0c8]"
            }`}
            style={{
              boxShadow:
                activeWindow === window.name
                  ? "inset -1px -1px #dfdfdf, inset 1px 1px #0a0a0a, inset -2px -2px #fff, inset 2px 2px grey"
                  : "inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff",
            }}
            onClick={() => onWindowClick(window.name)}
          >
            <img src={window.icon} alt={window.name} className="w-4 h-4 mr-2" />
            {window.name}
          </button>
        ))}
      </div>

      <div
        className="px-2 py-1 bg-[#c0c0c0] border-2 border-[#808080] border-t-white border-l-white text-sm"
        style={{
          boxShadow:
            "inset -1px -1px #fff, inset 1px 1px #dfdfdf, inset -2px -2px #0a0a0a, inset 2px 2px grey",
        }}
      >
        {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>

      {isStartMenuOpen && <StartMenu onClose={() => setIsStartMenuOpen(false)} />}
    </div>
  );
}
