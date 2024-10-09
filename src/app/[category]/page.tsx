import ListPage from '@/components/listPage/listPage'
import { FavouriteListProvider } from '@/lib/Context/FavoriteContext'
import { SchoolContextProvider } from '@/lib/Context/SchholContext'


const page = () => {
  return (
    <SchoolContextProvider>
      <FavouriteListProvider>
        <ListPage />
      </FavouriteListProvider>
    </SchoolContextProvider>
   
  )
}

export default page