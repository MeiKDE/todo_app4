import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Mei's Todo App #6",
  description: "Creating from scratch using Next.js and Tailwind",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1 className="text-4xl text-center"> Todo App</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
