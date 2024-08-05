import { useEffect, useState } from 'react';
import { get } from '@/utils/http';

export function useAirdrop(props: Props) {
  const {
    category,
    id,
  } = props;

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState();

  const getList = async () => {
    setLoading(true);
    try {
      const res = await get('/api/airdrop', {
        category,
        id,
      });
      console.log(res);
    } catch (err) {
      console.log('query airdrop list on error: %o', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);

  return {
    list,
    loading,
  };
}

export interface Airdrop {

}

export type CategoryNetwork = 'network';
export type CategoryDApp= 'dapp';
export type Category = CategoryNetwork | CategoryDApp;

export interface Props {
  category: Category;
  // prop the corresponding ID
  // (DApp refers to the DApp ID, and network refers to the network ID)
  id: number;
}

