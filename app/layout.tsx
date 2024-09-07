import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NextLayout, NextProvider } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "comma로 여행하기",
  description: "comma로 여행을 계획해보세요",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  )
}
