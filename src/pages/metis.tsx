import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const Column: NextPageWithLayout = () => {
  const components = useBosComponents();
  const Container = styled.div``;

  return (
    <Container>
      <ComponentWrapperPage
        src={components.metis || ''}
        meta={{ title: 'Connect with the Metis community.', description: 'Become part of the Metis community.' }}
      />
    </Container>
  );
};

Column.getLayout = useDefaultLayout;

export default Column;
