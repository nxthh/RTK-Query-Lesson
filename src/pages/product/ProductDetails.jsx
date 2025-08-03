import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../features/count/countSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL; // 

export default function ProductDetails({ productData }) {
  const count = useSelector((state) => state.count.value);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productData) {
        setProduct(productData);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Updated fetch URL for Platzi API
        const response = await fetch(`${BASE_URL}/products/${id}`); // 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, productData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-100 dark:bg-zinc-900 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
        Product not found.
      </div>
    );
  }

  // Function to render star ratings - Platzi API might not have this directly,
  // so you might need to mock it or remove this section.
  const renderStars = (rating) => {
    // Placeholder for now, as Platzi API might not provide direct rating
    return (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
      </>
    );
  };

  return (
    <div className="mt-20 min-h-screen bg-zinc-100 dark:bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <div className="lg:flex">
          {/* Product Image Gallery */}
          <div className="lg:w-1/2 p-6 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-700 rounded-l-lg">
            {/* Use product.images for thumbnail and gallery */}
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full max-h-96 object-contain rounded-lg shadow-md"
            />
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} - ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md cursor-pointer border border-zinc-200 dark:border-zinc-600 hover:border-primary-500 transition-all duration-200"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-8">
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-2">
              {product.title}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-300 text-lg mb-4">
              {product.description}
            </p>

            {/* Rating and Reviews - Modify or remove if Platzi API doesn't provide */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {renderStars(product.rating)} {/* product.rating might be undefined */}
              </div>
              <p className="text-zinc-700 dark:text-zinc-200 font-semibold mr-1">
                {/* {product.rating ? product.rating.toFixed(2) : "N/A"} */}
                N/A
              </p>
              <p className="text-zinc-500 dark:text-zinc-400">
                ({product.reviews ? product.reviews.length : 0} reviews)
              </p>
            </div>

            {/* Price and Discount */}
            <div className="flex items-baseline mb-6">
              <p className="text-5xl font-extrabold text-zinc-900 dark:text-white mr-4">
                ${product.price.toFixed(2)}
              </p>
              {/* Discount Percentage might not be available */}
              {/* {product.discountPercentage > 0 && (
                <span className="text-lg font-medium text-red-500 line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="ml-2 rounded bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                  {product.discountPercentage}% OFF
                </span>
              )} */}
            </div>

            {/* Stock and Delivery - Platzi API might not have this directly */}
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                {/* Stock information might not be available from Platzi API directly */}
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="font-medium">
                  In Stock (Availability unknown from API)
                </span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <svg
                  className="w-6 h-6 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 17H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3m-1 4v-4m-6 0h6"
                  ></path>
                </svg>
                <span className="font-medium">
                  {/* {product.shippingInformation} */}
                  Shipping information not available
                </span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <svg
                  className="w-6 h-6 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 10l-4 4-4-4m16 0l-4 4-4-4"
                  ></path>
                </svg>
                <span className="font-medium">
                  {/* {product.returnPolicy} */}
                  Return policy not available
                </span>
              </li>
            </ul>

            {/* Add to Cart Button */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  dispatch(increment());
                }}
                type="button"
                className="flex-1 inline-flex items-center justify-center rounded-lg bg-primary-700 px-6 py-3 text-lg font-semibold text-white hover:bg-primary-800 active:outline-none active:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-all duration-200"
              >
                <FaShoppingCart className=" mr-4" />
                Add to cart
              </button>
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center rounded-lg border border-zinc-300 px-6 py-3 text-lg font-semibold text-zinc-900 hover:bg-zinc-100 focus:outline-none focus:ring-4 focus:ring-zinc-200 dark:border-zinc-600 dark:text-white dark:hover:bg-zinc-700 dark:focus:ring-zinc-700 transition-all duration-200"
              >
                Buy Now
              </button>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-700 dark:text-zinc-300 text-sm">
              <p>
                <span className="font-semibold">Brand:</span>{" "}
                {/* Platzi API might not have a direct brand field, or it might be nested */}
                {product.brand ? product.brand : "N/A"}
              </p>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {/* Access category name from nested object if available */}
                {product.category ? product.category.name : "N/A"}
              </p>
              {/* Other fields like SKU, Weight, Dimensions, Minimum Order Quantity are likely not present directly */}
              {/* You might remove these or add placeholders */}
            </div>

            {/* Customer Reviews Section - Platzi API does not directly provide reviews */}
            <div className="mt-10 border-t border-zinc-200 dark:border-zinc-700 pt-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                Customer Reviews
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                No reviews available from the API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}