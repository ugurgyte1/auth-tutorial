"use client"

import UserInfo from "../_components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ServerComponent = () => {

    const user = useCurrentUser();

  return (
    <UserInfo
        user={user!}
        label="📱 Client component"
    />
  )
}

export default ServerComponent;