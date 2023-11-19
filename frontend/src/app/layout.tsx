import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'

import Main from '@/components/Main'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '貸出管理',
  description: '機器の貸し出しを管理するシステム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body>
        <Header />
        <Main>
          {children}

        </Main>
      </body>
    </html>
  )
}
