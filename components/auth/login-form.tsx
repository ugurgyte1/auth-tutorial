"use client"

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import zod from "zod";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { useSearchParams } from "next/navigation";
import ErrorPage from "@/app/auth/error/page";
import Link from "next/link";
import TwoFactorTokenPage from "@/app/auth/two-factor/page";


const LoginForm = () => {

  const [showTwoFactor,setShowTwoFactor] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const [error,setError] = useState<string | undefined>("");
  const [success,setSuccess] = useState<string | undefined>("");

  const [isPending,startTransition] = useTransition();

  const form = useForm<zod.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: ""
      }
  })

  const onSubmit = (values:zod.infer<typeof loginSchema>) => {

      startTransition(() => {
        login(values,callbackUrl)
          .then((data) => {
            if(data.success){
              setSuccess(data.success);
              setError("");
              form.setValue("email","");
              form.setValue("password","");
            }
            if(data.error){
              setError(data.error);
              setSuccess("");
              form.setValue("email","");
              form.setValue("password","");
            }
            if(data.twoFactor){
              setShowTwoFactor(true);
            }
          })
      })
  }

  const urlError = searchParams.get("error");

  if(urlError === "OAuthAccountNotLinked"){
    return (
      <ErrorPage/>
    )
  }

  const email = form.getValues("email");
  const password = form.getValues("password");

  if(showTwoFactor){
    return (
      <TwoFactorTokenPage
        email={email}
        password={password}
      />
    )
  }

  return (
    <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account"
        backButtonHref="/auth/register"
        showSocial
    >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
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
              <Button
                className="flex flex-col items-start px-0"
                variant={"link"}
                size={"sm"}
              >
                <Link href={"/auth/forgot-password"}>
                  Forgot password
                </Link>
              </Button>
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

export default LoginForm;