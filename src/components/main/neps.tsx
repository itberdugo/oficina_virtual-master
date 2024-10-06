'use client'
import { GetAliansaludURL } from "@/server/alone";
import HospitalSVG from "../Icons/Hospital";
import LaboratorySVG from "../Icons/Laboratorio";
import OrdenamientoSVG from "../Icons/Ordenamiento";
import PQRSVG from "../Icons/PQR";
import Navbar from "./Navbar";
import Link from "next/link";

export default function Neps({nombre,documento}:{nombre:string,documento:string}) {

   

  return (
    <>
    <Navbar color="primary-neps" convenio="Nueva EPS" nombre={nombre}/>
    
    <main className="w-3/4 flex items-center justify-center mt-24">
        neps
        <section  className="grid grid-cols-4 w-full gap-2" >


            {/* <article className="w-3/4  flex flex-col gap-5 p-5 border-gray-500 border-2 
                                rounded-lg cursor-pointer 
                                transform transition-transform duration-300 hover:scale-110"
                                >


            <HospitalSVG color={"#6B7278"} />
                <h1 className="text-gray-500 text-xl font-semibold text-center">Agendar Cita (proximamente)</h1>
            </article> */}

            <Link href={"/agendar-cita"}  className="w-3/4  flex flex-col gap-5 p-5 border-primary-neps border-2 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-110">

            <HospitalSVG color={"#6B7278"} />
            <h1 className="text-gray-500 text-xl font-semibold text-center">Agendar Cita (proximamente)</h1>
            </Link>

            

            <Link href={"https://resultadoslaboratorio.bienestarips.com:8443/datacare/#nbb"}  target="_blank"  className="w-3/4  flex flex-col gap-5 p-5 border-primary-neps border-2 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-110">

                <LaboratorySVG color={"#4c94cc"} />
                <h1 className="text-primary-neps text-xl font-semibold text-center">Resultados Laboratorio</h1>
            </Link>

            <Link href={"https://oficinavirtual.bienestarips.com/www/neps/oficinavirtual/login"} target="_blank" className="w-3/4  flex flex-col gap-5 p-5 border-primary-neps border-2 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-110">

                <OrdenamientoSVG color={"#4c94cc"} />
                <h1 className="text-primary-neps text-xl font-semibold text-center">Solicitudes</h1>
            </Link>

            <Link  href={"https://oficinavirtual.bienestarips.com/www/neps/oficinavirtual/login"}  target="_blank" className="w-3/4  flex flex-col gap-5 p-5 border-primary-neps border-2 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-110">

                <PQRSVG color={"#4c94cc"} />
                <h1 className="text-primary-neps text-xl font-semibold text-center">PQRS</h1>
            </Link>

        </section>

        

        

        

    </main>
    
    </>

  )
}
