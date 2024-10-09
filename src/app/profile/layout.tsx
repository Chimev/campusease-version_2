import Menu from "@/components/profile/Menu";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import { FavouriteListProvider } from "@/lib/Context/FavoriteContext";

 
export default async function  Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log("session",session)
  if(!session) {
    redirect('/sign-in');
  }
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
     
        <Menu/>
      </div>
      <div className="flex-grow p-6 overflow-y-auto md:p-12">
        <FavouriteListProvider>
          {children}
        </FavouriteListProvider>
      </div>
    </div>
  );
  // 7640
}