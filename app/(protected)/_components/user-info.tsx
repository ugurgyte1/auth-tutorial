
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { UserRole } from "@prisma/client";

interface UserInfoProps {
    user:   {
                role: "ADMIN" | "USER";
                isTwoFactorEnabled: boolean
            } & {
                id?: string | undefined;
                name?: string | null | undefined;
                email?: string | null | undefined;
                image?: string | null | undefined;
            },
    label: string
}

const UserInfo = ({
    user,
    label
}:UserInfoProps) => {

  return (
    <Card className="w-full rounded-none md:rounded-lg">
        <CardHeader>
            <p className="text-2xl font-semibold text-center">
                {label}
            </p>
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="flex items-center justify-between border-2 p-2 rounded-lg shadow-md">
                <p>
                    Id:
                </p>
                <p className="truncate max-w-[180px]">
                    {user.id}
                </p>
            </div>
            <div className="flex items-center justify-between border-2 p-2 rounded-lg shadow-md">
                <p>
                    Name:
                </p>
                <p className="truncate max-w-[180px]">
                    {user.name}
                </p>
            </div>
            <div className="flex items-center justify-between border-2 p-2 rounded-lg shadow-md">
                <p>
                    Email:
                </p>
                <p className="truncate max-w-[180px]">
                    {user.email}
                </p>
            </div>
            <div className="flex items-center justify-between border-2 p-2 rounded-lg shadow-md">
                <p>
                    Role:
                </p>
                <p className="truncate max-w-[180px]">
                    {user.role === UserRole.ADMIN ? "Admin" : "User"}
                </p>
            </div>
            <div className="flex items-center justify-between border-2 p-2 rounded-lg shadow-md">
                <p>
                    Two factor enabled:
                </p>
                <Badge 
                    className="truncate max-w-[180px]"
                    variant={user.isTwoFactorEnabled ? "success" : "destructive"}
                >
                    {user.isTwoFactorEnabled === true ? "ON" : "OFF"}
                </Badge>
            </div>
        </CardContent>
    </Card>
  )
}

export default UserInfo;