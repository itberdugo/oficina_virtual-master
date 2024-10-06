import Image from 'next/image'
import React from 'react'
import Logout from './Logout'
import ResetPassword from './ResetPassword'

export default function Navbar({color,convenio,nombre}:{color:string,convenio:string,nombre:string}) {

    const colors = {
        Aliansalud: 'bg-primary-aliansalud',
        "Nueva EPS": 'bg-primary-neps',
    }  as any

    const temp = colors[convenio]
    


  return (
    
    <nav className={`${temp} flex justify-between py-5 px-10 items-center w-full`}>

        <h1 className='text-typography text-3xl font-semibold' >Hestia {convenio}</h1>
        <div className='flex gap-2 flex-col items-end'>
            <span className='text-typography font-semibold text-xl' >{nombre}</span>
            <ResetPassword />
            <Logout />
        </div>
        
    </nav>

)
}
