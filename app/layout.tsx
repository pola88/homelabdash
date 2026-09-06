import type { Metadata } from "next";
import { Caprasimo, Figtree } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppHeader } from "@/components/AppHeader";
import "./globals.css";
import { getAreas } from "@/lib/dashboard-config";
import { HAConnectionProvider } from "@/components/HAConnectionProvider";

const caprasimo = Caprasimo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caprasimo",
});
const figtree = Figtree({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Casa",
  description: "Dashboard de casa y servidores",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const areas = getAreas();

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={caprasimo.variable + " " + figtree.variable}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("casa-theme");var d=document.documentElement.classList;t==="light"?d.remove("dark"):d.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen pb-[72px]">
        <HAConnectionProvider>
          <ThemeProvider>
            <AppHeader areas={areas} />
            <main className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-7">
              {children}
            </main>
          </ThemeProvider>
        </HAConnectionProvider>
      </body>
    </html>
  );
}
