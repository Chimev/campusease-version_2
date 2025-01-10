import ListPage from '@/components/listPage/listPage'
import { FavouriteListProvider } from '@/lib/Context/FavoriteContext'
import { SchoolContextProvider } from '@/lib/Context/SchholContext'
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface PageProps  {
  params : {
    category : string;
  }
}


export function generateMetadata({ params }: PageProps): Metadata {
  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return {
    title: capitalizeFirstLetter(params.category),
  };
}

const page = async ({params}:PageProps) => {
  const { category } =  params;

  console.log("Category:", category);

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