import type { Metadata } from "next";
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from "react-hot-toast";
import BackgroundWatermark from "@/components/background-watermark";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Playfair_Display, PT_Sans } from 'next/font/google';
import { cn } from "@/lib/utils";

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '700'],
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  variable: '--font-pt-sans',
  weight: ['400', '700'],
});


export const metadata: Metadata = {
  title: "Kulamitra",
  description: "Community connection app for Arya Vyshya community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", playfairDisplay.variable, ptSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundWatermark />
          {children}
          <ShadToaster />
          <HotToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
