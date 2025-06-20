import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

// 清除服务器端的认证信息 (通常在 API 路由中调用)
export function clearServerAuth() {
    cookies().delete('token')
}

// 设置服务器端的认证信息 (通常在 API 路由中调用)
export function setServerAuth(token: string) {
    cookies().set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    })
}

// 获取服务器端的 token
export function getServerToken() {
    return cookies().get('token')?.value
}

// 在服务器端组件或API路由中获取当前登录用户信息
export async function getCurrentUserOnServer() {
    const token = getServerToken()

    if (!token) {
        return null
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-fallback-secret-key') as { userId: number }

        if (!decoded.userId) {
            return null
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, username: true, email: true },
        })

        return user
    } catch (error) {
        console.error("Server-side user fetching error:", error)
        return null
    }
} 