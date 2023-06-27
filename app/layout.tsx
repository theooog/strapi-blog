import "./globals.css";
import { Inter } from "next/font/google";
import NavigationBar from "./components/NavigationBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
