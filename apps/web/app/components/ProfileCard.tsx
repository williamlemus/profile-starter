import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import Link from 'next/link';
import React from 'react';
import { profileResponseSchema } from '../api/profile';
import { z } from 'zod';

const ProfileCard = ({
  profileData,
  showEdit,
}: {
  profileData: z.infer<typeof profileResponseSchema>;
  showEdit: boolean;
}) => {
  return (
    <Card className="w-2/3">
      <CardHeader>
        <CardTitle className="flex justify-start gap-12 items-center">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={profileData.photo}
              alt="Profile Image"
              className="object-scale-down bg-gray-300"
            />
            <AvatarFallback>:)</AvatarFallback>
          </Avatar>
          {profileData.name}
        </CardTitle>
        <CardDescription className="pt-1">
          {profileData.headline}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="pb-2">
          <strong>Bio:</strong> {profileData.bio}
        </p>
        {profileData.profileTags.length ? (
          <p className="pb-2">
            <strong>Interests: </strong>
            {profileData.profileTags.map((tagInfo) => (
              <span
                key={tagInfo.tagId}
                className="bg-gray-300 px-2 rounded-2xl mx-1 inline-flex font-normal"
              >
                {tagInfo.tag.name}
              </span>
            ))}
          </p>
        ) : null}
        <p className="pb-2">
          <strong>Email:</strong> {profileData.user.email}
        </p>
      </CardContent>
      <CardFooter>
        {showEdit && (
          <Button asChild>
            <Link href={`/profile/${profileData.id}/edit/`}>Edit</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
