'use client'
import React from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Spinner, useDisclosure, ModalContent,} from '@nextui-org/react'
import { GenerateAndSendCode, ValidateCodeDB } from '@/server/login'
import { useSession } from 'next-auth/react'
import { getMailByDocumento, setNewPasswordByDocumento } from '@/utils/mongo'
import { ValidateSecurityPassword } from '@/utils/helpers_client'
export default function ResetPassword() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const [code, setCode] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [step, setStep] = React.useState(0)
    const { data: session, status } = useSession()

    if(!session  || !session.user) return null

    const handleSendCode = async () => {

        setLoading(true)
        setError("")

        const mail = await getMailByDocumento(session.user?.email || "")

        if(!mail) {
            setError("No se ha encontrado un correo asociado a tu cuenta")
            setLoading(false)
            return
        }

        const res = await GenerateAndSendCode(session.user?.email || "",mail)

        if(res){
            setStep(1)
            setLoading(false)
            return
        }

        setError("Error al enviar el codigo de verificación")
        setLoading(false)

    }

    const handleVerificateCode = async () => {

        setLoading(true)
        setError("")


        const res = await ValidateCodeDB(session.user?.email || "",code)

        if(res.status){
            setStep(2)
            setLoading(false)
            return
        }

        setError(res.message)
        setLoading(false)



    }

    const  handleSavePassword = async () => {

        setLoading(true)
        setError("")

        if(newPassword !== confirmPassword){
            setError("Las contraseñas no coinciden")
            setLoading(false)
            return
        }

        const res = await setNewPasswordByDocumento(session.user?.email || "",newPassword)

        if(res){
            setStep(0)
            setLoading(false)
            onClose()
            alert("Contraseña cambiada con exito")
            return
        }

        setError("Error al cambiar la contraseña")
        setLoading(false)

    }

    const contrato = session.user.image || ""

    const colors = {
        "aliansalud": "bg-primary-aliansalud",
        "nueva eps": "bg-primary-neps",
        "fonecare": "bg-primary-fonecare",
    } as any

    const color = colors[contrato] || "bg-primary"

  return (
    <>
        <span className='text-sm underline cursor-pointer text-white'onClick={()=>{ onOpen()}} >Cambiar Contraseña</span>
        
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size='xl'>

            <ModalContent className='w-full'>

                <ModalHeader className="flex flex-col gap-1"  >Cambiar tu contraseña</ModalHeader>
            
                <ModalBody className='mb-10 flex flex-col gap-4 justify-center items-center'>

                    {
                        step === 0 && 
                        
                        <>

                            <button className={`${color} w-3/4 text-center p-4 text-white rounded-lg`}  onClick={handleSendCode} >Enviar Codigo de Verificación</button>

                        </>
                    }

                    {
                        step === 1 &&

                        <>
                        <section  className='w-full flex flex-col gap-5' >
                            <Input placeholder="Codigo de Verificación" value={code} onChange={(e)=>{setCode(e.target.value)}} />
                            <button className={`${color} w-3/4 text-center p-4 text-white rounded-lg`}  onClick={handleVerificateCode} >Verificar Codigo</button>
                        </section>
                        
                        </>
                    }

                    {
                        step === 2 && 
                        <>

                            <Input placeholder="Nueva Contraseña" type='password' value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}
                                        errorMessage={ValidateSecurityPassword(newPassword).map((e,i) => <p key={i} className="text-red-500 text-xs">{e}</p>)}
                                        isInvalid={ValidateSecurityPassword(newPassword).length > 0}
                                        />
                            
                            
                            
                            <Input placeholder="Confirmar Contraseña" type='password' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} 
                                        isInvalid={newPassword !== confirmPassword}
                                        errorMessage={newPassword === confirmPassword ? '' : 'Las contraseñas no coinciden'}
                            />
                            
                            
                            
                            <button className={`${color} w-3/4 text-center p-4 text-white rounded-lg`}  onClick={handleSavePassword} >Cambiar Contraseña</button>
                        
                        </>
                        
                    }


                    { error.length > 0 && <span className='text-red-500 text-center'>{error}</span> }

                    {
                        loading &&  
                        <section className='w-full flex flex-col items-center justify-center gap-5'>

                            <Spinner color="primary" />
                            <span>Danos un momento</span>
                        
                        </section>
                    }

                    
                </ModalBody>

            </ModalContent>
        
        </Modal>    

    </>
  )
}
