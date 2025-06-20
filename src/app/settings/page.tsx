import { UpdateProfileForm } from '@/components/settings/update-profile-form'
import { getCurrentUserOnServer } from '@/lib/server-auth'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
    const user = await getCurrentUserOnServer()

    // 这是一个受保护的路由，如果无法在服务器端获取用户信息，
    // 则直接重定向到首页，而不是尝试渲染页面。
    if (!user) {
        redirect('/')
    }

    return (
        <div className="space-y-6 p-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">个人信息</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    管理您的账户信息，请注意，修改用户名和邮箱可能需要重新登录。
                </p>
            </div>
            <div className="w-full max-w-2xl">
                <UpdateProfileForm user={user} />
            </div>
        </div>
    )
} 