import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import Settings from "@/components/profile/Settings";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


interface User {
  name: string;
  email: string;
}

const page = async() => {
  const session = await getServerSession(authOptions) as any


  if(!session){
    redirect('/sign-in');
  }

  const user = session?.user
  
  return (
    <>
    <div className='max-w-sm m-auto p-2'>
      <Settings name={user.name} email={user.email} school={user.school} phone={user.phone}/>
    </div>
    </>
  )
}

export default page