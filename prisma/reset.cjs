// Prisma looks like cool ORM for node
const Prisma = require('@prisma/client');
const prisma = new Prisma.PrismaClient();

// Weird .cjs required by task
async function main() {
  const deletePosts = prisma.post.deleteMany({});
  const deleteUsers = prisma.user.deleteMany({});

  return await prisma.$transaction([deletePosts, deleteUsers]);
}

if (require.main === module) {
  main();
}

module.exports = async () =>
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
