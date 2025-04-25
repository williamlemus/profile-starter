import { z } from 'zod';
import { profileResponseSchema } from './profile';

// might hoist to another file
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const profileFeedSchema = z.array(profileResponseSchema);

export const getFeed = async (
  token: string | null,
): Promise<z.infer<typeof profileFeedSchema>> => {
  const url = `${API_URL}/feed`;
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
