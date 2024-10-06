'use server'
import { PatientDataMongo } from "@/types"
import { MongoClient } from "mongodb"
import { decrypt, encrypt } from "./helpers"

export async function InsertTempCode(documento: string,email:string, code: string) {
    const client = new MongoClient(process.env.MONGO_URI || '')

    try{

        
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('mfa')
        //se elimina el documento si ya existe

        await collection.deleteMany({documento})

        await collection.insertOne({ documento, code , email,createAt: new Date()})
        return  true
    }

    catch(e){
        console.log(e)
        return false

    }
    
    finally{
            await client.close()
        }
}
export async function GetTempCode(documento: string){
    const client = new MongoClient(process.env.MONGO_URI || '')

    try{
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('mfa')

        const res = await collection.findOne({documento},{projection: {_id: 0}}) 

        return res ? res as unknown as  {documento: string, code: string, email: string, createAt: Date}
         : null

    }

    catch(e){
        console.log(e)
        return null
    }

    finally{
        await client.close()
    }
}
export async function saveUserDB(data:PatientDataMongo){

    const client = new MongoClient(process.env.MONGO_URI || '')

    try{
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('usuarios')

        await collection.insertOne({...data, password: await encrypt(data.password, process.env.PASSWORD_ENCRYPT_KEY|| '')})

        return true
    }

    catch(e){
        console.log(e)
        return false
    }

    finally{
        await client.close()
    }

}
export async function getUserExists(documento: string){
    const client = new MongoClient(process.env.MONGO_URI || '')

    try{
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('usuarios')

        const res = await collection.findOne({documento: Number(documento)},{projection: {_id: 0}})

        return res ? true : false
    }

    catch(e){
        console.log(e)
        return true
    }

    finally{
        await client.close()
    }
}
export async function getMailExists(email: string){
    const client = new MongoClient(process.env.MONGO_URI || '')

    try{
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('usuarios')
        const res = await collection.findOne({correo:email},{projection: {_id: 0}})

        return res ? true : false
    }

    catch(e){
        console.log(e)
        return true
    }

    finally{
        await client.close()
    }
}
export async function LoginUserDB(documento:string,password:string){


    const client = new MongoClient(process.env.MONGO_URI || '')

    try{
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('usuarios')
        const projection = {projection: {_id: 0, primer_nombre:1, segundo_nombre:1, primer_apellido:1, 
            segundo_apellido:1, correo:1, documento:1,eps:1,password:1}}
            const res = await collection.findOne({documento:Number(documento)},projection)
            console.log('resultado:', res);
        if(!res) return null

        const decrypted = await decrypt(res.password, process.env.PASSWORD_ENCRYPT_KEY || '')

        console.log('decrypted:', decrypted);
        if(decrypted !== password) return null

        return res as unknown as PatientDataMongo
        
    }

    catch(e){
        console.log(e)
        return null
    }

    finally{
        await client.close()
    }

}
export async function getDocumentoByEmail(email:string){
    const client = new MongoClient(process.env.MONGO_URI || '')

    try{
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('usuarios')
        const res = await collection.findOne({correo:email},{projection: {_id: 0, documento: 1}})

        return res ? res.documento as Number : null
    }

    catch(e){
        console.log(e)
        return null
    }

    finally{
        await client.close()
    }
}
export async function getMailByDocumento(documento:string){


    const client = new MongoClient(process.env.MONGO_URI || '')

    try{
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('usuarios')
        const res = await collection.findOne({documento:Number(documento)},{projection: {_id: 0, correo: 1}})
        return res ? res.correo as string : null
    }

    catch(e){
        console.log(e)
        return null
    }

    finally{
        await client.close()
    }

}
export async function SetNewPassword(documento: string, password: string){
    const client = new MongoClient(process.env.MONGO_URI || '')

    try{
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('usuarios')

        await collection.updateOne({documento: Number(documento)},{$set: {password: await encrypt(password, process.env.PASSWORD_ENCRYPT_KEY || '')}})

        return true
    }

    catch(e){
        console.log(e)
        return false
    }

    finally{
        await client.close()
    }
}
export async function getUserRegisterByMail(email:string){
    const client = new MongoClient(process.env.MONGO_URI || '')

    try{
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('usuarios')
        const res = await collection.findOne({correo:email},{projection: {_id: 0,iat:0,password:0}})

        return res ? res as unknown as PatientDataMongo : null
    }

    catch(e){
        console.log(e)
        return null
    }

    finally{
        await client.close()
    }
}
export async function getUserRegisterByDocumento(documento:string){
    const client = new MongoClient(process.env.MONGO_URI || '')

    try{
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('usuarios')
        const res = await collection.findOne({documento:Number(documento)},{projection: {_id: 0,iat:0,password:0}})

        return res ? res as unknown as PatientDataMongo : null
    }

    catch(e){
        console.log(e)
        return null
    }

    finally{
        await client.close()
    }
}
export async function setNewPasswordByDocumento(documento:string,password:string){
    const client = new MongoClient(process.env.MONGO_URI || '')

    try{
        await client.connect()
        const db = client.db('oficina_virtual')
        const collection = db.collection('usuarios')

        await collection.updateOne({documento:Number(documento)},{$set: {password: await encrypt(password, process.env.PASSWORD_ENCRYPT_KEY || '')}})

        return true
    }

    catch(e){
        console.log(e)
        return false
    }

    finally{
        await client.close()
    }
}