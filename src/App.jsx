import "./App.css";
import NavbarBasic from "./components/layouts/Navbar";
import { useGetProductsQuery } from "./features/product/productSlice2";
import CardProduct from "./components/card/card-product";

function App() {
  const { data, isLoading } = useGetProductsQuery();

  console.log("data from RTK Query", data);

  return (
    <>
      <NavbarBasic />
      {/* <button onClick={() => dispatch(increment())}>Counter +</button> */}

      <main>
        <section className="grid grid-cols-4 gap-5">
          {/* product section */}
          {data?.products.map((p, index) => (
            <CardProduct
              key={index}
              thumbnail={p.thumbnail}
              title={p.title}
              id={p.id}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
