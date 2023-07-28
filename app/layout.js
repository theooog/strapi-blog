import "./globals.css";
import { Inter } from "next/font/google";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col min-h-screen"}>
        <AuthProvider>
          <NavigationBar />
          <div className="flex-grow container">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

export const metadata = {
  generator: "Next.js",
  title: { template: "%s | Strapi Blog", default: "Strapi Blog" },
  applicationName: "Strapi Blog",
  referrer: "origin-when-cross-origin",
  keywords: ["Strapi", "Blog", "Technology"],
  authors: [{ name: "Theo" }],
  creator: "Theo G.",
  publisher: "Theo G.",
};
