"use client"

import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
    message: string | undefined
}

const FormSuccess = ({
    message
}:FormSuccessProps) => {

    if(!message){
        return null;
    }

  return (
    <div className="flex gap-x-2 py-2 px-3 items-center bg-emerald-100 rounded-lg text-emerald-500">
        <CheckCircledIcon/>
        <p className="text-sm">
            {message}
        </p>
    </div>
  )
}

export default FormSuccess;