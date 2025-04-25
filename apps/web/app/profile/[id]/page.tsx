import { auth } from '@clerk/nextjs/server';
import { getProfile } from '../../api/profile';
import ProfileCard from '@/app/components/ProfileCard';

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { getToken } = await auth();
  const token = await getToken();
  const profileData = await getProfile(id, token);
  return (
    <div className="m-auto font-bold w-[50%]">
      <h1 className="text-3xl my-5 mx-2">Profile Page</h1>
      <ProfileCard profileData={profileData} showEdit={profileData.id === id} />
    </div>
  );
};

export default ProfilePage;
