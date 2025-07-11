import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import ListPage from '@/components/listPage/listPage';
import { FavouriteListProvider } from '@/lib/Context/FavoriteContext';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next'; // <-- fix import path
import { redirect } from 'next/navigation';
// Your NextAuth config

type Props = {
  params: Promise<{category: string}>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const category = (await params).category;
  return {
    title: category.charAt(0).toUpperCase() + category.slice(1),
  };
};

const Page = async ({ params }: Props) => {
  const category =(await params).category;

  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect with callbackUrl so user comes back here after login
    redirect(`/sign-in?callbackUrl=/category/${encodeURIComponent(category)}`);
  }

  return (
    <FavouriteListProvider>
      <ListPage category={category} />
    </FavouriteListProvider>
  );
};

export default Page;
