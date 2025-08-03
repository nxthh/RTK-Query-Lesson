import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "../../features/auth/authSlide";

// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const schema = z.object({
  email: z.string().nonempty("Email is required").email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  // .string()
  // .regex(
  //   passwordRegex,
  //   "Password must be at least 8 characters with at least 1 Uppercase and Special characters"
  // ),
});

// test

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();

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
    } catch (errors) {
      console.log("ERROR: ", errors?.data?.message);
    } finally {
      reset();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md w-full"
      >
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
            <p className="text-red-500">{errors.email.message}</p>
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
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit">{isLoading ? "Loading..." : "Login"}</Button>
        <Button
          className=" bg-zinc-400 dark:bg-zinc-700"
          type="button"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </form>
    </div>
  );
}
