import { SortList } from '@/views/AllDapps/config';
import Selector, { Item, Value } from '@/components/Dropdown/Selector';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const SortBy = (
  { value = SortList[0].value,
    onSelect = () => {},
    isUrlParams = false
  }: Props) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const setQueryParams = useCallback((params: any) => {
    router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
  }, [router, pathname]);

  const onSelectChange = (_value: Value, item: Item, index: number) => {
    onSelect(_value, item, index);
    if (isUrlParams) {
      const params = new URLSearchParams(searchParams);
      if (_value === SortList[0].value) {
        params.delete('sort');
      } else {
        params.set('sort', _value as string);
      }
      setQueryParams(params);
    }
  }

  return (
    <Selector
      list={SortList}
      value={value}
      onSelect={onSelectChange}
      popupStyle={{
        width: 169,
        maxHeight: 300,
      }}
      isArrowRotate={false}
    />
  );
};

export default SortBy;

interface Props {
  value: any;
  onSelect?(value: Value, item: Item, index: number): void;
  isUrlParams?: boolean;
}