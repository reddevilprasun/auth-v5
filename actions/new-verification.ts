"use server"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
        return { error: "Token does not exits!" }
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return { error: "Token has expried!" }
    }
    const user = await getUserByEmail(existingToken.email);
    if (!user) {
        return { error: "Email Does not exits!" }
    }
    await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date(), email: existingToken.email }
    })
    await db.verificationToken.delete({ where: { id: existingToken.id } })
    return { message: "Successfully verified!" };
}