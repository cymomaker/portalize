import { NextResponse } from 'next/server'

export async function POST() {
    try {
        // 创建一个响应对象，以便我们可以设置 cookie
        const response = NextResponse.json(
            { success: true, message: '登出成功' },
            { status: 200 }
        )

        // 清除 token cookie
        // 通过设置一个过去的过期时间来让浏览器删除它
        response.cookies.set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires: new Date(0), // 设置为过去的时间
        })

        return response
    } catch (error) {
        console.error('登出 API 错误:', error)
        return NextResponse.json(
            { success: false, message: '服务器内部错误' },
            { status: 500 }
        )
    }
} 