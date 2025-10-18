import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './globals.css'
import React from 'react'
import Script from 'next/script'

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
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased 
          h-full flex flex-col 
        `}
        style={{ minHeight: '100vh' }}
      >
        <Script src="/javascript/lofi-music-manager.js"></Script>
        <Script src="/javascript/songs/avalanche.js"></Script>
        <Script src="/javascript/songs/chess.js"></Script>
        <Script src="/javascript/songs/fight-cub.js"></Script>
        <Script src="/javascript/songs/orbital-launch.js"></Script>
        <Script src="/javascript/songs/sketch-ball.js"></Script>
        <Script src="/javascript/songs/wheely.js"></Script>
        <Script src="/javascript/songs/boating-school.js"></Script>
        <Script src="/javascript/songs/cube-dance.js"></Script>
        <Script src="/javascript/songs/grove-tender.js"></Script>
        <Script src="/javascript/songs/rail-layer.js"></Script>
        <Script src="/javascript/songs/space-quest.js"></Script>
        {navbar}
        <main className="flex-1 flex flex-col min-h-0">{children}</main>
      </body>
    </html>
  )
}
