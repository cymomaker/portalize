// app/page.tsx
'use client'

import {Button} from '@/components/ui/button'

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">欢迎来到 点达 · Portalize</h1>
            <Button
                variant="default"
                onClick={() => alert('按钮正常工作 ✅')}
            >
                测试按钮
            </Button>
        </main>
    )
}