import { PropsWithChildren } from 'react';

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="">
      <main>{children}</main>
    </div>
  );
};

export default ProfileLayout;
