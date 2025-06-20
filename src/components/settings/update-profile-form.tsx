'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

interface UserProfile {
    id: number;
    username: string;
    email: string;
}

interface UpdateProfileFormProps {
    user: UserProfile;
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
    const { toast } = useToast()
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        if (password && password !== confirmPassword) {
            toast({
                variant: 'destructive',
                title: '错误',
                description: '两次输入的密码不一致。',
            })
            setIsSubmitting(false)
            return
        }

        try {
            // 浏览器会自动发送 HttpOnly Cookie，所以前端无需任何特殊操作
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password: password || undefined,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || '更新失败')
            }

            toast({
                title: '成功',
                description: '您的个人信息已成功更新。',
            })

        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: '更新失败',
                description: error.message,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>更新信息</CardTitle>
                <CardDescription>
                    在这里修改您的个人信息。
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">用户名</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">邮箱</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">新密码 (如不修改请留空)</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">确认新密码</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? '正在保存...' : '保存更改'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
} 