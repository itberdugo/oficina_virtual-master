'use client'
import React from 'react'
import {  signOut } from 'next-auth/react'

export default function DefaultLoged({nombre}:{nombre:string}) {
  return (
    <section className='w-full h-screen flex items-center justify-center gap-5 bg-black text-white flex-col' >

        <h1 className='text-xl text-clip w-1/2 text-center' >¡Hola {nombre}!, En estos momentos no tenemos una visual para ti, estamos trabajando fuertemente para conseguirlo</h1>
        
        <button 
        
        onClick={() => signOut()}
        
        className='bg-white text-black px-5 py-2 rounded-lg hover:bg-gray-300 transition-all' >Volver al inicio</button>


    </section>
  )
}
