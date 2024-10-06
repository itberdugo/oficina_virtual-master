'use server'
import nodeMailer from 'nodemailer'


export async function sendMail(to: string, subject: string, text: string){

    try{
        const transporter = nodeMailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        })

        return true
    }
    
        catch(e){
            console.log(e)
            return false
        }
}



