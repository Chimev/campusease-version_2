import ListPage from '@/components/listPage/listPage'
import { FavouriteListProvider } from '@/lib/Context/FavoriteContext'
import { SchoolContextProvider } from '@/lib/Context/SchholContext'
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{category: string}>
}

export const generateMetadata = async ({params}: Props):Promise<Metadata> => {
  const category =(await params).category
  return {
    title: category.charAt(0).toUpperCase() + category.slice(1)
  }
}


const page = async ({params}:Props) => {
  const category =(await params).category
  const session = await getServerSession();
  if(!session) {
    redirect('/sign-in');
  }
  return (
    <SchoolContextProvider>
      <FavouriteListProvider>
        <ListPage category={category} />
      </FavouriteListProvider>
    </SchoolContextProvider>
   
  )
}
export default page