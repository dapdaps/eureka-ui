import { useState } from 'react';
import V3 from './V3';
import V2 from './V2';

export default function AddLiquidity({ type = 'V3', ...rest }: any) {
  const [version, setVersion] = useState(type);

  return version === 'V3' ? <V3 setVersion={setVersion} {...rest} /> : <V2 setVersion={setVersion} {...rest} />;
}
