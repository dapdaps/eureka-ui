import { useState, useEffect } from 'react';

// unstake list hooks
import useEigenpieRequests from '@/views/lrts/components/modal/stake/hooks/useEigenpieRequests';
import useEtherFiRequests from '@/views/lrts/components/modal/stake/hooks/useEtherFiRequests';
import useFraxRequests from '@/views/lrts/components/modal/stake/hooks/useFraxRequests';
import useInceptionRequests from '@/views/lrts/components/modal/stake/hooks/useInceptionRequests';
import useKarakRequests from '@/views/lrts/components/modal/stake/hooks/useKarakRequests';
import useKelpDaoRequests from '@/views/lrts/components/modal/stake/hooks/useKelpDaoRequests';
import useLidoRequests from '@/views/lrts/components/modal/stake/hooks/useLidoRequests';
import useMantleRequests from '@/views/lrts/components/modal/stake/hooks/useMantleRequests';
import useRenzoRequests from '@/views/lrts/components/modal/stake/hooks/useRenzoRequests';
import useRestakeFinanceRequests from '@/views/lrts/components/modal/stake/hooks/useRestakeFinanceRequests';

const useUnstakeRequests = (handleUpdater: any) => {
  const renzoRequests = useRenzoRequests(handleUpdater);
  const eigenpieRequests = useEigenpieRequests(handleUpdater);
  const kelpDaoRequests = useKelpDaoRequests(handleUpdater);
  const etherFiRequests = useEtherFiRequests(handleUpdater);
  const fraxRequests = useFraxRequests(handleUpdater);
  const inceptionRequests = useInceptionRequests(handleUpdater);
  const karakRequests = useKarakRequests(handleUpdater);
  const lidoRequests = useLidoRequests(handleUpdater);
  const mantleRequests = useMantleRequests(handleUpdater);
  const restakeFinanceRequests = useRestakeFinanceRequests(handleUpdater);

  const allHooks = [
    renzoRequests,
    eigenpieRequests,
    kelpDaoRequests,
    etherFiRequests,
    fraxRequests,
    inceptionRequests,
    karakRequests,
    lidoRequests,
    mantleRequests,
    restakeFinanceRequests,
  ];

  return allHooks;
};

export default useUnstakeRequests;
