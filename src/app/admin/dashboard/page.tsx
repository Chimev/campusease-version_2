import MetricCard from '@/components/admin/metrics/MetricCard';
import { getListings } from '@/lib/functions/listings/getListings';
import { getSchools } from '@/lib/functions/schools/getSchools';
import { getUsers } from '@/lib/functions/users/getUsers';
import { MdGroups } from "react-icons/md";
import { MdChurch } from "react-icons/md";

const Page = async () => {
  const users = await getUsers()
  console.log(users.totalUsers)
  const listings = await getListings()
  const schools = await getSchools()
 


  return (
    <div className='grid grid-cols-1 md:grid-cols-3  gap-6'>
      <MetricCard metricTitle ={'Total Users'} icon={<MdGroups />} number={users.totalUsers}  />
      <MetricCard metricTitle ={'Listings'} icon={<MdGroups />} number={listings.length}  />
      <MetricCard metricTitle ={'Schools'} icon={<MdGroups />} number={schools.length}  />
    </div>
  );
};

export default Page;