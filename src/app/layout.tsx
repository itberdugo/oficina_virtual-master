'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
const inter = Inter({ subsets: ["latin"] });
import { SessionProvider} from "next-auth/react"



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <NextUIProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </NextUIProvider>
        </body>
    </html>
  );
}
