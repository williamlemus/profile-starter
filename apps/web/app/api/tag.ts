const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTags = async (token: string | null) => {
    const url = `${API_URL}/tag`;
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
      console.error('Error obtaining tags!');
      throw e;
    }
  };