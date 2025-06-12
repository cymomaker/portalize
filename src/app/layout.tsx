// app/layout.tsx
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {cn} from '@/lib/utils'
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: '点达 · Portalize',
    description: '企业系统统一入口平台',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh">
        <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
        {children}
        </body>
        </html>
    )
}