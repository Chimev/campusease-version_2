import ListPage from '@/components/listPage/listPage'
import { SchoolContextProvider } from '@/lib/Context/SchholContext'


const page = () => {
  return (
    <SchoolContextProvider>
         <ListPage />
    </SchoolContextProvider>
   
  )
}

export default page