'use client'
import { GetAliansaludURL } from "@/server/alone";
import HospitalSVG from "../Icons/Hospital";
import LaboratorySVG from "../Icons/Laboratorio";
import OrdenamientoSVG from "../Icons/Ordenamiento";
import PQRSVG from "../Icons/PQR";
import Navbar from "./Navbar";
import Link from "next/link";

export default function Aliansalud({nombre,documento}:{nombre:string,documento:string}) {

    const generateURL = async () => {
         const res = await GetAliansaludURL(documento)
         if(res){
             return window.open(res, "_blank")
         }
         alert('Error al generar la URL')


    }

  return (
    <>
    <Navbar color="primary-aliansalud" convenio="Aliansalud" nombre={nombre}/>
    
    <main className="w-3/4 flex items-center justify-center mt-24">
    aliansalud
        <section  className="grid grid-cols-4 w-full gap-2" >

            {/* <article className="w-3/4  flex flex-col gap-5 p-5 border-primary-aliansalud border-2 
                                rounded-lg cursor-pointer 
                                transform transition-transform duration-300 hover:scale-110"
                                onClick={generateURL} 
                                >

                <HospitalSVG color={"#64a414"} />
                <h1 className="text-primary-aliansalud text-xl font-semibold text-center">Agendar Cita</h1>
            </article> */}
            <Link href={"/agendar-cita"}  className="w-3/4  flex flex-col gap-5 p-5 border-primary-neps border-2 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-110">
                <HospitalSVG color={"#6B7278"} />
                <h1 className="text-gray-500 text-xl font-semibold text-center">Agendar Cita (proximamente)</h1>
            </Link>

            <Link href={"https://resultadoslaboratorio.bienestarips.com:8443/datacare/#nbb"}  target="_blank"  className="w-3/4  flex flex-col gap-5 p-5 border-primary-aliansalud border-2 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-110">

                <LaboratorySVG color={"#64a414"} />
                <h1 className="text-primary-aliansalud text-xl font-semibold text-center">Resultados Laboratorio</h1>
            </Link>

            <Link href={"https://oficinavirtual.bienestarips.com/www/aliansalud/oficinavirtual/login"} target="_blank" className="w-3/4  flex flex-col gap-5 p-5 border-primary-aliansalud border-2 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-110">

                <OrdenamientoSVG color={"#64a414"} />
                <h1 className="text-primary-aliansalud text-xl font-semibold text-center">Solicitudes</h1>
            </Link>

            
            <Link  href={"https://oficinavirtual.bienestarips.com/www/aliansalud/oficinavirtual/login"}  target="_blank" className="w-3/4  flex flex-col gap-5 p-5 border-primary-aliansalud border-2 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-110">

                <PQRSVG color={"#64a414"} />
                <h1 className="text-primary-aliansalud text-xl font-semibold text-center">PQRS</h1>
            </Link>
            

            

        </section>

        

        

        

    </main>
    
    </>

  )
}
