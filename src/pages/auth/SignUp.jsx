import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import * as z from "zod";
// import { useForm, SubmitHandler } from "react-hook-form";

export default function SignUp() {
  const navigate = useNavigate();
  const user = z
    .object({
      username: z.string().max(18),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords are not match!",
      path: ["confirmPassword"],
    });

  const { register, handleSubmit } = useForm({ resolver: zodResolver(user) });

  return (
    <div className="flex items-center justify-center md:min-h-screen">
      <form className="flex max-w-md flex-col gap-4 w-full">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2">Your Username</Label>
          </div>
          <TextInput id="username" type="text" placeholder="John Doe" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2">Your password</Label>
          </div>
          <TextInput id="password1" type="password" placeholder="Password" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password">Repeat password</Label>
          </div>
          <TextInput
            id="repeat-password1"
            type="password"
            required
            placeholder="Password"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link
              href="#"
              className="text-primary-600 hover:underline dark:text-primary-500"
            >
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button type="submit">Register new account</Button>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </form>
    </div>
  );
}
