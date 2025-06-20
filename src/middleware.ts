import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 公共路由，不需要认证
const publicRoutes = ['/']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 如果是公共路由，直接放行
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next()
    }

    // 获取 token
    const token = request.cookies.get('token')?.value

    // 如果没有token，重定向到首页
    if (!token) {
        const homeUrl = new URL('/', request.url)
        return NextResponse.redirect(homeUrl)
    }

    // 验证token是否有效
    try {
        const response = await fetch(`${request.nextUrl.origin}/api/auth/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })

        if (response.ok) {
            // Token 有效，继续访问
            return NextResponse.next()
        }
        
        // Token 无效，重定向到首页并清除无效的 token
        const homeUrl = new URL('/', request.url)
        const redirectResponse = NextResponse.redirect(homeUrl)
        redirectResponse.cookies.delete('token')
        return redirectResponse

    } catch (error) {
        console.error('中间件验证错误:', error)
        // 如果验证 API 出现问题，也重定向到首页
        const homeUrl = new URL('/', request.url)
        return NextResponse.redirect(homeUrl)
    }
}

// 配置需要进行中间件处理的路由
export const config = {
    matcher: [
        /*
         * 匹配所有请求路径，除了以下开头的路径:
         * - api (API 路由)
         * - _next/static (静态文件)
         * - _next/image (图片优化文件)
         * - images (自定义静态图片目录)
         * - favicon.ico (图标文件)
         */
        '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
    ],
} 