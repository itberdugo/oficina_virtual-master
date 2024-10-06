import crypto from 'crypto'


export function unifiedName(primer_nombre:string, segundo_nombre:string, primer_apellido:string, segundo_apellido:string){


    return (primer_nombre + ' ') + (segundo_nombre ? segundo_nombre + ' ' : '') + (primer_apellido ? primer_apellido + ' ' : '') + (segundo_apellido ? segundo_apellido : '')
}
export function generarContrasena() {
  const simbolos = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const numeros = '0123456789';
  const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let contrasena = '';
  contrasena += simbolos[crypto.randomInt(simbolos.length)];
  contrasena += numeros[crypto.randomInt(numeros.length)] + numeros[crypto.randomInt(numeros.length)];
  contrasena += mayusculas[crypto.randomInt(mayusculas.length)];

  while (contrasena.length < 8) {
    const chars = simbolos + numeros + mayusculas;
    contrasena += chars[crypto.randomInt(chars.length)];
  }

  // Mezclar los caracteres
  contrasena = contrasena.split('').sort(() => 0.5 - Math.random()).join('');

  return contrasena;
}
export function ValidateEmail(mail:string) {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i
  return re.test(mail);
}

export function ValidateSecurityPassword(password:string){
  const mensajesError = [];

  // Verificar longitud mínima de 8 caracteres
  if (password.length < 8) {
      mensajesError.push("La contraseña debe tener al menos 8 caracteres.");
  }

  // Verificar al menos un símbolo
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      mensajesError.push("La contraseña debe tener al menos un símbolo.");
  }

  // Verificar al menos dos números
  if ((password.match(/\d/g) || []).length < 2) {
      mensajesError.push("La contraseña debe tener al menos dos números.");
  }

  // Verificar al menos una mayúscula
  if (!/[A-Z]/.test(password)) {
      mensajesError.push("La contraseña debe tener al menos una letra mayúscula.");
  }

  return mensajesError;
}

