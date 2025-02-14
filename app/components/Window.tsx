"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type React from "react";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
  pdfUrl?: string;
  icon: string;
}

export default function Window({
  title,
  children,
  isActive,
  onClose,
  onFocus,
  onMinimize,
  isMinimized,
  pdfUrl,
  icon,
}: WindowProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: "50%", height: "70%" });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMaximized) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const toggleMaximize = () => {
    setIsAnimating(true);
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setPosition({ x: 0, y: 0 });
      setSize({ width: "100%", height: "calc(100% - 40px)" }); // 40px for taskbar
    } else {
      setPosition({ x: 50, y: 50 });
      setSize({ width: "50%", height: "70%" });
    }
    setTimeout(() => setIsAnimating(false), 300); // Match this with the CSS transition duration
  };

  const handleMinimize = () => {
    setIsAnimating(true);
    onMinimize();
  };

  useEffect(() => {
    if (isMinimized) {
      const timer = setTimeout(() => setIsAnimating(false), 300); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isMinimized]);

  useEffect(() => {
    const handleResize = () => {
      if (isMaximized) {
        setSize({ width: "100%", height: "calc(100% - 40px)" });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMaximized]);

  if (isMinimized && !isAnimating) {
    return null;
  }

  return createPortal(
    <div
      ref={windowRef}
      className={`absolute bg-[#d4d0c8] border-2 border-[#dfdfdf] border-r-[#808080] border-b-[#808080] shadow-md 
        ${isActive ? "border-[#0000ff]" : ""} 
        ${isAnimating ? "transition-all duration-300 ease-in-out" : ""} 
        ${isMinimized ? "scale-0 opacity-0" : ""}
        max-w-full max-h-full`}
      style={{
        left: isMaximized ? 0 : `${position.x}px`,
        top: isMaximized ? 0 : `${position.y}px`,
        width: size.width,
        height: size.height,
        transformOrigin: "bottom left",
        overflow: "hidden",
      }}
      onMouseDown={onFocus}
    >
      <div
        className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white p-1 flex justify-between items-center cursor-move"
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center">
          <img src={icon} alt={title} className="mr-1 w-5 h-5" />
          <div className="truncate font-bold">{title}</div>
        </div>
        <div className="flex">
          <button
            className="w-5 h-5 mr-1 bg-[#d4d0c8] border border-[#808080] border-t-white border-l-white flex items-center justify-center text-black font-bold"
            onClick={handleMinimize}
          >
            _
          </button>
          <button
            className="w-5 h-5 mr-1 bg-[#d4d0c8] border border-[#808080] border-t-white border-l-white flex items-center justify-center text-black font-bold"
            onClick={toggleMaximize}
          >
            □
          </button>
          <button
            className="w-5 h-5 bg-[#d4d0c8] border border-[#808080] border-t-white border-l-white flex items-center justify-center text-black font-bold"
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>
      {pdfUrl && (
        <div className="bg-[#d4d0c8] border-b border-[#808080] p-1 flex items-center flex-wrap">
          <button
            className="px-2 py-1 bg-[#d4d0c8] border border-[#808080] border-t-white border-l-white text-black text-xs hover:bg-[#d4d0c8] mr-2 mb-1"
            onClick={(e) => {
              e.stopPropagation();
              window.open(pdfUrl, "_blank");
            }}
          >
            Download
          </button>
          <button
            className="px-2 py-1 bg-[#d4d0c8] border border-[#808080] border-t-white border-l-white text-black text-xs hover:bg-[#d4d0c8] mb-1"
            onClick={(e) => {
              e.stopPropagation();
              window.open(pdfUrl, "_blank", "noopener,noreferrer");
            }}
          >
            Open in new tab
          </button>
        </div>
      )}
      <div
        className="overflow-auto bg-[#d4d0c8]"
        style={{
          height: pdfUrl ? "calc(100% - 56px)" : "calc(100% - 28px)",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {pdfUrl ? (
          <div className="w-full h-full overflow-hidden">
            <iframe src={`${pdfUrl}#view=FitW`} className="w-full h-full" style={{ border: "none" }} />
          </div>
        ) : (
          children
        )}
      </div>
    </div>,
    document.body
  );
}
