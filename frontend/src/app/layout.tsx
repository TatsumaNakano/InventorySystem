import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import { M_PLUS_1 } from 'next/font/google'

import Main from '@/components/Main'

const font = M_PLUS_1({ subsets: ['latin'] })

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
    <html lang="ja">
      <body className={font.className}>
        <Header />
        <Main>
          {children}

        </Main>
      </body>
    </html>
  )
}
