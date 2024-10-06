'use client'
import Image from "next/image";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { useState } from "react";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  // redirecciona cuando hay sesión activa
  if(session){
    router.push("/main")
  }

  const  [tab, setTab] = useState("login");
  return (
    <main className="h-screen w-full flex">

      {/* Sección izquierda */}
      <section className="h-full w-1/2 flex flex-col justify-center items-center p-10 ">
      
            <Tabs aria-label="opciones" className="w-full flex justify-center" color="primary"
            selectedKey={tab}
            onSelectionChange={(value) => setTab(value as string)}
            >

            <Tab key="login" title="Iniciar Sessión" className="w-full">

              <Card>
                <CardBody className="w-full flex flex-col gap-5 p-5">

                    <Login setTab={setTab} />

                </CardBody>
              </Card>

            </Tab>

            <Tab key="register" title="Crear Cuenta"  className="w-full">

              <Card>
                <CardBody className="w-full flex flex-col gap-5 p-5">

                 <Register setTab={setTab} />
                    
                </CardBody>
              </Card>
            </Tab>
          
              

          
          </Tabs>


      </section>

      {/* Sección derecha */}
      <section className="h-full w-1/2 flex flex-col justify-around items-center bg-primary">

            <h1 className="text-typography  text-3xl font-semibold" ><span className="text-yellow-500" >Hestia</span> Oficina Virtual</h1>

            <article className="w-3/4 flex items-center justify-center flex-wrap gap-10">

              {/* <Image src="/neps.png" alt="logo bienestar" width={200} height={200}/> */}
              <Image
                  src="/neps.png" priority
                  alt="logo bienestar"
                  width={200}
                  height={200}
                  style={{ width: 'auto', height: 'auto' }} // Ajusta el estilo aquí

                />
                  <Image
      src="/aliansalud.png" priority
      alt="logo aliansalud"
      width={200}
      height={200}
      style={{ width: 'auto', height: 'auto' }} // Ajusta el estilo aquí
    />
    <Image
      src="/foneca.png" priority
      alt="logo aliansalud"
      width={200}
      height={200}
      style={{ width: 'auto', height: 'auto' }} // Ajusta el estilo aquí
    />
              {/* <Image src="/aliansalud.png" alt="logo aliansalud " width={200} height={200} /> */}
              {/* <Image src="/foneca.png" alt="logo aliansalud " width={200} height={200} /> */}
              

            </article>

            <p className="w-1/2 text-typography text-xl text-center italic" >Hestia es el software que reune a todos nuestros usuarios en un solo lugar</p>


      </section>

    </main>
  );
}
