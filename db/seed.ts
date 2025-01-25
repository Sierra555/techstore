import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';
import { hashSync } from 'bcryptjs';

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

  const users = sampleData.users.map((item) => ({
      ...item,
      password: hashSync(item.password, 10),
  }));
  
  await prisma.user.createMany({
      data: users
  });
}

main();