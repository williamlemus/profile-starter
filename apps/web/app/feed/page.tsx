import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Feed from './components/feed';
import { getFeed } from '../api/feed';
import { auth } from '@clerk/nextjs/server';

const FeedPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['feed', token],
    queryFn: () => getFeed(token),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Feed />
    </HydrationBoundary>
  );
};

export default FeedPage;
