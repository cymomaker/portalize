import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">用户设置</h2>
            </div>
            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>个人信息</CardTitle>
                        <CardDescription>
                            更新您的个人信息和账户设置
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">用户名</Label>
                            <Input id="username" defaultValue="admin" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">邮箱</Label>
                            <Input id="email" type="email" defaultValue="admin@portalize.app" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">新密码</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">确认密码</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                        <Button>保存更改</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 