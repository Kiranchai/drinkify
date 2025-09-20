const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkRatings() {
  try {
    const products = await prisma.product.findMany({
      select: { name: true, rating: true, reviewCount: true },
    });

    console.log(`Found ${products.length} products:`);
    products.forEach((p) => {
      console.log(`- ${p.name}: ${p.rating}★ (${p.reviewCount} reviews)`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkRatings();
