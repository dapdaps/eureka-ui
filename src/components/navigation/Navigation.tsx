import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { DesktopNavigation } from './desktop/DesktopNavigation';

export const Navigation = () => {
  const [matches, setMatches] = useState(true);

  useEffect(() => {
    setMatches(window.matchMedia('(min-width: 750px)').matches);
  }, []);

  useEffect(() => {
    window.matchMedia('(min-width: 750px)').addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  return (
    <>
      {matches && <DesktopNavigation />}
      {!matches && (
        <div className="flex pt-[20px] pl-[20px]">
          <Image src="/favicon.png" alt="DapDap" width={22} height={22} />
        </div>
      )}
    </>
  );
};
