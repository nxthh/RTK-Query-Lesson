import React, { useEffect, useState } from "react";
import SearchBar from "../../components/searchBar";
import Filter from "../../components/filter";
import ShowMoreButton from "../../components/showMoreButton";
import ProductCard from "../../components/card/productCard";
import { useGetProductsQuery } from "../../features/product/productSlice2";

const BASE_URL = import.meta.env.VITE_BASE_URL; //

async function fetchData(endpoint) {
  const url = `${BASE_URL}${
    endpoint.startsWith("/") ? endpoint : "/" + endpoint
  }`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export default function Products() {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "All categories",
    id: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchData("/categories");
        // Assuming categoriesData is an array of objects like { id: 1, name: "Clothes", image: "..." }
        setCategories([
          { name: "All categories", id: null }, // Add "All categories" option
          ...categoriesData.map((cat) => ({ name: cat.name, id: cat.id })),
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    setSelectedCategory(category || { name: "All categories", id: null });
  };

  return (
    <>
      <section>
        <SearchBar
          onCategorySelect={handleCategorySelect}
          categories={categories
            .filter((cat) => cat.id !== null)
            .map((cat) => cat.name)}
        />
      </section>
      <main>
        <section className="bg-zinc-50 py-8 antialiased dark:bg-zinc-900 md:py-12">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            {/* You might need to adjust the Filter component to work with new category structure if it expects specific data */}
            <Filter categories={categories} />
            {isLoading && (
              <p className="text-zinc-700 dark:text-zinc-300 col-span-full text-center">
                Loading products...
              </p>
            )}
            {error && (
              <p className="text-red-500 col-span-full text-center">
                Error loading products: {error.message}
              </p>
            )}
            {!isLoading && !error && (
              <section className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      thumbnail={product.images[0]} // Platzi API returns an array of images
                      discountPercentage={null} // Platzi API doesn't seem to have discountPercentage directly
                      title={product.title}
                      description={product.description}
                      rating={null} // Platzi API doesn't seem to have rating directly
                      stock={null} // Platzi API doesn't seem to have stock directly
                      price={product.price}
                    />
                  ))
                ) : (
                  <p className="text-zinc-700 dark:text-zinc-300 col-span-full text-center">
                    No products found for this category.
                  </p>
                )}
              </section>
            )}
            <ShowMoreButton />
          </div>
        </section>
      </main>
    </>
  );
}
