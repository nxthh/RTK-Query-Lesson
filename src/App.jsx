import { useGetProductsQuery } from "./features/product/productSlice2";

function App() {
  const { data, isLoading } = useGetProductsQuery();
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  console.log("data from RTK Query", data);

  return <></>;
}

export default App;
