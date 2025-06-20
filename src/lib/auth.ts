// 客户端认证工具函数

// 清理客户端存储。登出 API 会负责清理 HttpOnly cookie。
export const clearAuth = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
        localStorage.clear()
    }
}

// 验证 token 是否有效
export const validateToken = async () => {
    try {
        // 浏览器会自动发送 HttpOnly Cookie
        const response = await fetch('/api/auth/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Token validation failed')
        }

        return await response.json()
    } catch (error) {
        return { valid: false }
    }
}

// 获取当前用户信息
export const getCurrentUser = async () => {
    try {
        const response = await fetch('/api/user/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Failed to get user info')
        }

        return await response.json()
    } catch (error) {
        return null
    }
}

// 在登录成功后，将用户信息存储到 localStorage
export const setAuth = (user: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user))
    }
}

// 获取存储的用户信息
export const getStoredUser = () => {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user')
        return userStr ? JSON.parse(userStr) : null
    }
    return null
} 