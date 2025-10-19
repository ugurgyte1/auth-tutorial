"use client"

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import zod from "zod";
import { forgotPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { forgotPassword } from "@/actions/forgot-password"; 
import FormError from "./form-error";
import FormSuccess from "./form-success";

const ForgotPasswordForm = () => {  

  const [error,setError] = useState<string | undefined>("");
  const [success,setSuccess] = useState<string | undefined>("");

  const [isPending,startTransition] = useTransition();

  const form = useForm<zod.infer<typeof forgotPasswordSchema>>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: {
        email: ""        
      }
  })

  const onSubmit = (values:zod.infer<typeof forgotPasswordSchema>) => {

      startTransition(() => {
        forgotPassword(values)
          .then((data) => {
            if(data.success){
              setSuccess(data.success);
              setError("");
              form.setValue("email","");              
            }
            if(data.error){
              setError(data.error);
              setSuccess("");
              form.setValue("email","");              
            }
          })
      })
  }

  return (
    <CardWrapper
        headerLabel="Forgot password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"        
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
              <FormError message={error}/>
              <FormSuccess message={success}/>
              <Button 
                className="cursor-pointer w-full"
                disabled={isPending}
              >
                Send
              </Button>
            </div>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default ForgotPasswordForm;