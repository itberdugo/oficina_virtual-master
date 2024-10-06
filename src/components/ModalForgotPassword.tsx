'use client'
import React from 'react'
import { modal,ModalContent, Modal,ModalBody,ModalHeader, Button, ModalFooter, Input, UseDisclosureProps, Spinner } from '@nextui-org/react'
import { GetTempCode, getMailByDocumento, getUserExists } from '@/utils/mongo'
import { GenerateAndSendCode, ResetRandomPassword } from '@/server/login'

export default function ModalForgotPassword({disc} : {disc: UseDisclosureProps}) {

  const {isOpen, onOpen, onClose} = disc
  const [data,setData] = React.useState({
    documento: "",
    codigo: "",
    email: ""
  })

  const [loading,setLoading] = React.useState(false)
  const [error,setError] = React.useState("")
  const [step,setStep] = React.useState(0)

  const handleSearch = async () => {

    setError("")
    setLoading(true)

    if(data.documento.length < 5){
      setError("El documento debe tener al menos 5 digitos")
      setLoading(false)
      return
    }

    const res = await getUserExists(data.documento)

    if(!res){
      setError("El usuario no existe")
      setLoading(false)
      return
    }

    const mail = await getMailByDocumento(data.documento)

    if(!mail){
      setError("Error al obtener el correo del usuario")
      setLoading(false)
      return
    }

    const res2 = await GenerateAndSendCode(data.documento,mail)

    if(!res2){
      setError("Error al enviar el correo")
      setLoading(false)
      return
    }

    const [username,domain] = mail.split('@')

    //tomar los primeros 2 caracteres y los ultimos 2

    const newMail = username.slice(0,2) + "****"  + username.slice(-2) + "@"  + domain
    
    setLoading(false)
    setStep(1)
    setData({...data,email:newMail})

  }

  const handleVerify = async () => {

    setError("")
    setLoading(true)

    if(data.codigo.length !== 6){
      setError("El código debe tener 6 caracteres")
      setLoading(false)
      return
    }

    const code = await GetTempCode(data.documento)


    if(!code){
      setError("El tiempo para ingresar el código ha expirado, intente nuevamente")
    setLoading(false)

      return
    }

    if(code.code !== data.codigo){
      setError("El código no es válido")
    setLoading(false)

      return
    }
    const res = await ResetRandomPassword(data.documento)
    setLoading(false)


    if(!res){
      setError("Error al reiniciar la contraseña")
      return
    }


    setStep(2)

  }

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalContent className='w-full' >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">¿Te has olvidado de tu contraseña?</ModalHeader>
              <ModalBody className='mb-10 flex flex-col gap-4'>


              {step === 0 && <>
                <span>Introduce tu numero de documento, intentaremos restablecer tu contraseña...</span>
                
                <section className="w-full flex items-center gap-5">

                <Input type="number" size="sm" label="Numero de Documento" placeholder="123456789"  value={data.documento}  onChange={(e)=> setData({...data,documento:e.target.value})} />
                <Button color="primary" className="w-1/3 self-center py-6"  onClick={handleSearch} >Buscar</Button>

              </section>
              
              </>}
              
              {
                step === 1 && <>

                    <p>vamos a verificar que eres tu..., te enviamos un correo electronico a {data.email}</p>

                    <Input label="Codigo de Verificación" size="sm" placeholder="Codigo"
                    
                    value={data.codigo}

                    onChange={ (e) => setData({...data,codigo:e.target.value})}
                    
                    />

                    <section className='w-full gap-5 flex items-center' >  

                    <Button color="danger" className="w-1/4  py-2"
                      
                      onClick={() => {
                        setStep(0)
                        setError("")
                        setData({
                          ...data,
                          codigo: "",
                          email: ""
                        })
                        
                      }}
                      
                      >Volver</Button>

                      <Button color="primary" className="w-1/4  py-2"
                      
                      onClick={handleVerify}
                      
                      >Verificar</Button>

                      

                    </section>

                    
                
                </>
              }
              
                {
                  step === 2 && <>
                  
                      <p>Se ha enviado un correo con tu contraseña temporal, podras acceder y reiniciar la contraseña dentro de la plataforma</p>
                      <Button color="primary" className="w-1/4  py-2" onClick={()=>{
                        setStep(0)
                        onClose()
                        setError("")
                        setData({
                          documento: "",
                          codigo: "",
                          email: ""
                        })
                      }} >Cerrar</Button>
                  </>
                }

                {error && <span className="text-red-500">{error}</span>}

                { loading && <>
                  <section className='w-full flex items-center justify-center gap-5 flex-col' >
                    <Spinner color="primary" size="lg" />
                    <span>Danos un segundo...</span>

                  </section>
                
                </>

                }

              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
  )
}
