import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';
import { hash } from '@/lib/encrypt';

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({
      data: sampleData.products
  });

  const users = await Promise.all(sampleData.users.map(async (item) => ({
      ...item,
      password: await hash(item.password),
  })));
  
  await prisma.user.createMany({
      data: users
  });
}

main();