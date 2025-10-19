"use client"

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import zod from "zod";
import { twoFactorSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { twoFactor } from "@/actions/twoFactor"; 
import FormError from "./form-error";
import FormSuccess from "./form-success";

interface TwoFactorTokenFormProps {
    email: string
    password: string
}

const TwoFactorTokenForm = ({
    email,
    password
}:TwoFactorTokenFormProps) => {  

  const [error,setError] = useState<string | undefined>("");
  const [success,setSuccess] = useState<string | undefined>("");

  const [isPending,startTransition] = useTransition();

  const form = useForm<zod.infer<typeof twoFactorSchema>>({
      resolver: zodResolver(twoFactorSchema),
      defaultValues: {
        code: ""        
      }
  })

  const onSubmit = (values:zod.infer<typeof twoFactorSchema>) => {

      startTransition(() => {
        twoFactor(values,email,password)
          .then((data) => {
            if(data.success){
              setSuccess(data.success);
              setError("");
              form.setValue("code","");              
            }
            if(data.error){
              setError(data.error);
              setSuccess("");
              form.setValue("code","");              
            }
          })
      })
  }

  return (
    <CardWrapper
        headerLabel="Two factor authentication"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"        
    >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({field}) => (
                  <FormItem>
                    <Label>Two factor code:</Label>
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

export default TwoFactorTokenForm;