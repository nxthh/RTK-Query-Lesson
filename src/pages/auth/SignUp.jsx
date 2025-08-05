import React, { useState } from "react";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useRegisterMutation } from "../../features/auth/authSlide";
import { FaRegEyeSlash } from "react-icons/fa";
import { PiEye } from "react-icons/pi";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(4, "Must be greater than 4"),
  avatar: z.any(), // File input; will be converted to URL in onSubmit
});

export default function SignUp() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      // Default avatar URL if no file is uploaded
      let avatarUrl = "https://api.lorem.space/image/face?w=640&h=480";

      if (data.avatar && data.avatar[0]) {
        // Upload file to Platzi Fake API
        const formData = new FormData();
        formData.append("file", data.avatar[0]);

        const uploadResponse = await fetch(
          "https://api.escuelajs.co/api/v1/files/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          console.warn("File upload failed, using default avatar");
        } else {
          const uploadResult = await uploadResponse.json();
          avatarUrl = uploadResult.location; // Use uploaded file URL
        }
      }

      // Create JSON payload for user registration
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: avatarUrl, // Always include a valid URL
      };

      const result = await registerUser(payload).unwrap();

      if (result) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Registration failed.";
      toast.error(errorMessage);
      console.error("Registration Error:", error);
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
      setValue("avatar", files);
      handleImagePreview({ target: { files } });
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
            <Label htmlFor="name">Your Name</Label>
          </div>
          <TextInput
            {...register("name")}
            id="name"
            type="text"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
          <div className="relative">
            <TextInput
              {...register("password")}
              id="password"
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              className="pr-10"
            />
            <div
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-zinc-500 dark:text-zinc-400"
            >
              {isShowPassword ? <PiEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="avatar">Profile Picture</Label>
          </div>
          <div
            className={`flex items-center justify-center w-full h-32 ${
              isDragOver ? "border-blue-500" : "border-zinc-300"
            } border-2 border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:hover:bg-bray-800 dark:bg-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <FileInput
                  {...register("avatar")}
                  onChange={handleImagePreview}
                  id="dropzone-file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            )}
          </div>
          {errors.avatar && (
            <p className="text-red-500 text-sm mt-1">
              {errors.avatar.message}
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