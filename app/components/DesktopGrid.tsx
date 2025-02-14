import { useState, useEffect } from "react"
import DesktopIcon from "./DesktopIcon"

interface Icon {
  name: string
  icon: string
  url?: string
}

interface DesktopGridProps {
  icons: Icon[]
  onIconClick: (name: string) => void
}

export default function DesktopGrid({ icons, onIconClick }: DesktopGridProps) {
  const [iconPositions, setIconPositions] = useState<{ top: number; left: number }[]>([])

  useEffect(() => {
    const updateIconPositions = () => {
      const iconHeight = 100 // height of the icon + padding
      const leftPadding = 20 // distance from the left edge of the screen

      const newPositions = icons.map((_, index) => ({
        top: index * iconHeight + 20, // 20px top padding for the first icon
        left: leftPadding,
      }))
      setIconPositions(newPositions)
    }

    updateIconPositions()
    window.addEventListener("resize", updateIconPositions)
    return () => window.removeEventListener("resize", updateIconPositions)
  }, [icons])

  return (
    <>
      {icons.map((icon, index) => (
        <DesktopIcon
          key={icon.name}
          name={icon.name}
          icon={icon.icon}
          url={icon.url}
          onClick={() => onIconClick(icon.name)}
          top={iconPositions[index]?.top || 0}
          left={iconPositions[index]?.left || 0}
        />
      ))}
    </>
  )
}

