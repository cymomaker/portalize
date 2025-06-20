import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
    try {
        const { token } = await request.json()

        if (!token) {
            return NextResponse.json(
                { valid: false, message: 'Token is required' },
                { status: 400 }
            )
        }

        try {
            // 验证 token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-fallback-secret-key')
            return NextResponse.json({ valid: true, user: decoded })
        } catch (error) {
            return NextResponse.json(
                { valid: false, message: 'Invalid token' },
                { status: 401 }
            )
        }
    } catch (error) {
        console.error('Token validation error:', error)
        return NextResponse.json(
            { valid: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
} 