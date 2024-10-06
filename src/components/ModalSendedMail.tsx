'use client'
import React from 'react'
import {ModalContent, Modal,ModalBody,ModalHeader, Button, Input, UseDisclosureProps, Spinner } from '@nextui-org/react'
import { GetTempCode, getDocumentoByEmail } from '@/utils/mongo'

export default function ModalSendedMail({disc,mail,documento,setValueChange} : {disc: UseDisclosureProps,mail:string,documento:string, setValueChange: React.Dispatch<React.SetStateAction<boolean>>}) {

  const {isOpen, onOpen, onClose} = disc
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [code, setCode] = React.useState('')

  const verifyCode = async () => {
    setLoading(true)
    setError('')
    if(code.length !== 6){
      setError('El código debe tener 6 caracteres')
      setLoading(false)
      return
    }
    const res = await GetTempCode( documento )

    if(!res){
      setError('El tiempo para ingresar el código ha expirado, intente nuevamente')
      setLoading(false)
      return
    }

    if(res.code !== code){
      setError('El código no es válido')
      setLoading(false)
      return
    }

  

    setLoading(false)
    setValueChange(true)
    if(onClose) onClose()
    


  }

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalContent className='w-full' >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Segundo Factor de Autenticación</ModalHeader>
              <ModalBody className='mb-10 flex flex-col gap-4'>

                <span>Se ha enviado un codigo de Verificación a tu correo</span>

                <Input label="Codigo de Verificación" size="sm" placeholder="Codigo"  value={code} onChange={ (e) => setCode(e.target.value)} />
                
                { error.length > 0 && <span className='text-red-700' >{error}</span>}

                <Button color="primary" className="w-1/4  py-2" onClick={verifyCode} >Verificar</Button>

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
