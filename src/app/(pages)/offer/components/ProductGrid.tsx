"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";
import ProductFilter from "./ProductFilter";

interface Product {
  name: string;
  price: number;
  thumbnail: string;
  pubName: string;
  isBestseller?: boolean;
  isNew?: boolean;
  description?: string;
  playerCount?: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  const filteredAndSortedProducts = useMemo(() => {
    // Filter by price
    let filtered = products.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "bestseller":
        filtered.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          return a.name.localeCompare(b.name);
        });
        break;
      case "newest":
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return a.name.localeCompare(b.name);
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [products, sortBy, priceRange]);

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handlePriceFilter = (minPrice: number, maxPrice: number) => {
    setPriceRange({ min: minPrice, max: maxPrice });
  };

  return (
    <>
      <ProductFilter
        onSortChange={handleSortChange}
        onPriceFilter={handlePriceFilter}
        totalProducts={filteredAndSortedProducts.length}
        currentSort={sortBy}
      />

      <div className={styles.offer_products}>
        {filteredAndSortedProducts.map((product, idx) => (
          <div className={styles.offer_single_product} key={product.pubName}>
            <Link
              className={styles.offer_inner_wrapper}
              href={`/offer/${product.pubName}`}
            >
              {product.isBestseller && (
                <span className={styles.offer_bestseller_flag}>BESTSELLER</span>
              )}

              {product.isNew && (
                <span className={styles.offer_new_item_flag}>NOWOŚĆ!</span>
              )}

              <div className={styles.offer_image_wrapper}>
                <Image
                  src={product.thumbnail}
                  alt={`${product.name} - Gra imprezowa`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>

              <div className={styles.offer_description_container}>
                <span className={styles.product_name}>{product.name}</span>
                <span className={styles.product_price}>{product.price} zł</span>
              </div>

              {/* Additional product info */}
              <div className="w-full mt-2 space-y-2">
                {product.description && (
                  <p className="text-gray-400 text-sm text-center line-clamp-2">
                    {product.description}
                  </p>
                )}
                {product.playerCount && (
                  <div className="text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-600/20 text-purple-300 border border-purple-500/30">
                      {product.playerCount} graczy
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">
            Nie znaleziono gier spełniających wybrane kryteria
          </div>
          <button
            onClick={() => {
              setSortBy("name");
              setPriceRange({ min: 0, max: 100 });
            }}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white font-medium transition-colors"
          >
            Wyczyść filtry
          </button>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
