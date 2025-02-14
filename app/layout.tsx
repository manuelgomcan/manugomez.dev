import "./globals.css"

export const metadata = {
  title: "Manuel Gómez | Data & Software Developer"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'