"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

import { RecoilRoot } from "recoil"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"

interface Props {
  children?: React.ReactNode
}

const queryClient = new QueryClient()

export const NextProvider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export const NextLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
