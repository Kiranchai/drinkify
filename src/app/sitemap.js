import prisma from "@/app/utils/db";
import fs from "fs";
import path from "path";

const URL = "https://drinkify.pl";
const postsDirectory = path.join(process.cwd(), "src", "posts");

export default async function sitemap() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      pubName: true,
    },
    where: {
      isPublished: true,
    },
  });

  const sortedProducts = [...products].map(({ pubName }) => ({
    url: `${URL}/offer/${pubName}`,
    lastModified: new Date().toISOString(),
  }));

  const blogPosts = fs.readdirSync(postsDirectory, "utf-8");

  const fixedBlogPosts = blogPosts.map((post) => ({
    url: `${URL}/blog/${post.split(".")[0]}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = [
    "",
    "/login",
    "/register",
    "/cart",
    "/offer",
    "/privacy-policy",
    "/contact",
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...sortedProducts, ...fixedBlogPosts];
}
