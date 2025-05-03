import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const ReactQueryProvider: FC<Props> = ({ children }) => {
  const mutationCache = new MutationCache();

  const queryCache = new QueryCache();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache,
        queryCache,
        defaultOptions: {
          queries: {
            networkMode: 'offlineFirst',
            refetchOnWindowFocus: false,
            retry: 0,
            staleTime: 1000,
          },
          mutations: {
            networkMode: 'offlineFirst',
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
