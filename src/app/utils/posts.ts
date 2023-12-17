import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import type { JSXElementConstructor, ReactElement } from "react";

const postsDirectory = path.join(process.cwd(), "src", "posts");

export async function getPostData(id: string): Promise<{
  metadata: {
    id: string;
    title?: string;
    description?: string;
    h1?: string;
    thumbnail?: string;
    createdAt?: string;
    thumbnailAlt?: string;
    thumbnailWidth?: number;
    thumbnailHeight?: number;
    url?: string;
    genre?: string;
    keywords?: string;
  };
  content: ReactElement<any, string | JSXElementConstructor<any>>;
}> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.mdx`);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const { frontmatter, content } = await compileMDX({
      source: fileContent,
      options: { parseFrontmatter: true },
    });

    return { metadata: { ...frontmatter, id: id }, content };
  } catch (err) {
    return;
  }
}
