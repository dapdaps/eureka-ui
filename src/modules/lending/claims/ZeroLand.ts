import { ethers } from 'ethers';

const ZeroLandClaim = (props: any) => {
  const { account, loading, provider, markets, rewardAddress, onSuccess, onError } = props;

  if (!loading || !rewardAddress) return '';

  const arr = markets
    .map((item: any) => [
      item.aTokenAddress,
      // item.stableDebtTokenAddress,
      item.variableDebtTokenAddress
    ])
    .flat();
  const addrs = [...new Set(arr)];

  const claimProvider = new ethers.Contract(
    rewardAddress,
    [
      {
        inputs: [
          { internalType: 'address[]', name: 'assets', type: 'address[]' },
          { internalType: 'address', name: 'to', type: 'address' }
        ],
        name: 'claimAllRewards',
        outputs: [
          {
            internalType: 'address[]',
            name: 'rewardsList',
            type: 'address[]'
          },
          {
            internalType: 'uint256[]',
            name: 'claimedAmounts',
            type: 'uint256[]'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ],
    provider.getSigner()
  );

  claimProvider
    .claimAllRewards(addrs, account)
    .then((tx: any) => {
      tx.wait().then((res: any) => {
        onSuccess(res);
      });
    })
    .catch((err: any) => {
      onError(err);
    });
};

export default ZeroLandClaim;
