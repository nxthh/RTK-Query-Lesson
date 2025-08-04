import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { LuPackageCheck } from "react-icons/lu";
import { LuPackageX } from "react-icons/lu";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../features/count/countSlice";

export default function ProductCard({
  id,
  thumbnail, // This will now be product.images[0]
  // discountPercentage, // Likely no longer available
  title,
  description,
  // rating, // Likely no longer available
  // stock, // Likely no longer available
  price,
}) {
  // You'll need to decide how to handle missing data like discountPercentage, rating, stock.
  // For simplicity, I'm commenting them out or providing placeholders.

  const count = useSelector((state) => state.count.value);
  const dispatch = useDispatch();

  return (
    <Link
      to={`/products/${id}`}
      className="flex flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm hover:ring-2 hover:ring-primary-700 hover:scale-102 hover:duration-200 ease-in-out dark:border-zinc-700 dark:bg-zinc-800"
    >
      <div className="h-56 w-full">
        <img
          className="mx-auto h-full dark:block"
          src={
            thumbnail && thumbnail.startsWith("https://api.escuelajs.co/")
              ? "https://via.placeholder.com/640x480?text=No+Image" // This is the line that handles the fallback
              : thumbnail
          }
          alt={title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/640x480?text=No+Image"; // This is also good for onError
          }}
        />
      </div>
      <div className="pt-6 flex flex-col flex-grow justify-between">
        <div className="mb-4 flex items-center justify-between gap-4">
          {/* If you don't have discountPercentage, you can remove or modify this span */}
          {/* <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                Up to {discountPercentage}% off
            </span> */}
        </div>
        <div className="grid gap-1">
          <span className="text-lg font-semibold leading-tight text-zinc-900 dark:text-white">
            {title}
          </span>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 h-10 line-clamp-2">
            {description}
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2">
          {/* If you don't have rating, you can remove or modify this paragraph */}
          {/* <p className="text-sm font-medium text-zinc-900 dark:text-white">
                Rating: {rating}
            </p> */}
        </div>
        <ul className="mt-2 flex items-center gap-4">
          <li key="delivery" className="flex items-center gap-2">
            <TbTruckDelivery className=" text-zinc-500 dark:text-zinc-400" />
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Fast Delivery
            </p>
          </li>
          <li key="stock" className="flex items-center gap-2">
            {/* If you don't have stock, you can remove or modify this section */}
            {/* For demonstration, assuming "In stock" by default for now */}
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <LuPackageCheck className=" text-zinc-500 dark:text-zinc-400 " />
              <span>In stock</span>
            </span>
          </li>
        </ul>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold leading-tight text-zinc-900 dark:text-white">
            ${price}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dispatch(increment());
            }}
            type="button"
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white  hover:bg-primary-800 active:outline-none active:ring-3 active:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}
