import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
    try {
        const { identifier, password } = await req.json()

        if (!identifier || !password) {
            return NextResponse.json({ message: '用户名或密码不能为空' }, { status: 400 })
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [{ email: identifier }, { username: identifier }],
            },
        })

        if (!user) {
            return NextResponse.json({ message: '用户不存在' }, { status: 404 })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json({ message: '密码错误' }, { status: 401 })
        }
        
        if (!user.status) {
            return NextResponse.json({ message: '该账户已被禁用' }, { status: 403 })
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET || 'your-fallback-secret-key',
            { expiresIn: '7d' }
        )

        const response = NextResponse.json({ message: '登录成功' })
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        })

        return response

    } catch (error) {
        console.error('登录 API 错误:', error)
        return NextResponse.json({ message: '服务器内部错误' }, { status: 500 })
    }
} 