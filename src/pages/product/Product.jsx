import React from "react";
import CardProduct from "../../components/card/card-product";
import { useGetProductsQuery } from "../../features/product/productSlice2";

export default function Product() {
  const {data, isLoading, isError} = useGetProductsQuery()

  return (
    <div className="grid grid-cols-4 gap-5">
      {data?.products.map((p, index) => (
        <CardProduct key={index} thumbnail={p.thumbnail} title={p.title} />
      ))}
    </div>
  );
}
