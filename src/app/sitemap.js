import prisma from "@/app/utils/db";

const URL = "https://alcocards-next-production.up.railway.app";

export default async function sitemap() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      pubName: true,
    },
  });

  const sortedProducts = [...products].map(({ pubName }) => ({
    url: `${URL}/offer/${pubName}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["", "/login", "/register", "/cart", "/offer"].map(
    (route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
    })
  );

  return [...routes, ...sortedProducts];
}
