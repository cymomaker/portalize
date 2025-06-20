'use client'

import { getStoredUser, getToken } from './auth'

// 在客户端组件中获取当前用户信息的组合函数
export const getCurrentUser = async () => {
    // 优先从 localStorage 获取用户信息，以减少不必要的 API 请求
    const storedUser = getStoredUser()
    if (storedUser) {
        return storedUser
    }

    // 如果 localStorage 中没有，则通过 API 获取
    const token = getToken()
    if (!token) return null

    try {
        const res = await fetch('/api/user/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!res.ok) {
            return null
        }

        const user = await res.json()
        return user
    } catch (error) {
        console.error('获取用户信息失败:', error)
        return null
    }
} 