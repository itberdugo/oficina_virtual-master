'use client'
import { Button,Input, useDisclosure } from '@nextui-org/react'
import React from 'react'
import ModalLoading from './ModalLoading'
import { getDataPatient } from '@/utils/http'
import { GenerateAndSendCode, ValidateCodeDB } from '@/server/login'
import type { PatientData } from '@/types'
import {  getUserExists, saveUserDB } from '@/utils/mongo'
import { unifiedName , ValidateSecurityPassword,ValidateEmail} from '@/utils/helpers_client'

export default function Register({setTab}:{setTab:Function}) {

  const [documento, setDocumento] = React.useState('')
  const [data, setData] = React.useState({} as PatientData )
  const [step, setStep] = React.useState(0)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState('')
  const {isOpen, onOpen, onClose} = useDisclosure()
 const [dataValid, setDataValid] = React.useState({
    confirmEmail: '',
    password: '',
    confirmPassword: ''
 })

  const searchPatient = async () => {

    setError('')

    if(documento.length < 5) return setError('El documento debe tener al menos 5 caracteres')

      onOpen()

      //buscar si depronto ya existe el usuario
      

      const exsits = await getUserExists(documento)

      if(exsits){
        setError('Ya existe un usuario con este documento, si olvidaste tu contraseña puedes recuperarla en la pantalla de login')
        onClose()
        return
      }

      const res = await getDataPatient(documento)

      if(res.failed){
        setError('El documento no se encuentra registrado en la base de datos, por favor verifica e intenta nuevamente')
        onClose()
        return
      }

      if(!res.data){
        setError('¡No es tu problema!, estamos trabajando en ello, por favor intenta mas tarde')
        onClose()
        return
      }
      setData({
        ...res.data,
        celular: res.data.celular || res.data.telefono || ''
      })
      setStep(1)
      onClose()
  }

  const sendVerification = async () => {

    onOpen()
    setCode('')
    setError('')

    //verificamos si el correo ya existe

    const res = await GenerateAndSendCode(documento, data.correo)

    if(!res){
      setError('¿No es tu problema!, estamos trabajando en ello, por favor intenta mas tarde, no pudimos enviar el codigo de verificación')
      onClose()
      return
    }

    setStep(2)
    onClose()
   


  }

  const validateCode = async () => {
    onOpen()
    const res = await ValidateCodeDB(documento, code)

    if(!res.status){
      setError(res.message)
      onClose()
      return
    }

    setStep(3)
    onClose()
  
  }

  const saveUser = async () => {

    onOpen()
    const res = await saveUserDB({...data,password:dataValid.password})

    if(!res){
      setError('¡No es tu problema!, estamos trabajando en ello, por favor intenta mas tarde, no pudimos crear tu usuario')
      onClose()
      return
    }

    onClose()
    setTab('login')
    //pasar a la pantalla de login
    alert('Usuario creado con exito, por favor inicia sesión')

  }



  return (
    <>
    <article className="w-full h-96 overflow-y-scroll flex gap-5 flex-col p-5">

        <section className="w-full flex items-center gap-5">

        <Input type="number" size="sm" label="Numero de Documento" placeholder="123456789"
        
        value={documento}
        
        onChange={(e) => setDocumento(e.target.value)}
        
        disabled={step > 0}
        
        />

        {
          step === 0 ? 

          <Button color="primary" className="w-1/3 self-center py-6"
        
        onClick={searchPatient}

        disabled={step > 0}
        
        >Buscar</Button>

        :

        <Button color="primary" className="w-1/3 self-center py-6"
        onClick={() => {setStep(0) ; setDocumento('')  } }
        >Limpiar</Button>

        }

        

        </section>

        {error && <span className="text-red-500">{error}</span>}

        {
          step === 1 && <>

          <Input label="Nombres Completos" size="sm" placeholder="Nombre" readOnly defaultValue={unifiedName(data.primer_nombre,data.segundo_nombre,data.primer_apellido,data.segundo_apellido)}  />
          <Input label="Fecha de Nacimiento" size="sm"  readOnly defaultValue={data.fecha_nacimiento} />
          <Input label="Genero" size="sm"  readOnly defaultValue={data.sexo} />
          <Input label="Eps" size="sm" placeholder="Correo" readOnly defaultValue={data.eps} />
          <Input label="Celular" size="sm" value={ data.celular as string }  onChange={(e) => setData({...data,celular:e.target.value})} />

          <Input label="Correo" size="sm" placeholder="Correo" type="email" value={data.correo} onChange={(e) => setData({...data,correo:e.target.value})}
          
          isInvalid={!ValidateEmail(data.correo)}

          errorMessage={ValidateEmail(data.correo) ? '' : 'Debe proporcionar un correo valido'}
          
          />


          <Input label="Confirmar Correo" size="sm" placeholder="Correo" type="email" value={dataValid.confirmEmail} onChange={(e) => setDataValid({...dataValid, confirmEmail: e.target.value }) } 
          
          isInvalid={dataValid.confirmEmail !== data.correo}

          errorMessage={dataValid.confirmEmail === data.correo ? '' : 'Los correos no coinciden'}
          
          />
          <Input label="Contraseña" size="sm" placeholder="Contraseña" type="password" value={dataValid.password}  
          onChange={(e) => setDataValid({...dataValid, password: e.target.value }) } 
          errorMessage={ValidateSecurityPassword(dataValid.password).map((e,i) => <p key={i} className="text-red-500 text-xs">{e}</p>)}
          isInvalid={ValidateSecurityPassword(dataValid.password).length > 0}
          />
          
          
          <Input label="Confirmar Contraseña" size="sm" placeholder="Contraseña" type="password" value={dataValid.confirmPassword} 
                onChange={(e) => setDataValid({...dataValid, confirmPassword: e.target.value }) }  
                isInvalid={dataValid.confirmPassword !== dataValid.password}
                errorMessage={dataValid.confirmPassword === dataValid.password ? '' : 'Las contraseñas no coinciden'}
                />

          <Button color="primary" className="w-1/3 self-center py-6"
          
          onClick={sendVerification}
          
          >Continuar</Button>
          
          </>
        }

        {
          step === 2 && <>
          
          <span className="text-center">Se envio un codigo de verificación a su correo, por favor ingreselo a continuación</span>

          <Input label="Codigo de Verificación" size="sm" placeholder="Codigo"  value={code} onChange={(e) => setCode(e.target.value)}

          />
          <section className="w-full flex items-center gap-5">
          <Button color="danger" className="w-1/4 p-5" onClick={() => setStep(step-1)} >Atras</Button>
          <Button color="primary" className="w-1/4 p-5" onClick={validateCode} >Verificar</Button>
          
          </section>
          </>
        }

        {
          step === 3 && <Button color="secondary" className="w-full mt-10 self-center py-6"
          
          onClick={saveUser}
          
          >Oprime aqui para confimar la creación de tu usuario</Button>
        }

        


        </article>

        <ModalLoading 
        
        disc={{isOpen, onOpen, onClose}}
        
        />
      </>
  )
}
