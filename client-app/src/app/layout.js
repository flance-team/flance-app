import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welcome to Flance",
  description: "A place to be safe finding or giving occupation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="SB-Mid-client-1HFOVdX6JKijzt6W"
          async={true}
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
