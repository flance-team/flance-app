"use client";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <div className="flex">
          {/* Navbar */}
          {pathname !== "/login" ? <Navbar /> : <></>}

          {/* Main Content */}
          <div className="flex-1 h-screen overflow-y-scroll">{children}</div>
        </div>
      </body>
    </html>
  );
}
