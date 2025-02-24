import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <div className="flex min-w-60 flex-col items-center font-normal flex-1 shrink basis-[0%] px-[15px] max-md:max-w-full">
      <div className="bg-white flex w-[445px] max-w-full flex-col overflow-hidden items-center justify-center px-20 py-[50px] rounded-[11px] max-md:px-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#696969] text-base">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      className="rounded bg-white border p-[13px] border-[rgba(215,215,215,1)] border-solid"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#696969] text-base">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      className="rounded bg-white border p-[13px] border-[rgba(215,215,215,1)] border-solid"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="self-stretch bg-[#1352F1] w-full gap-[5px] overflow-hidden text-[15px] text-white font-bold whitespace-nowrap leading-none px-5 py-[15px] rounded-[5.333px]"
            >
              Login
            </Button>
          </form>
        </Form>

        <p className="text-[rgba(78,78,78,1)] text-[13px] mt-[30px]">
          Don't have an account?{" "}
          <a href="#" className="text-[#1352F1] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
