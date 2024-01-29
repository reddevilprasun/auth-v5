"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";
export const ResetForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, starTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    }
  })
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("")
    setSuccess("")
    starTransition(() => {
      reset(values)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success)
      }
      )
    });
  }
  


  return (
    <CardWrapper
      headerLabel="Forgot your password ?"
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
          </div>
          <FromError message={error}/>
          <FromSuccess message={success}/>
          <Button disabled={isPending} type="submit" className="w-full" >Sent reset email</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
