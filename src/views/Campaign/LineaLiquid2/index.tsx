import styled from 'styled-components';

import Detail from './Detail';
import Stats from './Stats';
import Task from './Task';
import TaskWrapper from './Task/TaskWrapper';

const category = 'linea-liquid-2';

export default function LineaLiquid() {
  return (
    <div>
      <Detail category={category} />
      <TaskWrapper>
        <Task category={category} />
        {/* <Stats category={category} /> */}
      </TaskWrapper>
    </div>
  );
}
