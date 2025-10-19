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
        `}
        style={{ minHeight: '100vh' }}
      >
        <ThemeProvider>
          {navbar}
          <main className="flex-1 flex flex-col min-h-0">
            <section className="xl:px-30 lg:px-20 md:px-10 py-10 h-full">
              {children}
            </section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
