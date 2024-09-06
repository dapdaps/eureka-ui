import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

import useAccount from '@/hooks/useAccount';

const CompoundV3CheckAllowance = (props: Props) => {
  const { account, spender, token, toast, onLoad, chainId, onApprovedSuccess } = props;

  const { provider } = useAccount();

  const checkAllowance = (amount: any, cb: any) => {
    const TokenContract = new ethers.Contract(
      token.address,
      [
        {
          constant: true,
          inputs: [
            {
              name: '_owner',
              type: 'address'
            },
            {
              name: '_spender',
              type: 'address'
            }
          ],
          name: 'allowance',
          outputs: [
            {
              name: '',
              type: 'uint256'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ],
      provider.getSigner()
    );
    TokenContract.allowance(account, spender).then((allowanceRaw: any) => {
      cb(
        !allowanceRaw.lt(Big(amount).mul(Big(10).pow(token.decimals)).toFixed(0))
      );
    });
  };

  const handleApprove = (amount: any, onSuccess: any, onError: any) => {
    const toastId = toast?.loading({
      title: `Approve ${token.symbol}`
    });

    const TokenContract = new ethers.Contract(
      token.address,
      [
        {
          constant: false,
          inputs: [
            {
              name: '_spender',
              type: 'address'
            },
            {
              name: '_value',
              type: 'uint256'
            }
          ],
          name: 'approve',
          outputs: [
            {
              name: '',
              type: 'bool'
            }
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      provider.getSigner()
    );
    TokenContract.approve(
      spender,
      ethers.utils.parseUnits(
        Big(amount).toFixed(token.decimals).toString(),
        token.decimals
      )
    )
      .then((tx: any) => {
        tx.wait().then((res: any) => {
          const { status, transactionHash } = res;
          toast?.dismiss(toastId);
          if (status !== 1) throw new Error('');
          onSuccess();
          toast?.success({
            title: 'Approve Successfully!',
            // text: `Approved ${amount} ${token.symbol}`,
            tx: transactionHash,
            chainId
          });
          onApprovedSuccess?.();
        });
      })
      .catch((err: any) => {
        onError();
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Approve Failed!',
          text: err?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : null
        });
      });
  };

  useEffect(() => {
    onLoad({
      checkAllowance,
      handleApprove
    });
  }, []);

  return null;
};

export default CompoundV3CheckAllowance;

export interface Props {
  account: string;
  spender: any;
  token: any;
  toast: any;
  onLoad: any;
  chainId: any;
  amount: any;

  onApprovedSuccess?(): void;
}
