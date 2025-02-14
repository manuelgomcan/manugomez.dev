interface StartMenuProps {
  onClose: () => void
}

export default function StartMenu({ onClose }: StartMenuProps) {
  return (
    <div className="absolute bottom-10 left-0 w-48 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg">
      <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white p-2 font-bold">Manuel's Portfolio</div>
      <button className="w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white text-sm">Programs</button>
      <button className="w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white text-sm">Documents</button>
      <button className="w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white text-sm">Settings</button>
      <button className="w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white text-sm">Find</button>
      <button className="w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white text-sm">Help</button>
      <button className="w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white text-sm" onClick={onClose}>
        Shut Down...
      </button>
    </div>
  )
}

