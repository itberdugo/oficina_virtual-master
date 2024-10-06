'use client'
import { Button,Input, useDisclosure } from '@nextui-org/react'
import React from 'react'
import ModalForgotPassword from './ModalForgotPassword'
import ModalSendedMail from './ModalSendedMail';
import ModalLoading from './ModalLoading';
import { useSession, signIn } from "next-auth/react"
import { encrypt } from '@/utils/helpers';
import { GenerateAndSendCode, ValidateCredentialsDB } from '@/server/login';
import { getDocumentoByEmail, getMailByDocumento } from '@/utils/mongo';
import { useRouter } from 'next/navigation';

export default function Login({setTab}:{setTab:Function}) {

    const [data, setData] = React.useState({documento:"",password:""});
    const [codeValid, setCodeValid] = React.useState(false);
    const [error, setError] = React.useState('');
    const [mail, setMail] = React.useState(''); //Para la parte del modal y si es necesario enviar el correo de recuperación
    const {isOpen, onOpen, onClose} = useDisclosure(); //forgot password
    const {isOpen:insOpen2, onOpen:onOpen2, onClose:onClose2} = useDisclosure(); //sended mail
    const {isOpen:insOpen3, onOpen:onOpen3, onClose:onClose3} = useDisclosure(); //loading
    const router = useRouter();
    
    const login = async () => {

        onOpen3();
        setError('');
        setMail('');
        const res = await ValidateCredentialsDB(data.documento, await encrypt(data.password));

        if(res.status){

            const email = await getMailByDocumento(data.documento);



            if(!email){
                onClose3();
                setError("Error al iniciar sesión, revisa tus credenciales");
                return;
            }
            setMail(email);
            const res = await GenerateAndSendCode(data.documento,email);
            
            if(!res){
                onClose3();
                setError("Error al iniciar sesión, revisa tus credenciales");
                return;
            }

            onOpen2();

            return;

        }

        onClose3();
        setError("Error al iniciar sesión, revisa tus credenciales");

    }
    

    React.useEffect(  () => {
        if(codeValid){

            (async () => {
            const response = await signIn("credentials", {
                redirect: false,
                username: data.documento,
                password: await encrypt(data.password)
            });

            if(response?.ok){
                setCodeValid(false);
                //redirect
                router.push("/main");
                return;
            }

            setError("Error en el servidor, intenta nuevamente");

            })();
        }
    }, [codeValid, data.documento, data.password, router])


  return (
      <>

            <article className="w-full h-96  flex gap-5 flex-col p-5 items-center justify-center">
 
                    <Input label="Documento" placeholder="123456789" type="number"  value={data.documento} onChange={(e) => setData({...data,documento: e.target.value})} />
                    <Input label="Contraseña" placeholder="Contraseña" type="password"  value={data.password}  onChange={(e)=> setData({...data,password: e.target.value})  } />

                    {error.length > 0 && <span className='text-red-600' >{error}</span>}

                    <span className="text-primary underline text-center cursor-pointer w-1/3 self-center" 
                    
                    onClick={() => setTab("register")}
                    
                    >Necesito crear un usuario</span>
                    <span className="text-primary underline text-center cursor-pointer w-1/3 self-center" 
                    
                    onClick={onOpen}
                    
                    >Se me olvido la contraseña</span>

                    <Button color="primary" className="w-1/2 self-center" 
                    
                    onClick={login}
                    
                    >Iniciar Sessión</Button>
                    
            </article>


            <ModalForgotPassword 
            
            disc={{isOpen, onOpen, onClose}}

            />

            <ModalSendedMail 
            
            disc={{isOpen:insOpen2, onOpen:onOpen2, onClose:onClose2}}
            mail={mail}
            documento={data.documento}
            setValueChange={setCodeValid}

            />

            <ModalLoading 
            
            disc={{isOpen:insOpen3, onOpen:onOpen3, onClose:onClose3}}

            />
        </>
  )
}
