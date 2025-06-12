import prisma from '@/lib/prisma'

export async function GET() {
    const users = await prisma.user.findMany({
        orderBy: { created_at: 'desc' },
        select: {
            id: true,
            email: true,
            status: true,
            created_at: true,
        },
    })
    return Response.json(users)
}

export async function POST(req: Request) {
    const { email, password } = await req.json()

    if (!email || !password) {
        return new Response('缺少 email 或 password', { status: 400 })
    }

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
                status: true,
                updated_at: new Date(),
            },
        })
        return Response.json({ id: user.id, email: user.email })
    } catch (error) {
        console.log(error)
        return new Response('添加失败（可能邮箱重复）', { status: 400 })
    }
}