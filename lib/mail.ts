import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendPasswordResetEmail = async(
  email: string,
  token: string,
)=>{
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your password reset link for OnBoard!",
    text: `Hello,\n\nPlease use the following link to reset your password:\n${resetLink}\n\nIf you did not request a password reset, please ignore this`
  })
}
export const sendVarificationEmail = async (email:string,token:string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please verify your account!",
    html:`<h2>Click <a href="${confirmLink}"> here </a> to confirm email.</h2>`
  })
}

export const sendTwoFactorTokenEmail =async (email:string,token:string) => {
  

  await resend.emails.send({
    from:"onboarding@resend.dev",
    to:email,
    subject:"Two Factor Authentication - Please enter this code.",
    text:`Hello,\n\nThis is your two factor authentication code ${token}.`
  })
}