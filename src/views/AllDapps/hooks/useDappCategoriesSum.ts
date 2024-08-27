import { useEffect, useState } from "react";

import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useDappCategoriesSum() {

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ categoryList, setCategoryList ] = useState<any>({});

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const result = await get(`${QUEST_PATH}/api/dapp/categories`);
      setCategoryList(result?.data ?? {})
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    loading,
    categoryMap: categoryList
  };
}