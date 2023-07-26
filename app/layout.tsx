import "./globals.css";
import { Inter } from "next/font/google";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar />
        <div className="container">{children}</div>
        <Footer />
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
