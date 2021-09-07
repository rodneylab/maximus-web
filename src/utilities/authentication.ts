import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from '../generated/graphql';

export function useIsAuth() {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [data, loading, router]);
}

export { useIsAuth as default };
