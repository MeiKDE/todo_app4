import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mei's Todo App",
  description: "A simple todo application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <main className="min-h-screen">
          <header className="p-4">
            <h1 className="text-3xl font-bold">Mei's Todo App</h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
