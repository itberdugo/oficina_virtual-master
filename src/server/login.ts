'use server'
import { GenerateCode, decrypt } from "@/utils/helpers"
import { generarContrasena } from "@/utils/helpers_client"
import { sendMail } from "@/utils/mail"
import { GetTempCode, InsertTempCode, LoginUserDB, SetNewPassword, getMailByDocumento } from "@/utils/mongo"

export async function GenerateAndSendCode( documento: string, mail:string){
    const code = await GenerateCode()

    const res = await InsertTempCode(documento, mail, code)

    if(!res) return false

    const res2 = await sendMail(mail, 'Codigo de Verificación', `Su codigo de verificación para la creación de su usuario en la plataforma de Hestia oficina virtual es: ${code}`)

    if(!res2) return false

    return true

}

export async function ValidateCodeDB(documento: string, code: string){

    const res = await GetTempCode(documento)

    if(!res) return {
        status: false,
        message: 'El tiempo para ingresar el código ha expirado, intente nuevamente'
    }

    if(res.code !== code) return {
        status: false,
        message: 'El código no es válido'
    }

    return {
        status: true,
        message: 'Código válido'
    }
}

export async function ValidateCredentialsDB(username: string, password: string){

    const decrypted = await decrypt(password, process.env.PASSWORD_ENCRYPT_KEY || '')

    const user = await LoginUserDB(username, decrypted)


    if(!user) return {
        status: false,
        message: 'Usuario o contraseña incorrectos'
    }

    return {
        status: true,
        message: 'Credenciales válidas'
    }
}

export async function ResetRandomPassword(documento: string){

    const newPassword = generarContrasena()

    const res = await SetNewPassword(documento, newPassword)

    const mail = await getMailByDocumento(documento)

    if(!mail) return false

    const res2 = await sendMail(mail, 'Nueva Contraseña Temporal Plataforma Hestia', `Su nueva contraseña para la plataforma de Hestia oficina virtual es: ${newPassword}`)

    return res2
}

