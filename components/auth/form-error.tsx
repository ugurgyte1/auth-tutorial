"use client"

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    message: string | undefined
}

const FormError = ({
    message
}:FormErrorProps) => {

    if(!message){
        return null;
    }

  return (
    <div className="flex gap-x-2 py-2 px-3 items-center bg-destructive/15 rounded-lg text-destructive">
        <ExclamationTriangleIcon/>
        <p className="text-sm">
            {message}
        </p>
    </div>
  )
}

export default FormError;