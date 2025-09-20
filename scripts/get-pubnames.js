const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      select: { pubName: true, name: true },
    });

    products.forEach((p) => {
      console.log(`${p.pubName} - ${p.name}`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

getProducts();
