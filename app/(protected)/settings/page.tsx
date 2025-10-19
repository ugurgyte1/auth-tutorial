"use client"

import { settings } from "@/actions/settings";

import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/use-current-user";
import { settingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { Select } from "@radix-ui/react-select";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import zod from "zod";

const SettingsPage = () => {    

    const [isPending,startTransition] = useTransition();

    const [error,setError] = useState<string | undefined>("");
    const [success,setSuccess] = useState<string | undefined>("");

    const user = useCurrentUser();

    const {update} = useSession();

    const form = useForm<zod.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            password: "",
            newPassword: "",
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled ?? false
        }
    });

    const onSubmit = (values:zod.infer<typeof settingsSchema>) => {

        setError("");
        setSuccess("");

        startTransition(() => {

            settings(values)
                .then((data) => {
                    if(data.error){
                        setError(data.error);
                        setSuccess("");
                    }
                    if(data.success){
                        update();
                        setSuccess(data.success);
                        setError("");                        
                    }
                })
        })
    }

    useEffect(() => {

        if(user){

            form.reset({
                name: user.name ?? "",
                email: user.email ?? "",
                role: user.role,
                isTwoFactorEnabled: user.isTwoFactorEnabled ?? false,
                password: "",
                newPassword: ""
            })
        }
    },[user,form.reset])

    useEffect(() => {       

        update();
        
    },[])

  return (
    <Card className="w-[600px]">
        <CardHeader>
            <p className="text-2xl font-semibold text-center">
                ⚙️ Settings Page
            </p>
        </CardHeader>
        <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({field,fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="name">
                                    Name:
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="John Doe"
                                    autoComplete="name"                           
                                    disabled={isPending}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>                            
                        )}
                    /> 
                    {!user?.isOAuth && (
                        <>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({field,fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">
                                            Email:
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="john.doe@example.com"
                                            autoComplete="email"                          
                                            disabled={isPending}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>                            
                                )}
                            />  
                            <Controller
                                name="password"
                                control={form.control}
                                render={({field,fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">
                                            Password:
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="******"
                                            autoComplete="password"                        
                                            disabled={isPending}                                    
                                            type="password"
                                            
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>                            
                                )}
                            />
                            <Controller
                                name="newPassword"
                                control={form.control}
                                render={({field,fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="newPassword">
                                            New Password:
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="newPassword"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="******"
                                            autoComplete="newPassword"                     
                                            disabled={isPending}                                    
                                            type="password"
                                            
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>                            
                                )}
                            />
                        </>
                    )}
  
                    <Controller
                        name="role"
                        control={form.control}
                        render={({field,fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="role">
                                    Role:
                                </FieldLabel>
                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange} 
                                    disabled={isPending}                               
                                >
                                    <SelectTrigger
                                        id="role"
                                        aria-invalid={fieldState.invalid}
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select a role"/>
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                                        <SelectItem value={UserRole.USER}>User</SelectItem>
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>                            
                        )}
                    /> 
                    {!user?.isOAuth && (
                        <Controller
                            name="isTwoFactorEnabled"
                            control={form.control}
                            render={({field,fieldState}) => (
                                <Field data-invalid={fieldState.invalid} orientation={"horizontal"}>
                                    <FieldContent>
                                        <FieldLabel htmlFor="isTwoFactorEnabled">
                                            Two Factor Authentication:
                                        </FieldLabel>
                                        <FieldDescription>
                                            If you want two factor authentication switch the button on
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </FieldContent>
                                    <Switch
                                        id="isTwoFactorEnabled"
                                        name={field.name}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        aria-invalid={fieldState.invalid}
                                        disabled={isPending}
                                                                                                            
                                    />
                                </Field>                            
                            )}
                        /> 
                    )}

                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button className="cursor-pointer" disabled={isPending} type="submit">
                        Send
                    </Button>                                   
                </FieldGroup>                 
            </form>
        </CardContent>
    </Card>
  )
}

export default SettingsPage;