import { z } from 'zod';

// might hoist to another file
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const upsertProfileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  photo: z.string(),
  headline: z.string(),
  bio: z.string(),
  user: z.object({ email: z.string() }),
  tags: z.array(z.object({ id: z.string() })),
});

export const profileOnSubmitSchema = upsertProfileFormSchema
  .omit({ tags: true })
  .extend({ tags: z.array(z.string()) });

export const profileResponseSchema = upsertProfileFormSchema
  .omit({ tags: true })
  .extend({
    id: z.string(),
    profileTags: z.array(
      z.object({ tagId: z.string(), tag: z.object({ name: z.string() }) }),
    ),
    userId: z.string(),
  });

export const getProfile = async (
  id: string,
  token: string | null,
): Promise<z.infer<typeof profileResponseSchema>> => {
  const url = `${API_URL}/profile/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(
        `Response status: ${response.status} \n ${response.statusText}`,
      );
    }
    return response.json();
  } catch (e: unknown) {
    console.error('Error obtaining profile!');
    throw e;
  }
};

export const getProfileByClerkId = async (
  id: string | null,
  token: string | null,
) => {
  const url = `${API_URL}/profile/clerk/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(
        `Response status: ${response.status} \n ${response.statusText}`,
      );
    }
    return response.json();
  } catch (e: unknown) {
    console.error('Error obtaining profile!');
    throw e;
  }
};

export const updateProfile = async (
  data: z.infer<typeof upsertProfileFormSchema>,
  id: string,
  token: string | null
) => {
  const url = `${API_URL}/profile/`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, id }),
    });
    if (!response.ok) {
      throw new Error(
        `Response status: ${response.status} \n ${response.statusText}`,
      );
    }
    return response.json();
  } catch (e: unknown) {
    console.error('Error updating profile!');
    throw e;
  }
};
