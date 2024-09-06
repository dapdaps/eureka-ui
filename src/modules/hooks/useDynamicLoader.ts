import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { useCallback, useEffect, useState } from 'react';

export function useDynamicLoader<ComProps = any>(props: Props): [ComponentType<ComProps> | undefined] {
  const { path, name } = props;

  const _path = path.replace(/^\/+|\/+$/g, '');

  const [Com, setCom] = useState<ComponentType<ComProps>>();

  const getCom = useCallback(() => {
    setCom(undefined);
    const c = dynamic<ComProps>(() => import(`@/modules/${_path}/${name}`));
    setCom(c);
  }, []);

  useEffect(() => {
    getCom();
  }, []);

  return [Com];
}

interface Props {
  path: string;
  name: string;
}
