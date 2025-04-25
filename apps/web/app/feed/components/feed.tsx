'use client';
import { getFeed } from '@/app/api/feed';
import { useQuery } from '@tanstack/react-query';
import ProfileCard from "../../components/ProfileCard";
import { useAuth } from '@clerk/nextjs';

const Feed = () => {
  const { getToken, userId } = useAuth();
  const { data } = useQuery({
    queryKey: ['feed'],
    queryFn: async () => {
      const token = await getToken();
      const data = await getFeed(token);
      return data;
    },
  });
  return <div>
    <h1 className='text-3xl my-10 mx-auto w-10'>Feed</h1>

    <div className='w-full flex flex-col items-center gap-4'>
        {data?.map((profileData) => <ProfileCard key={profileData.id} profileData={profileData} showEdit={false} />)} 
        </div>
    </div>;
};

export default Feed;
