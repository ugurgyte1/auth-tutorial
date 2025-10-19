"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RoleGate from "../_components/role-gate";
import FormSuccess from "@/components/auth/form-success";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "@/actions/admin";
import { UserRole } from "@prisma/client";

const AdminPage = () => {

    const onClickApiRoute = async () => {

        fetch("/api/admin")
            .then((response) => {
                if(response.ok){
                    toast.success("You are allowed to view this page");
                } else {
                    toast.error("You are not allowed to view this page");
                }                                             
            })            
    }

    const onClickActionRoute = () => {

        admin()
            .then((data) => {
                if(data.success){
                    toast.success("You are allowed to view this page");
                }
                if(data.error){
                    toast.error("You are not allowed to view this page");
                }
            })
    }

  return (
    <Card className="w-[600px]">
        <CardHeader>
            <p className="text-2xl font-semibold text-center"> 
                🔑 Admin page
            </p>
        </CardHeader>
        <CardContent className="space-y-3">
            <RoleGate
                allowedRole={UserRole.ADMIN}
            >
                <FormSuccess message="You are allowed to view this page"/>
            </RoleGate>
            <div className="flex items-center justify-between p-2 border-2 rounded-lg shadow-md">
                <p>
                    Using api route
                </p>
                <Button className="cursor-pointer" onClick={onClickApiRoute}>
                    Click to test
                </Button>
            </div>
            <div className="flex items-center justify-between p-2 border-2 rounded-lg shadow-md">
                <p>
                    Using action route
                </p>
                <Button className="cursor-pointer" onClick={onClickActionRoute}>
                    Click to test
                </Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default AdminPage;