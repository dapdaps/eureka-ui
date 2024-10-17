import { useState } from 'react';

import DAppTabs from '@/components/DAppTabs';

import EasyEarn from './EasyEarn';
import Pools from './Pools';

const Teahouse = (props: any) => {
  const [tab, setTab] = useState<any>(2);

  return (
    <DAppTabs
      current={tab}
      tabs={[
        {
          value: 1,
          label: 'Pools',
          content: (
            <div className="w-full pt-[20px]">
              <Pools {...props} />
            </div>
          )
        },
        {
          value: 2,
          label: 'Easy Earn',
          content: (
            <div className="w-full pt-[40px]">
              <EasyEarn {...props} />
            </div>
          )
        }
      ]}
      onChange={(value) => {
        setTab(value);
      }}
    />
  );
};

export default Teahouse;
