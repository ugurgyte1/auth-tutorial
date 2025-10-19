import { currentUser } from "@/lib/auth";
import UserInfo from "../_components/user-info";

const ServerComponent = async () => {

    const user = await currentUser();

  return (
    <UserInfo
        user={user!}
        label="💻 Server component"
    />
  )
}

export default ServerComponent;