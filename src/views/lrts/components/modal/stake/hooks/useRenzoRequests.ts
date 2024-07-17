import { useCallback, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import useAddAction from '@/hooks/useAddAction';

type Record = {
  amount: number;
  token0: any;
  token1: any;
  txId?: string;
  startTime: string;
  status: 'In Progress' | 'Claimable';
  data: any;
};

export default function useRenzoRequests() {
  const { account } = useAccount();
  const [requests, setRequests] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const toast = useToast();
  const { addAction } = useAddAction('lrts');

  const queryRequests = useCallback(async () => {
    setLoading(true);
    try {
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [account]);

  const claim = useCallback(
    async (record: any) => {
      setClaiming(true);
      let toastId = toast.loading({ title: 'Confirming...' });
      try {
        setClaiming(false);
      } catch (err: any) {
        toast.dismiss(toastId);
        toast.fail({
          title: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `Claim faily!`,
        });
        setClaiming(false);
      }
    },
    [account],
  );

  return {
    requests,
    loading,
    claiming,
    queryRequests,
    claim,
  };
}
