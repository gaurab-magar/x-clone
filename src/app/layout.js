import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./Components/Sidebar";
import News from "./Components/News";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "x-Clone",
  description: "created by nextjs,tailwindcss,nextauth,firebase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="hidden md:inline border-r h-screen">
            <Sidebar />
          </div>
          <div>
            {children}
          </div>
          <div className="hidden md:flex flex-col border-l h-screen p-2 w-1/4">
            <div className="sticky top-0 py-2">
                <input type="text" placeholder="search.." className="bg-gray-100 text-sm w-full px-4 py-1 rounded-full outline-none" />
            </div>
            <News />
          </div>
        </div>
      </body>
    </html>
  );
}