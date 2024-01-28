import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVarificationEmail = async (email:string,token:string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please verify your account!",
    html:`<h2>Click <a href="${confirmLink}"> here </a> to confirm email.</h2>`
  })
}
