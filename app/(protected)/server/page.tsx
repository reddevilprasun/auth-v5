
import { Userinfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
    const user = await currentUser();
    return ( 
        <Userinfo
            label="💻 Server component"
            user={user}
        />
     );
}
 
export default ServerPage;