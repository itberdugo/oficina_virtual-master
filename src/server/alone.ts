'use server'
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getUserRegisterByDocumento, getUserRegisterByMail } from '@/utils/mongo';
import { identificaciones } from '@/constantes';
import { unifiedName } from '@/utils/helpers_client';

export async function GetAliansaludURL(documento:string){

    const url = process.env.ALONE_URL_ALIANSALUD
    const client_id = process.env.CLIENT_ID_ALIANSALUD

    //buscamos al paciente

    const patient = await getUserRegisterByDocumento(documento)

    if(!patient) return null

    

    const tempDate = toZonedTime(new Date(), 'America/Bogota');
    const time = format( tempDate , 'yyyyMMddHHmmss');

    const rootPath = path.join(process.cwd(), 'alone_certs', 'Aliansalud.pem');

    const cert = Buffer.from(fs.readFileSync(rootPath)).toString('utf-8');

    const validTipoDocumento = identificaciones.find((val) => val.aliansalud === patient.tipo_documento)

    const completeName = unifiedName(patient.primer_nombre, patient.segundo_nombre, patient.primer_apellido, patient.segundo_apellido)

    const text = `${validTipoDocumento?.alone || 1}|${patient.documento}|${completeName}|${time}|${client_id}|${process.env.NEXTAUTH_URL}`;
    
    

    const encryptedText =  crypto.publicEncrypt({
        key: cert,
        padding: crypto.constants.RSA_PKCS1_PADDING,
        oaepHash: "sha256"
    }, Buffer.from(text))

    const urlEncoded = encodeURIComponent(encryptedText.toString('base64'))

    const final_url = `${url}?key=${urlEncoded}`

    return final_url

}


