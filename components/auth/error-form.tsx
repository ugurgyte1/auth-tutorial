"use client"

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CardWrapper from "./card-wrapper";

const ErrorForm = () => {
  return (
    <CardWrapper
        headerLabel="Ooooooops! Something went wrong!..."
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
    >
        <div className="flex items-center gap-x-2 bg-destructive/15 text-destructive p-3 rounded-md">
            <ExclamationTriangleIcon/>
            <p>Email already in use different provider</p>
        </div>
    </CardWrapper>
  )
}

export default ErrorForm;