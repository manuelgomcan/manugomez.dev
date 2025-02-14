"use client"

import { useState, useEffect } from "react"
import Taskbar from "./components/Taskbar"
import DesktopGrid from "./components/DesktopGrid"
import Window from "./components/Window"
import { AboutMe } from "./components/AboutMe"
import { Projects } from "./components/Projects"

const desktopIcons = [
  { name: "About Me", icon: "/icons/aboutme-icon.png" },
  { name: "Projects", icon: "/icons/projects-icon.png" },
  { name: "CV [02/2025]", icon: "/icons/resume-icon.png" },
  { name: "LinkedIn", icon: "/icons/linkedin-icon.png", url: "https://www.linkedin.com/in/manuelgomcan/" },
  { name: "GitHub", icon: "/icons/github-icon.png", url: "https://github.com/manuelgomcan" },
]

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<Array<{ name: string; icon: string }>>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([])
  const [taskbarRect, setTaskbarRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    const taskbar = document.querySelector(".taskbar")
    if (taskbar) {
      setTaskbarRect(taskbar.getBoundingClientRect())
    }

    const handleResize = () => {
      if (taskbar) {
        setTaskbarRect(taskbar.getBoundingClientRect())
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const openWindow = (name: string) => {
    const icon = desktopIcons.find((icon) => icon.name === name)?.icon || "📄"
    if (!openWindows.some((w) => w.name === name)) {
      setOpenWindows([...openWindows, { name, icon }])
    }
    setActiveWindow(name)
    setMinimizedWindows(minimizedWindows.filter((window) => window !== name))
  }

  const closeWindow = (name: string) => {
    setOpenWindows(openWindows.filter((window) => window.name !== name))
    setMinimizedWindows(minimizedWindows.filter((window) => window !== name))
    if (activeWindow === name) {
      setActiveWindow(null)
    }
  }

  const minimizeWindow = (name: string) => {
    setMinimizedWindows([...minimizedWindows, name])
    if (activeWindow === name) {
      setActiveWindow(null)
    }
  }

  const getWindowContent = (name: string) => {
    switch (name) {
      case "About Me":
        return {
          content: <AboutMe />,
          pdfUrl: undefined,
        }
      case "Projects":
        return {
          content: <Projects />,
          pdfUrl: undefined,
        }
      case "CV [02/2025]":
        return {
          content: null,
          pdfUrl: "files/manuelgomezcandelas.pdf",
        }
      default:
        return {
          content: (
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{name}</h2>
              <p>This is the content for {name}.</p>
            </div>
          ),
          pdfUrl: undefined,
        }
    }
  }

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: "#008080" }}>
      <div className="flex-grow relative">
        <DesktopGrid icons={desktopIcons} onIconClick={openWindow} />

        {openWindows.map((window) => {
          const { content, pdfUrl } = getWindowContent(window.name)
          return (
            <Window
              key={window.name}
              title={window.name}
              icon={window.icon}
              isActive={activeWindow === window.name}
              onClose={() => closeWindow(window.name)}
              onFocus={() => setActiveWindow(window.name)}
              onMinimize={() => minimizeWindow(window.name)}
              isMinimized={minimizedWindows.includes(window.name)}
              pdfUrl={pdfUrl}
            >
              {content}
            </Window>
          )
        })}
      </div>
      <Taskbar
        className="taskbar"
        openWindows={openWindows}
        activeWindow={activeWindow}
        minimizedWindows={minimizedWindows}
        onWindowClick={(window) => {
          if (minimizedWindows.includes(window)) {
            setMinimizedWindows(minimizedWindows.filter((w) => w !== window))
          }
          setActiveWindow(window)
        }}
      />
    </div>
  )
}

