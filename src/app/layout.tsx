import { AdminProvider } from "@/context/AdminContext";
import "./globals.css";

// Add this import for the fonts
import { Montserrat, Open_Sans } from "next/font/google";

// Initialize the fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
