import ListPage from '@/components/listPage/listPage'
import { FavouriteListProvider } from '@/lib/Context/FavoriteContext'
import { SchoolContextProvider } from '@/lib/Context/SchholContext'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


const page = async () => {
  const session = await getServerSession();

  if(!session) {
    redirect('/sign-in');
  }

  return (
    <SchoolContextProvider>
      <FavouriteListProvider>
        <ListPage />
      </FavouriteListProvider>
    </SchoolContextProvider>
   
  )
}

export default page