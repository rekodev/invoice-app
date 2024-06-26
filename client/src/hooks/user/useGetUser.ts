import { useMemo } from 'react';
import useSWR from 'swr';

import { UserModel } from '@/types/models/user';

import SWRKeys from '../../constants/swrKeys';

// TODO: Update temp user id
const useGetUser = () => {
  const { data, isLoading, mutate, error, isValidating } = useSWR<UserModel>(
    SWRKeys.user(1)
  );

  return useMemo(
    () => ({
      user: data,
      isUserLoading: isLoading,
      mutateUser: mutate,
      userError: error,
      userIsValidating: isValidating,
    }),
    [data, isLoading, mutate, error, isValidating]
  );
};

export default useGetUser;
