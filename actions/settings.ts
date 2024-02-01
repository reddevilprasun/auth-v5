"use server";

import * as z from "zod"
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { genarateVerificationToken } from "@/lib/token";
import { sendVarificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";
export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();
    if(!user){
        return {error : "Unauthorized!"}
    }

    const dbUser = await getUserById(user.id);
    if(!dbUser){
        return {error : "Unauthorized!"}
    }
    if(user.isOAuth){
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if(values.email && values.email !== user.email){
        const existingUser = await getUserByEmail(values.email);
        if(existingUser && existingUser.id !== user.id){
            return{error :"This email already in use!"};
        }
        const verificationToken = await genarateVerificationToken(values.email);
        await sendVarificationEmail(
            verificationToken.email,
            verificationToken.token,
        );
        return {success: "Verification email send!"}    
    }

    if(values.password && values.newPassword && dbUser.password){
        const passwordMatch =  await bcrypt.compare(values.password,dbUser.password);
        if(!passwordMatch){
            return {error: "Incorrect password!"}
        }
        const hashedPassword = await  bcrypt.hash(values.newPassword,10);
        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values,
        }
    })
    return {success: "Settings update!"}
}