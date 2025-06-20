'use client'

import { Logo } from '@/components/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { clearAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { 
    LayoutDashboard, 
    Settings, 
    Users, 
    FileText, 
    BarChart3,
    Menu,
    Torus,
    User,
    LogOut
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const menuItems = [
    {
        title: '导航',
        href: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: '用户管理',
        href: '/users',
        icon: Users
    },
    {
        title: '文档中心',
        href: '/docs',
        icon: FileText
    },
    {
        title: '数据分析',
        href: '/analytics',
        icon: BarChart3
    }
]

// 生成随机头像颜色
const getRandomColor = () => {
    const colors = ['#0066cc', '#4CAF50', '#FF9800', '#E91E63', '#9C27B0', '#00BCD4']
    return colors[Math.floor(Math.random() * colors.length)]
}

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [avatarColor] = useState(getRandomColor())

    // 确保组件在客户端挂载后再渲染
    useEffect(() => {
        setMounted(true)
    }, [])

    // 在客户端挂载前返回一个加载状态
    if (!mounted) {
        return null
    }

    const handleLogout = async () => {
        try {
            // 清除所有认证相关的存储
            clearAuth()
            
            // 调用登出 API
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
            })
            
            if (res.ok) {
                // 重定向到首页
                router.push('/')
            }
        } catch (error) {
            console.error('登出失败:', error)
        }
    }

    return (
        <div className="flex min-h-screen bg-[#f5f5f7] dark:bg-gray-900">
            {/* 左侧菜单 */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-800 bg-gray-950/95 backdrop-blur-xl md:block",
                isCollapsed ? "hidden" : "block"
            )}>
                <div className="flex h-16 shrink-0 items-center justify-center border-b border-slate-800 px-6">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                            <Torus className="h-5 w-5 text-[#0066cc]" />
                            <span className="text-lg font-medium tracking-tight text-slate-50">Portalize</span>
                        </div>
                        <p className="mt-0.5 text-xs font-medium text-slate-400">一点直达，全域协同</p>
                    </div>
                </div>
                <nav className="space-y-1 px-3 py-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive 
                                        ? "bg-[#0066cc] text-white" 
                                        : "text-slate-300 hover:bg-slate-800 hover:text-slate-50"
                                )}
                            >
                                <Icon className={cn(
                                    "h-4 w-4",
                                    isActive ? "text-white" : "text-slate-400"
                                )} />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            {/* 右侧内容区 */}
            <div className="flex flex-1 flex-col md:pl-72">
                {/* 顶部导航栏 */}
                <header className="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
                    <div className="flex h-16 items-center justify-between px-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            <Menu className="h-5 w-5 text-gray-600" />
                        </Button>
                        <div className="flex flex-1 items-center justify-end space-x-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8 ring-2 ring-gray-200/50 transition-all hover:ring-[#0066cc]/20">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`} alt="用户头像" />
                                            <AvatarFallback>
                                                <img src="/images/default-avatar.svg" alt="默认头像" className="h-full w-full object-cover" />
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">管理员</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                admin@portalize.app
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings" className="flex items-center">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>个人信息</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>退出登录</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* 主内容区 */}
                <main className="flex-1 p-6">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
} 