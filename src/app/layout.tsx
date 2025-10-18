import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './globals.css'
import React from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'tessmero.github.io',
  description: 'Oliver Tessmer portfolio',
}

export default function RootLayout({
  children, navbar,
}: Readonly<{
  children: React.ReactNode
  navbar: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col`}
        style={{ minHeight: '100vh' }}
      >
        {navbar}
        <main className="flex-1 flex flex-col min-h-0">{children}</main>
      </body>
    </html>
  )
}
