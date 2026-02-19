import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Import fonts
import "./globals.css";
import clsx from "clsx";

// Configure Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhanashree Beauty Parlour & Manasi Ladies Shoppy",
  description: "Enhancing Your Natural Beauty. Premium beauty services, bridal makeup, skin treatments, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          playfair.variable,
          "antialiased bg-background text-foreground font-sans min-h-screen flex flex-col"
        )}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
