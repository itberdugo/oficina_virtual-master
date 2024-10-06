'use server'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import type { PatientData } from '@/types'

const algorithm = 'aes-256-cbc'; // Algoritmo de encriptación
const key = process.env.BASE_POBLACIONAL_ENCRYPT_KEY || '';
const iv = crypto.randomBytes(16); // Vector de inicialización

function encryptData(data: object) {
    // if (key.length !== 32) {
    //     throw new Error('Invalid key length. Key must be 32 bytes long for aes-256-cbc.');
    // }
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(JSON.stringify(data));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptData(token: string) {
    if (key.length !== 32) {
        throw new Error('Invalid key length. Key must be 32 bytes long for aes-256-cbc.');
    }
    const textParts = token.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString());
}

export async function getDataPatient(documento: string) {
    const host = process.env.BASE_POBLACIONAL_URI || '';
    
    console.log('host:', host);

    const data = {
        documento: Number(documento),
        query: []
    }
    const token = encryptData(data)

    try {
        const res = await fetch(`${host}/api/v1/getBasicData`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${process.env.BASE_POBLACIONAL_AUTH_TOKEN || ''}`,
                'data': token
            }
        })
        console.log('res:', res);

        if (res.status !== 200) {
            throw new Error('No se logró encontrar la información solicitada')
        }
        const json = await res.json()
        const encryptedData = json.data

        const decryptedData: PatientData = decryptData(encryptedData) as PatientData
        return {
            failed: false,
            data: decryptedData
        }
    } catch (err) {
        return {
            failed: true,
            message: "No se logró encontrar la información solicitada"
        }
    }
}