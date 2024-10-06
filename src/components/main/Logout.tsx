'use client'
import React from 'react'
import {  signOut } from 'next-auth/react'

export default function Logout() {
  return (
    <button className=' text-typography  rounded-lg underline text-sm'
    
    onClick={() => signOut()}>Cerrar Sesión</button>

  )
}
