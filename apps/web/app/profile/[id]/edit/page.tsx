'use client';
import { Input } from '@repo/ui/components/input';
import { Textarea } from '@repo/ui/components/textarea';
import { BaseSyntheticEvent, use, useEffect, useState } from 'react';
import {
  getProfile,
  profileOnSubmitSchema,
  updateProfile,
} from '../../../api/profile';
import { z } from 'zod';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Button } from '@repo/ui/components/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { getTags } from '@/app/api/tag';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@repo/ui/components/extensions/multi-select';

function isTag(tag: { id: string | undefined }): tag is { id: string } {
  return (tag as { id: string }).id !== undefined;
}

const ProfilePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);
  const [allTags, setAllTags] = useState<{ name: string; id: string }[]>([]);
  const defaultValues = {
    name: '',
    photo: '',
    headline: '',
    bio: '',
    user: {
      email: '',
    },
    tags: [],
  };
  const form = useForm<z.infer<typeof profileOnSubmitSchema>>({
    resolver: zodResolver(profileOnSubmitSchema),
    defaultValues,
  });

  const { getToken, userId, isLoaded } = useAuth();
  useEffect(() => {
    const fetchProfile = async () => {
      const token = await getToken();
      const response = await getProfile(id, token);
      if (response.userId === userId) {
        const tagNames = (response.profileTags || []).map((t) => t.tag.name);
        form.reset({ ...response, tags: tagNames });
        return;
      }
      console.log(token, response, userId);
      router.push('/feed');
    };
    if (isLoaded) {
      fetchProfile();
    }
  }, [isLoaded]);

  useEffect(() => {
    const fetchTags = async () => {
      const token = await getToken();
      const response = await getTags(token);

      setAllTags(response);
    };
    fetchTags();
  }, []);
  const onSubmit = async (
    data: z.infer<typeof profileOnSubmitSchema>,
    _?: BaseSyntheticEvent<object, any, any> | undefined,
    action?: string,
  ) => {
    const actionType = action === 'delete' ? action : 'update';
    try {
      const tagById = data.tags.map((tag) => ({
        id: allTags.find((t) => t.name === tag)?.id,
      }));
      await updateProfile({ ...data, tags: tagById.filter(isTag) }, id);
      toast(`Profile ${actionType} successful`, {
        action: {
          label: 'Go To Profile',
          onClick: () => router.push(`/profile/${id}`),
        },
      });
    } catch (e) {
      console.log(e);
      toast(`Error attempting to ${actionType} profile`, {
        action: {
          label: 'Close',
          onClick: () => {},
        },
      });
    }
  };

  const onErrors: SubmitErrorHandler<z.infer<typeof profileOnSubmitSchema>> = (
    errors,
  ) => console.log(errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onErrors)}
        className="space-y-8 w-2/3 m-auto pt-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headline</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Headline" {...field} />
              </FormControl>
              <FormDescription>
                This is your Headline. Make it Count!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Bio"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell us a little bit about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image Url</FormLabel>
              <FormControl>
                <Input type="url" placeholder="Profile Image Url" {...field} />
              </FormControl>
              <FormDescription>This is your profile image url.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>This is your Email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select your interests</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={field.onChange}
                  loop
                  className="max-w-xs"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select interests" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {allTags.map(({ name }) => (
                        <MultiSelectorItem key={name} value={name}>
                          {' '}
                          {name}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              <FormDescription>Select multiple options.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-between">
          <Button
            type="submit"
            name="updated"
            disabled={form.formState.isSubmitting}
          >
            Update Profile
          </Button>
          <Button
            type="button"
            variant="destructive"
            name="deleted"
            onClick={() => onSubmit(defaultValues, undefined, 'delete')}
            disabled={form.formState.isSubmitting}
          >
            Delete Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfilePage;
