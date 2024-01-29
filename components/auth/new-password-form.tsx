"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation";
import { NewPasswordSchema } from "@/schemas";
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
import { newPassword } from "@/actions/new-password";
export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, starTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    }
  })
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("")
    setSuccess("")
    starTransition(() => {
      newPassword(values,token)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success)
      }
      )
    });
  }
  


  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={
          form.handleSubmit((onSubmit))}
          className="space-y-6"
        >
          <div className="space-y-4">
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
                      placeholder="******"
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
          <Button disabled={isPending} type="submit" className="w-full" >Reset password</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
