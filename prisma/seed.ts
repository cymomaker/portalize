// prisma/seed.ts
import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('开始填充测试数据...')

  const hashedPassword = await bcrypt.hash('password', 10)

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@portalize.app',
      password: hashedPassword,
      status: true,
    },
  })

  console.log('测试数据填充完成 ✅')
  console.log(`创建用户: ${admin.username} (密码: password)`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 