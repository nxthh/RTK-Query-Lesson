import { useGetProductsQuery } from "./features/product/productSlice2";

function App() {
  const { data, isLoading } = useGetProductsQuery();
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  console.log("data from RTK Query", data);

  return (
    <>
      <div className=" h-[680px] flex justify-center items-center">
        <p className=" text-white">Sorry teacher, no homepage yet🙏</p>
      </div>
    </>
  );
}

export default App;
