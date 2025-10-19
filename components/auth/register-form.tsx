"use client"

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import zod from "zod";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";  
import FormError from "./form-error";
import FormSuccess from "./form-success";


const RegisterForm = () => {

  const [error,setError] = useState<string | undefined>("");
  const [success,setSuccess] = useState<string | undefined>("");

  const [isPending,startTransition] = useTransition();

  const form = useForm<zod.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        name: "",
        email: "",
        password: ""
      }
  })

  const onSubmit = (values:zod.infer<typeof registerSchema>) => {

      startTransition(() => {
        register(values)
          .then((data) => {
            if(data.success){
              setSuccess(data.success);
              setError("");
              form.setValue("name","");
              form.setValue("email","");
              form.setValue("password","");
            }
            if(data.error){
              setError(data.error);
              setSuccess("");
              form.setValue("name","");
              form.setValue("email","");
              form.setValue("password","");
            }
          })
      })
  }

  return (
    <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account"
        backButtonHref="/auth/login"
        showSocial
    >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <Label>Name:</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        type="name"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <Label>Email:</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john.doe@example.com"
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <Label>Password:</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="******"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormError message={error}/>
              <FormSuccess message={success}/>
              <Button 
                className="cursor-pointer w-full"
                disabled={isPending}
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default RegisterForm;