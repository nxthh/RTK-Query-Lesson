import React from "react";
import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../../features/product/productSlice2";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);

  console.log(data);
  return (
    <div>
      {isLoading && <p>Loading....</p>}
      <img src={data?.thumbnail} alt={data?.title} />
      <h1>{data?.title}</h1>
    </div>
  );
}
