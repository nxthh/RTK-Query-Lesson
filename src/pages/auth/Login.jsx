import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <section className="bg-teal-600 w-[100%] h-screen">
      <div className="h-screen flex justify-center items-center mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-w-sm md:min-w-xl bg-gray-50 p-5 rounded-2xl "
        >
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl text-center py-2 font-bold text-teal-600">
              Login
            </h1>
            <div className="flex flex-col">
              <input
                {...register("username", { required: true })}
                className="px-2.5 py-2.5 border border-slate-400 rounded-xl"
                placeholder="Username"
                type="text"
              />
              {errors.username && (
                <span className="text-red-600 mt-2">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                {...register("password", { required: true })}
                className="px-2.5 py-2.5 border border-slate-400 rounded-xl"
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-600 mt-2">This field is required</span>
              )}
            </div>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 px-5 py-2 rounded-xl text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
