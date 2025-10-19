"use client"

import FormError from "@/components/auth/form-error";
import { useCurrentRole } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
    children: React.ReactNode
    allowedRole: UserRole
}

const RoleGate = ({
    children,
    allowedRole
}:RoleGateProps) => {

    const role = useCurrentRole();

    if(role !== allowedRole){
        return (
            <FormError message="You are not allowed to view this page"/>
        )
    }

  return (
    <div>
        {children}
    </div>
  )
}

export default RoleGate;