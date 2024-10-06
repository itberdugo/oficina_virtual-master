'use client'
import React from 'react'
import { modal,ModalContent, Modal,ModalBody , Button, Input, UseDisclosureProps, Spinner } from '@nextui-org/react'

export default function ModalLoading({disc} : {disc: UseDisclosureProps}) {

const {isOpen, onOpen, onClose} = disc
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size='xl' isDismissable={false}>
        <ModalContent className='w-full' >
          
            
              <ModalBody className='flex flex-col gap-4 items-center justify-center p-10'>



                <Spinner color="primary" size="lg" />

                <span>Estamos procesando su petición denos unos momentos</span>

              </ModalBody>

            
        </ModalContent>
      </Modal>
  )
}
