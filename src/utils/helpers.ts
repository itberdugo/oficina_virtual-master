'use server'
import crypto from 'crypto';

const SCP = process.env.PASSWORD_ENCRYPT_KEY as string;

export async function GenerateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function encryptALONE(text:string, secretKey:string) {
    const iv = crypto.randomBytes(16); // Vector de inicialización aleatorio
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}

//funcion para encriptar una contraseña 

export async function encrypt(text:string, secretKey:string = SCP) {

    const iv = crypto.randomBytes(16); // Vector de inicialización aleatorio
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
  }

export async function decrypt(encryptedText:string, secretKey:string) {
    const iv = Buffer.from(encryptedText.slice(0, 32), 'hex'); // Extraer el IV del texto cifrado
    const encryptedData = encryptedText.slice(32); // Datos cifrados sin el IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}