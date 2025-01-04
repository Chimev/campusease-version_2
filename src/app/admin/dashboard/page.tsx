import MetricCard from '@/components/admin/metrics/MetricCard';
import { MdGroups } from "react-icons/md";
import { MdChurch } from "react-icons/md";

const Page = () => {


  return (
    <div className='grid grid-cols-1 md:grid-cols-3  gap-6'>
      <MetricCard metricTitle ={'Users'} icon={<MdGroups />} number={'1M'}  />
      <MetricCard metricTitle ={'Schools'} icon={<MdGroups />} number={'36'}  />
    </div>
  );
};

export default Page;