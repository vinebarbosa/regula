import { useEffect, useState } from 'react';

export const useStore = <T>(
  store: (callback: (state: T) => unknown) => unknown,
) => {
  const result = store((state) => state) as T
  const [data, setData] = useState<T>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
