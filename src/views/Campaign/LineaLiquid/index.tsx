import styled from 'styled-components';

import Detail from './Detail';
import Stats from './Stats';
import Task from './Task';

const category = 'linea-liquid';

export default function LineaLiquid() {
  return (
    <div>
      <Detail category={category} />
      <Task category={category} />
      <Stats category={category} />
    </div>
  );
}
