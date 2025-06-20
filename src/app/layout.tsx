// app/layout.tsx
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {cn} from '@/lib/utils'
import React from "react";
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Portalize - 一点直达，全域协同',
    description: 'Portalize 是一个现代化的企业门户系统，提供统一的访问入口和协同工作平台。',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN">
        <body className="font-sans antialiased">
            {children}
            <Toaster />
        </body>
        </html>
    )
}