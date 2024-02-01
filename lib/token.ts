import crypt from "crypto"
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { db } from './db';
import {v4 as  uuidv4} from 'uuid';
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const genarateTwoFactorToken =async (email:string) => {
    const token = crypt.randomInt(100_000,1_000_000).toString();
    // TODO: Later change to 15 min
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
    const existingToken = await getTwoFactorTokenByEmail(email);
    if(existingToken){
        await db.twoFactorToken.delete({
            where:{id:existingToken.id},
        });
    }
    return await db.twoFactorToken.create({data:{
        email,
        token,
        expires,
    }});
}

export const genaratePasswordResetToken =async (email:string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getPasswordResetTokenByEmail(email);
    if(existingToken){
        await db.passwordResetToken.delete({
            where:{id:existingToken.id},
        });
    }
    return await db.passwordResetToken.create({ data :{
        //id: existingToken ? existingToken.id : uuidv4(),
        email,
        token,
        expires,
    }});
}

export const genarateVerificationToken = async (email:string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 *1000);
    const existingToken = await getVerificationTokenByEmail(email)
    if(existingToken){
        await db.verificationToken.delete({
            where:{id:existingToken.id},
        })
    }
    return await db.verificationToken.create({ data :{
        id: uuidv4(),
        email,
        token,
        expires,
    }})
}