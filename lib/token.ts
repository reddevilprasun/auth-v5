import { getVerificationTokenByEmail } from '@/data/verification-token';
import { db } from './db';
import {v4 as  uuidv4} from 'uuid';

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