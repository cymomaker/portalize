'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface User {
    id: number
    email: string
    status: boolean
    created_at: string
}

export default function HomePage() {
    const [users, setUsers] = useState<User[]>([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        const res = await fetch('/api/users')
        const data = await res.json()
        setUsers(data)
    }

    async function handleAddUser() {
        setLoading(true)
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (res.ok) {
            setEmail('')
            setPassword('')
            fetchUsers()
        } else {
            alert('添加失败（可能是重复邮箱）')
        }
        setLoading(false)
    }

    return (
        <main className="max-w-xl mx-auto py-12 px-4 space-y-6">
            <h1 className="text-2xl font-bold text-center">用户管理</h1>

            <div className="flex flex-col gap-4">
                <Input placeholder="邮箱" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleAddUser} disabled={loading}>
                    {loading ? '添加中...' : '添加用户'}
                </Button>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">用户列表：</h2>
                <ul className="space-y-2">
                    {users.map((user) => (
                        <li key={user.id} className="border p-2 rounded text-sm">
                            <div>📧 {user.email}</div>
                            <div className="text-gray-500">
                                状态：{user.status ? '启用' : '禁用'} / 注册于：{new Date(user.created_at).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}