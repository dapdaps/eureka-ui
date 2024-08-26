import { useEffect, useState } from 'react';

import { useVersionStore } from '@/stores/version';

export function useVersion() {
  const version = useVersionStore();
  const [visible, setVisible] = useState(false);

  const currentVersion = version.getVersion();

  const handleClosed = () => {
    setVisible(false);
    currentVersion && version.setRead(currentVersion.key, true);
  };

  useEffect(() => {
    if (!currentVersion || currentVersion.readed) return;
    setVisible(true);
  }, [currentVersion]);

  return {
    visible,
    handleClosed,
  };
}
