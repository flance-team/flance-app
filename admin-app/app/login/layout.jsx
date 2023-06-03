

export const metadata = {
  title: 'Flance',
  description: 'Find your ideal part time job',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <div className="app">
          {children}
        </div>
      </body>
    </html>
  )
}
