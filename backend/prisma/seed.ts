import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const email = 'dev@example.com'
    const existing = await prisma.user.findUnique({ where: { email } })

    if (!existing) {
        const password = await bcrypt.hash('123456', 10)
        const user = await prisma.user.create({
            data: {
                email,
                password,
                name: 'Dev User',
                habits: {
                    create: [
                        { title: 'Drink Water' },
                        { title: 'Exercise' }
                    ]
                }
            }
        })
        console.log(`Created user: ${user.email}`)
    } else {
        console.log('User already exists')
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
