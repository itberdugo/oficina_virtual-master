module.exports = {

"[project]/src/utils/helpers.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GenerateCode": ()=>GenerateCode,
    "decrypt": ()=>decrypt,
    "encrypt": ()=>encrypt,
    "encryptALONE": ()=>encryptALONE
});
var __TURBOPACK__commonjs__external__crypto__ = __turbopack_external_require__("crypto", true);
"__TURBOPACK__ecmascript__hoisting__location__";
'use server';
;
const SCP = process.env.PASSWORD_ENCRYPT_KEY;
async function GenerateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
async function encryptALONE(text, secretKey) {
    const iv = __TURBOPACK__commonjs__external__crypto__["default"].randomBytes(16); // Vector de inicialización aleatorio
    const cipher = __TURBOPACK__commonjs__external__crypto__["default"].createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}
async function encrypt(text, secretKey = SCP) {
    const iv = __TURBOPACK__commonjs__external__crypto__["default"].randomBytes(16); // Vector de inicialización aleatorio
    const cipher = __TURBOPACK__commonjs__external__crypto__["default"].createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}
async function decrypt(encryptedText, secretKey) {
    const iv = Buffer.from(encryptedText.slice(0, 32), 'hex'); // Extraer el IV del texto cifrado
    const encryptedData = encryptedText.slice(32); // Datos cifrados sin el IV
    const decipher = __TURBOPACK__commonjs__external__crypto__["default"].createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

})()),
"[project]/src/utils/mongo.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GetTempCode": ()=>GetTempCode,
    "InsertTempCode": ()=>InsertTempCode,
    "LoginUserDB": ()=>LoginUserDB,
    "SetNewPassword": ()=>SetNewPassword,
    "getDocumentoByEmail": ()=>getDocumentoByEmail,
    "getMailByDocumento": ()=>getMailByDocumento,
    "getMailExists": ()=>getMailExists,
    "getUserExists": ()=>getUserExists,
    "getUserRegisterByDocumento": ()=>getUserRegisterByDocumento,
    "getUserRegisterByMail": ()=>getUserRegisterByMail,
    "saveUserDB": ()=>saveUserDB,
    "setNewPasswordByDocumento": ()=>setNewPasswordByDocumento
});
var __TURBOPACK__commonjs__external__mongodb__ = __turbopack_external_require__("mongodb", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/helpers.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
'use server';
;
;
async function InsertTempCode(documento, email, code) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('mfa');
        //se elimina el documento si ya existe
        await collection.deleteMany({
            documento
        });
        await collection.insertOne({
            documento,
            code,
            email,
            createAt: new Date()
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    } finally{
        await client.close();
    }
}
async function GetTempCode(documento) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('mfa');
        const res = await collection.findOne({
            documento
        }, {
            projection: {
                _id: 0
            }
        });
        return res ? res : null;
    } catch (e) {
        console.log(e);
        return null;
    } finally{
        await client.close();
    }
}
async function saveUserDB(data) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('usuarios');
        await collection.insertOne({
            ...data,
            password: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encrypt"])(data.password, process.env.PASSWORD_ENCRYPT_KEY || '')
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    } finally{
        await client.close();
    }
}
async function getUserExists(documento) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('usuarios');
        const res = await collection.findOne({
            documento: Number(documento)
        }, {
            projection: {
                _id: 0
            }
        });
        return res ? true : false;
    } catch (e) {
        console.log(e);
        return true;
    } finally{
        await client.close();
    }
}
async function getMailExists(email) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('usuarios');
        const res = await collection.findOne({
            correo: email
        }, {
            projection: {
                _id: 0
            }
        });
        return res ? true : false;
    } catch (e) {
        console.log(e);
        return true;
    } finally{
        await client.close();
    }
}
async function LoginUserDB(documento, password) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('usuarios');
        const projection = {
            projection: {
                _id: 0,
                primer_nombre: 1,
                segundo_nombre: 1,
                primer_apellido: 1,
                segundo_apellido: 1,
                correo: 1,
                documento: 1,
                eps: 1,
                password: 1
            }
        };
        const res = await collection.findOne({
            documento: Number(documento)
        }, projection);
        console.log('resultado:', res);
        if (!res) return null;
        const decrypted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decrypt"])(res.password, process.env.PASSWORD_ENCRYPT_KEY || '');
        console.log('decrypted:', decrypted);
        if (decrypted !== password) return null;
        return res;
    } catch (e) {
        console.log(e);
        return null;
    } finally{
        await client.close();
    }
}
async function getDocumentoByEmail(email) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('usuarios');
        const res = await collection.findOne({
            correo: email
        }, {
            projection: {
                _id: 0,
                documento: 1
            }
        });
        return res ? res.documento : null;
    } catch (e) {
        console.log(e);
        return null;
    } finally{
        await client.close();
    }
}
async function getMailByDocumento(documento) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('usuarios');
        const res = await collection.findOne({
            documento: Number(documento)
        }, {
            projection: {
                _id: 0,
                correo: 1
            }
        });
        return res ? res.correo : null;
    } catch (e) {
        console.log(e);
        return null;
    } finally{
        await client.close();
    }
}
async function SetNewPassword(documento, password) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('usuarios');
        await collection.updateOne({
            documento: Number(documento)
        }, {
            $set: {
                password: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encrypt"])(password, process.env.PASSWORD_ENCRYPT_KEY || '')
            }
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    } finally{
        await client.close();
    }
}
async function getUserRegisterByMail(email) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('usuarios');
        const res = await collection.findOne({
            correo: email
        }, {
            projection: {
                _id: 0,
                iat: 0,
                password: 0
            }
        });
        return res ? res : null;
    } catch (e) {
        console.log(e);
        return null;
    } finally{
        await client.close();
    }
}
async function getUserRegisterByDocumento(documento) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('usuarios');
        const res = await collection.findOne({
            documento: Number(documento)
        }, {
            projection: {
                _id: 0,
                iat: 0,
                password: 0
            }
        });
        return res ? res : null;
    } catch (e) {
        console.log(e);
        return null;
    } finally{
        await client.close();
    }
}
async function setNewPasswordByDocumento(documento, password) {
    const client = new __TURBOPACK__commonjs__external__mongodb__["MongoClient"](process.env.MONGO_URI || '');
    try {
        await client.connect();
        const db = client.db('oficina_virtual');
        const collection = db.collection('usuarios');
        await collection.updateOne({
            documento: Number(documento)
        }, {
            $set: {
                password: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encrypt"])(password, process.env.PASSWORD_ENCRYPT_KEY || '')
            }
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    } finally{
        await client.close();
    }
}

})()),
"[project]/src/utils/helpers_client.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ValidateEmail": ()=>ValidateEmail,
    "ValidateSecurityPassword": ()=>ValidateSecurityPassword,
    "generarContrasena": ()=>generarContrasena,
    "unifiedName": ()=>unifiedName
});
var __TURBOPACK__commonjs__external__crypto__ = __turbopack_external_require__("crypto", true);
"__TURBOPACK__ecmascript__hoisting__location__";
;
function unifiedName(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) {
    return primer_nombre + ' ' + (segundo_nombre ? segundo_nombre + ' ' : '') + (primer_apellido ? primer_apellido + ' ' : '') + (segundo_apellido ? segundo_apellido : '');
}
function generarContrasena() {
    const simbolos = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const numeros = '0123456789';
    const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let contrasena = '';
    contrasena += simbolos[__TURBOPACK__commonjs__external__crypto__["default"].randomInt(simbolos.length)];
    contrasena += numeros[__TURBOPACK__commonjs__external__crypto__["default"].randomInt(numeros.length)] + numeros[__TURBOPACK__commonjs__external__crypto__["default"].randomInt(numeros.length)];
    contrasena += mayusculas[__TURBOPACK__commonjs__external__crypto__["default"].randomInt(mayusculas.length)];
    while(contrasena.length < 8){
        const chars = simbolos + numeros + mayusculas;
        contrasena += chars[__TURBOPACK__commonjs__external__crypto__["default"].randomInt(chars.length)];
    }
    // Mezclar los caracteres
    contrasena = contrasena.split('').sort(()=>0.5 - Math.random()).join('');
    return contrasena;
}
function ValidateEmail(mail) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;
    return re.test(mail);
}
function ValidateSecurityPassword(password) {
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

})()),
"[project]/src/app/api/auth/[...nextauth]/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>handler,
    "POST": ()=>handler
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/mongo.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/helpers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/helpers_client.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);
console.log('PASSWORD_ENCRYPT_KEY:', process.env.PASSWORD_ENCRYPT_KEY);
const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            name: 'Credentials',
            credentials: {
                username: {
                    label: "Username",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials) return null;
                if (credentials.username.length < 5 || credentials.password.length < 5) return null;
                const decrypted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decrypt"])(credentials.password, process.env.PASSWORD_ENCRYPT_KEY || '');
                const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LoginUserDB"])(credentials.username, decrypted);
                if (!user) return null;
                return {
                    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["unifiedName"])(user.primer_nombre, user.segundo_nombre, user.primer_apellido, user.segundo_apellido),
                    id: String(user.documento),
                    email: String(user.documento),
                    image: user.eps
                };
            }
        })
    ]
});
;

})()),

};

//# sourceMappingURL=src_d0126a._.js.map