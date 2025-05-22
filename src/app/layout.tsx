import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mei's Todo App",
  description: "Using Next.js, Tailwind and PostgreSQL",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div suppressHydrationWarning>
          <header>Welcome to Mei's Todo App</header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
