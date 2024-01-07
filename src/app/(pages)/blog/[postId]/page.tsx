import { getPostData } from "@/app/utils/posts";
import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import NotFound from "@/app/(pages)/not-found";

export async function generateMetadata({ params }): Promise<Metadata> {
  try {
    const post = await getPostData(params.postId);
    return {
      title: post.metadata.title,
      description: post.metadata.description,
      openGraph: {
        images: [
          {
            url: post.metadata.thumbnail,
            width: post.metadata.thumbnailWidth,
            height: post.metadata.thumbnailHeight,
            alt: post.metadata.thumbnailAlt,
          },
        ],
        title: post.metadata.title,
        description: post.metadata.description,
        url: post.metadata.url,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}${post.metadata.url}`,
      },
    };
  } catch (err) {
    return {};
  }
}

export default async function page({ params }) {
  const { postId } = params;
  try {
    const post = await getPostData(postId);
    const DynamicPostComponent = dynamic(
      () => import(`@/posts/${postId}.mdx`),
      {
        loading: () => <p>Loading...</p>,
        ssr: true,
      }
    );

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.metadata.title,
      image: post.metadata.thumbnail,
      genre: post.metadata.genre,
      keywords: post.metadata.keywords,
      url: post.metadata.url,
      datePublished: post.metadata.createdAt,
      dateCreated: post.metadata.createdAt,
      description: post.metadata.description,
      author: {
        "@type": "Organization",
        name: "Drinkify",
      },
    };

    return (
      <>
        <div className={styles.post_intro}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className={styles.post_intro_inner}>
            <h1 className={styles.intro_header}>{post.metadata.h1}</h1>
            <span className={styles.metadata}>
              Opublikowane: {post.metadata.createdAt}
            </span>
            <span className={styles.metadata}>Autor: Drinkify</span>
          </div>

          <div className={styles.thumbnail_container}>
            <div className={styles.thumbnail_wrapper}>
              <Image
                alt={post.metadata.thumbnailAlt}
                src={post.metadata.thumbnail}
                fill
                sizes="(max-width: 640px) 100vw, 900px"
                className={styles.thumbnail}
                priority
              />
            </div>
          </div>
        </div>

        <main className={styles.content_wrapper}>
          <article className="prose dark:prose-invert px-4 pb-4 max-w-3xl [&>p>a]:text-fuchsia-600 [&>h2]:text-3xl ">
            {post && (
              <React.Suspense fallback={<p>Loading...</p>}>
                <DynamicPostComponent />
              </React.Suspense>
            )}
          </article>
        </main>
      </>
    );
  } catch (err) {
    return <NotFound />;
  }
}
