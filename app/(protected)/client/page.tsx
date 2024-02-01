"use client";
import { Userinfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";


const ClientPage =  () => {
    const user =  useCurrentUser();
    return ( 
        <Userinfo
            label="📱 Client component"
            user={user}
        />
     );
}
 
export default ClientPage;