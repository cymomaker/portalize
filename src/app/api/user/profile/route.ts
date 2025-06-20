import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

// 获取当前用户信息
export async function GET(request: Request) {
    try {
        const tokenCookie = (await cookies()).get('token')

        if (!tokenCookie) {
            return NextResponse.json({ message: '认证失败' }, { status: 401 })
        }

        const token = tokenCookie.value
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-fallback-secret-key') as { userId: number }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, username: true, email: true },
        })

        if (!user) {
            return NextResponse.json({ message: '用户不存在' }, { status: 404 })
        }

        return NextResponse.json(user)

    } catch (error) {
        console.error('获取用户信息错误:', error)
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: '无效的 Token' }, { status: 401 })
        }
        return NextResponse.json({ message: '服务器内部错误' }, { status: 500 })
    }
}


// 更新用户信息
export async function PUT(request: Request) {
    try {
        const tokenCookie = (await cookies()).get('token')

        if (!tokenCookie) {
            return NextResponse.json({ message: '认证失败' }, { status: 401 })
        }

        const token = tokenCookie.value
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-fallback-secret-key') as { userId: number }
        
        const body = await request.json()
        const { username, email, password } = body

        const updateData: { username?: string; email?: string; password?: string } = {}

        if (username) updateData.username = username
        if (email) updateData.email = email
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            updateData.password = hashedPassword
        }

        const updatedUser = await prisma.user.update({
            where: { id: decoded.userId },
            data: updateData,
            select: { id: true, username: true, email: true },
        })

        return NextResponse.json({
            success: true,
            message: '个人信息更新成功',
            user: updatedUser,
        })

    } catch (error) {
        console.error('更新用户信息错误:', error)
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: '无效的 Token' }, { status: 401 })
        }
        return NextResponse.json({ message: '服务器内部错误' }, { status: 500 })
    }
} 