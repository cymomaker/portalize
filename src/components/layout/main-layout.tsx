'use client'

import { Logo } from '@/components/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
    LayoutDashboard, 
    Settings, 
    Users, 
    FileText, 
    BarChart3,
    Menu
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

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

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            {/* 顶部导航栏 */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 flex">
                        <div className="mr-6 flex items-center space-x-2">
                            <Logo />
                        </div>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <div className="w-full flex-1 md:w-auto md:flex-none">
                            {/* 这里可以放置搜索框等 */}
                        </div>
                        <nav className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                            <Link href="/settings">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/01.png" alt="用户头像" />
                                    <AvatarFallback>用户</AvatarFallback>
                                </Avatar>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                {/* 侧边栏 */}
                <aside className={cn(
                    "fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block",
                    isCollapsed ? "hidden" : "block"
                )}>
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                                        pathname === item.href && "bg-muted text-foreground"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.title}
                                </Link>
                            )
                        })}
                    </nav>
                </aside>

                {/* 主内容区 */}
                <main className="flex w-full flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
} 