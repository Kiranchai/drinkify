const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function updateRatings() {
  try {
    // Get all products
    const products = await prisma.product.findMany({
      select: { id: true, name: true },
    });

    console.log(`Found ${products.length} products to update`);

    // Update each product with sample ratings
    for (const product of products) {
      // Generate random but realistic ratings (4.2 - 4.9)
      const rating = Math.round((4.2 + Math.random() * 0.7) * 10) / 10;
      const reviewCount = Math.floor(Math.random() * 200) + 50; // 50-250 reviews

      await prisma.product.update({
        where: { id: product.id },
        data: {
          rating: rating,
          reviewCount: reviewCount,
        },
      });

      console.log(
        `Updated ${product.name}: ${rating}★ (${reviewCount} reviews)`
      );
    }

    console.log("All products updated successfully!");
  } catch (error) {
    console.error("Error updating ratings:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateRatings();
