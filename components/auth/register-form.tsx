"use client";
import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FromError } from "../form-error";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,

} from "../ui/form";
import { CardWrapper } from "./card-wrapper"
import { FromSuccess } from "../form-success";
import { register } from "@/actions/register";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, starTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    }
  })
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    starTransition(() => {
      register(values)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success)
      }
      )
    });
  }
  


  return (
    <CardWrapper
      headerLabel="Create an New Account"
      backButtonLabel="Already Have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={
          form.handleSubmit((onSubmit))}
          className="space-y-6"
        >
          <div className="space-y-4">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Username"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem >
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem >
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem >
              )}
            />
          </div>
          <FromError message={error}/>
          <FromSuccess message={success}/>
          <Button disabled={isPending} type="submit" className="w-full" >Create an account</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
