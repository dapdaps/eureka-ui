import { get } from '@/utils/http';

export function useAdvertise(category: CategoryType, categoryId?: string) {

  const fetchAdvertise = async () => {
    if (!category) {
      return;
    }
    const params: Params = {
      category: category
    }
    if (categoryId) {
      params.category_id = categoryId;
    }
    try {
      const res = await get(`/api/ad`, params);
      let advertises: Advertise[] = res.data ?? [];
      advertises = advertises.map((advertise: Advertise) => (
        {
          ...advertise,
          isAdvertise: true
        }
      ))
      return advertises as Advertise[];
    } catch {
      return [];
    }
  }

  return {
    fetchAdvertise
  }
};

type CategoryType = 'networks' | 'dapp';

interface Params {
  category: CategoryType;
  category_id?: string;
}

export interface Advertise {
  ad_images: string;
  ad_link: string;
  btn: string;
  category: CategoryType;
  category_id: number;
  description?: string;
  id: number;
  title: string;
  isAdvertise?: boolean;
}