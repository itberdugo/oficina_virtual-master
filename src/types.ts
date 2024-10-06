export type PatientData = {
    
    primer_nombre: string,
    segundo_nombre: string,
    primer_apellido: string,
    segundo_apellido: string,
    tipo_documento: string,
    documento: number,
    fecha_nacimiento: string,
    codigo_ips: number,
    sexo: string,
    celular: number | string | null,
    telefono: number | string | null,
    correo: string,
    eps: string,
    iat: number,
}

export interface PatientDataMongo extends PatientData {

    password: string,
}