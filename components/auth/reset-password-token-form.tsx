"use client"

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import zod from "zod";
import { resetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { resetPassword } from "@/actions/reset-password";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { useSearchParams } from "next/navigation";

const ResetPasswordTokenForm = () => {  

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [error,setError] = useState<string | undefined>("");
  const [success,setSuccess] = useState<string | undefined>("");

  const [isPending,startTransition] = useTransition();

  const form = useForm<zod.infer<typeof resetPasswordSchema>>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
        password: ""        
      }
  })

  const onSubmit = (values:zod.infer<typeof resetPasswordSchema>) => {

    if(!token){
        setError("Missing token");
        return;
    }

      startTransition(() => {
        resetPassword(values,token)
          .then((data) => {
            if(data.success){
              setSuccess(data.success);
              setError("");
              form.setValue("password","");              
            }
            if(data.error){
              setError(data.error);
              setSuccess("");
              form.setValue("password","");              
            }
          })
      })
  }

  return (
    <CardWrapper
        headerLabel="Reset Password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"        
    >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <Label>Email:</Label>
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
                Send
              </Button>
            </div>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default ResetPasswordTokenForm;