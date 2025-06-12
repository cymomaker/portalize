// app/layout.tsx
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {cn} from '@/lib/utils'
import React from "react";
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Portalize - 点达',
    description: '一点直达，全域协同。',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN">
        <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
        {children}
        <Toaster position="bottom-right" richColors />
        </body>
        </html>
    )
}