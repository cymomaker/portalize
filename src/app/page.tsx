'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
    const router = useRouter()
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password }),
        })

        if (res.ok) {
            toast.success('登录成功', {
                description: '正在跳转到仪表盘...',
            })
            router.push('/dashboard')
        } else {
            const data = await res.json()
            toast.error(data.message || '登录失败，请稍后重试')
        }
        
        setLoading(false)
    }

    return (
        <div
            className="relative flex min-h-screen flex-col bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598312783990-92697964ec08')" }}
        >
            {/* 遮罩层 */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Logo */}
            <div className="absolute top-8 left-8 z-10">
                <Logo />
            </div>

            {/* 登录表单容器 */}
            <div className="flex flex-1 items-center justify-end p-8">
                <div className="relative z-10 w-full max-w-md mr-16">
                    <Card className="bg-background/80 backdrop-blur-sm">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold">点达</CardTitle>
                            <CardDescription className="pt-2">一点直达，全域协同。</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleLogin()
                                }}
                            >
                                <div className="space-y-4">
                                    <Input
                                        type="text"
                                        placeholder="用户名或邮箱"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        required
                                    />
                                    <Input
                                        type="password"
                                        placeholder="密码"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? '登录中...' : '登录'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* 作者信息 */}
            <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <p className="text-xs text-white/50">
                    Made with vision & code by DW · © 2025
                </p>
            </footer>
        </div>
    )
}