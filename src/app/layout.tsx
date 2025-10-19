'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import React from 'react'
import { ThemeProvider } from '@/components/material-tailwind-components'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children, navbar,
}: Readonly<{
  children: React.ReactNode
  navbar: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased 
          h-full flex flex-col 
          bg-red-50 dark:bg-neutral-800
        `}
        style={{ minHeight: '100vh' }}
      >
        <ThemeProvider>
          {navbar}
          <main className="flex-1 flex flex-col min-h-0">{children}</main>
          <footer
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 px-[2px] py-[1px] text-[10px] bg-black text-white"
            style={{ pointerEvents: 'none' }}
          >
            <span>{`© 2023 - ${new Date().getFullYear()} Oliver Tessmer`}</span>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
