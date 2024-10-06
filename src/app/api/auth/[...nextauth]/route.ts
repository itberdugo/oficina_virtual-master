import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginUserDB } from "@/utils/mongo";
import { decrypt } from "@/utils/helpers";
import { unifiedName } from "@/utils/helpers_client";


console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET); 
console.log('PASSWORD_ENCRYPT_KEY:', process.env.PASSWORD_ENCRYPT_KEY);



const handler = NextAuth({

    secret: process.env.NEXTAUTH_SECRET,  
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                

                if(!credentials) return null

                if(credentials.username.length < 5 || credentials.password.length < 5) return null

                const decrypted = await decrypt(credentials.password, process.env.PASSWORD_ENCRYPT_KEY || '')
                const user = await LoginUserDB(credentials.username, decrypted)

                if(!user) return null

                return {
                    name: unifiedName(user.primer_nombre, user.segundo_nombre, user.primer_apellido, user.segundo_apellido),
                    id: String(user.documento),
                    email: String(user.documento),
                    image: user.eps
                }
            }
        })
    ]

})

export { handler as GET , handler as POST}