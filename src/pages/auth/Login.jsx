import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "../../features/auth/authSlide";
import { ToastContainer, toast } from "react-toastify";

// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const schema = z.object({
  email: z.string().nonempty("Email is required").email(),
  password: z.string().nonempty("Password is required"),
  // .string()
  // .regex(
  //   passwordRegex,
  //   "Password must be at least 8 characters with at least 1 Uppercase and Special characters"
  // ),
});

export default function Login() {
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      let result = await login(data).unwrap();

      if (result != undefined) {
        navigate("/products");
      }
    } catch (errors) {
      toast.error(errors?.data?.message);
      console.log("ERROR: ", errors?.data?.message);
    } finally {
      reset();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {" "}
      {/* Added p-4 for padding on small screens */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg" // Enhanced sizing and added padding/shadow
      >
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white text-center mb-4">
          Login
        </h2>{" "}
        {/* Added a title */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput
            {...register("email")}
            id="email"
            type="text"
            placeholder="john@mail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Your password</Label>
          </div>
          <TextInput
            {...register("password")}
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full mt-2">
          {" "}
          {/* Made button full width */}
          {isLoading ? "Loading..." : "Login"}
        </Button>
        <Button
          className="w-full bg-zinc-400 dark:bg-zinc-700 mt-2" // Made button full width
          type="button"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}
