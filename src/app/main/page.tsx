import DefaultLoged from "@/components/DefaultLoged";
import Aliansalud from "@/components/main/Aliansalud";
import Neps from "@/components/main/neps";
import { Session, getServerSession } from "next-auth"
import { redirect } from "next/navigation"


export default async function Main() {

  const contratos_Actuales = ['aliansalud', 'nueva eps'];

    const session = await getServerSession()  as Session ;

    if(!session || !session.user){
        redirect("/");
    }

    //validar que el usuario tenga una imagen 

    if(!session.user.image || !contratos_Actuales.includes(session.user.image)){
        return <DefaultLoged nombre={session.user.name as string} />
    }



  return (
    <main className="w-full flex flex-col gap-5 justify-center items-center">


      pruebasdasd
        {session.user.image === 'aliansalud'  && <Aliansalud nombre={session.user.name as string}  documento={session.user.email as string} />}
        {session.user.image === 'nueva eps'  && <Neps nombre={session.user.name as string}  documento={session.user.email as string} />}
    
    
    </main>
  )
}
