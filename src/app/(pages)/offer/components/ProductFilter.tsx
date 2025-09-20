"use client";

import React, { useState } from "react";
import { MdFilterList, MdSort } from "react-icons/md";

interface FilterProps {
  onSortChange: (sort: string) => void;
  onPriceFilter: (minPrice: number, maxPrice: number) => void;
  totalProducts: number;
  currentSort: string;
}

const ProductFilter: React.FC<FilterProps> = ({
  onSortChange,
  onPriceFilter,
  totalProducts,
  currentSort,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const handlePriceFilter = () => {
    onPriceFilter(minPrice, maxPrice);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mb-8">
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Results count */}
          <div className="text-gray-300">
            <span className="text-lg font-semibold">{totalProducts}</span>
            <span className="ml-2">dostępnych gier imprezowych</span>
          </div>

          {/* Sort and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <MdSort className="text-purple-400 text-xl" />
              <select
                value={currentSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-gray-800 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400 transition-colors"
              >
                <option value="name">Nazwa A-Z</option>
                <option value="name-desc">Nazwa Z-A</option>
                <option value="price">Cena rosnąco</option>
                <option value="price-desc">Cena malejąco</option>
                <option value="bestseller">Najpopularniejsze</option>
                <option value="newest">Najnowsze</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-white font-medium"
            >
              <MdFilterList className="text-xl" />
              Filtry
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Filter */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Zakres cenowy</h3>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="bg-gray-800 border border-purple-500/30 rounded-lg px-3 py-2 text-white w-20 focus:outline-none focus:border-purple-400"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="bg-gray-800 border border-purple-500/30 rounded-lg px-3 py-2 text-white w-20 focus:outline-none focus:border-purple-400"
                  />
                  <span className="text-gray-400">zł</span>
                  <button
                    onClick={handlePriceFilter}
                    className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-white text-sm transition-colors"
                  >
                    Zastosuj
                  </button>
                </div>
              </div>

              {/* Quick Price Filters */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Szybkie filtry</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onPriceFilter(0, 20)}
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-white transition-colors"
                  >
                    Do 20 zł
                  </button>
                  <button
                    onClick={() => onPriceFilter(20, 35)}
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-white transition-colors"
                  >
                    20-35 zł
                  </button>
                  <button
                    onClick={() => onPriceFilter(35, 100)}
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-white transition-colors"
                  >
                    Powyżej 35 zł
                  </button>
                  <button
                    onClick={() => onPriceFilter(0, 100)}
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-white transition-colors"
                  >
                    Wszystkie
                  </button>
                </div>
              </div>

              {/* Reset Filters */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Resetuj</h3>
                <button
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(100);
                    onPriceFilter(0, 100);
                    onSortChange("name");
                  }}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition-colors"
                >
                  Wyczyść wszystkie filtry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;