import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { db } from './db';
import {v4 as  uuidv4} from 'uuid';

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