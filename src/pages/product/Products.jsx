import React, { useEffect, useState } from "react";
import SearchBar from "../../components/searchBar";
import Filter from "../../components/filter";
import ShowMoreButton from "../../components/showMoreButton";
import ProductCard from "../../components/card/productCard";
import { useGetProductsQuery } from "../../features/product/productSlice2";

async function fetchData(endpoint) {
  const url = `/api${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    throw error;
  }
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
        setCategories([
          { name: "All categories", id: null },
          ...categoriesData.map((cat) => ({ name: cat.name, id: cat.id })),
        ]);
      } catch (error) {
        setCategories([{ name: "All categories", id: null }]);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    setSelectedCategory(category || { name: "All categories", id: null });
  };

  const filteredProducts = selectedCategory.id
    ? products.filter((product) => product.category?.id === selectedCategory.id)
    : products;

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
            <Filter categories={categories} />
            {isLoading && (
              <p className="text-zinc-700 dark:text-zinc-300 col-span-full text-center my-25">
                Loading products...
              </p>
            )}
            {error && (
              <p className="text-red-500 col-span-full text-center my-25">
                Error loading products: {error.message}
              </p>
            )}
            {!isLoading && !error && (
              <section className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => {
                    const thumbnail =
                      product.images &&
                      product.images[0] &&
                      product.images[0].startsWith("http")
                        ? product.images[0].replace(
                            "https://api.escuelajs.co/api/v1",
                            "/api"
                          )
                        : "https://placehold.co/640x480?text=No+Image";
                    return (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        thumbnail={thumbnail}
                        discountPercentage={null}
                        title={product.title}
                        description={product.description}
                        rating={null}
                        stock={null}
                        price={product.price}
                      />
                    );
                  })
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
