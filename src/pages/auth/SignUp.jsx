import React, { useState } from "react";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useRegisterUserMutation } from "../../features/auth/authSlide"; // Assuming you have a register mutation

const schema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .max(18, "Username must be at most 18 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters"),
  profilePicture: z.any().optional(), // For file input
});

export default function SignUp() {
  const navigate = useNavigate();
  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [isDragOver, setIsDragOver] = useState(false);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.profilePicture && data.profilePicture[0]) {
        formData.append("profilePicture", data.profilePicture[0]);
      }

      let result = await registerUser(formData).unwrap();

      if (result) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (errors) {
      toast.error(errors?.data?.message || "Registration failed.");
      console.log("ERROR: ", errors?.data?.message);
    } finally {
      reset();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setValue("profilePicture", files);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white text-center mb-4">
          Register Account
        </h2>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username">Your Username</Label>
          </div>
          <TextInput
            {...register("username")}
            id="username"
            type="text"
            placeholder="John Doe"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Your Email</Label>
          </div>
          <TextInput
            {...register("email")}
            id="email"
            type="email"
            placeholder="john@mail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Your Password</Label>
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
        {/* Removed Confirm Password Field */}
        {/*
        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
          </div>
          <TextInput
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
        */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="profilePicture">Profile Picture (Optional)</Label>
          </div>
          <div
            className={`flex items-center justify-center w-full h-32 ${
              isDragOver ? "border-blue-500" : "border-zinc-300"
            } border-2 border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:hover:bg-bray-800 dark:bg-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full p-4"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-zinc-500 dark:text-zinc-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L7 9m3-3 3 3"
                  />
                </svg>
                <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <FileInput
                {...register("profilePicture")}
                id="dropzone-file"
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
          {errors.profilePicture && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profilePicture.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full mt-2">
          {isLoading ? "Registering..." : "Register new account"}
        </Button>
        <Button
          className="w-full bg-zinc-400 dark:bg-zinc-700 mt-2"
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
