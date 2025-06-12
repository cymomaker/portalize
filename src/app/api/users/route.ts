import prisma from '@/lib/prisma'

export async function GET() {
    const users = await prisma.user.findMany({
        orderBy: { created_at: 'desc' },
        select: {
            id: true,
            username: true,
            email: true,
            status: true,
            created_at: true,
        },
    })
    return Response.json(users)
}