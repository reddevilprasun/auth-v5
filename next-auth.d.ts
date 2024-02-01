import { UserRole } from "@prisma/client";
import NextAuth,{type DefaultSession} from "next-auth"
export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
}

declare module "@auth/core"{
    interface Session{
        user: ExtendedUser;
    }
}
