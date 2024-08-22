import Big from 'big.js';
import { Contract } from 'ethers';

const getWrapOrUnwrapTx = async ({ signer, wethAddress, amount, type }: any) => {
  const WethContract = new Contract(
    wethAddress,
    [
      {
        constant: false,
        inputs: [],
        name: 'deposit',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ internalType: 'uint256', name: 'wad', type: 'uint256' }],
        name: 'withdraw',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    signer,
  );

  const method = type === 1 ? 'deposit' : 'withdraw';
  const value = type === 1 ? amount : '0';

  const params = type === 1 ? [] : [amount];

  let estimateGas: any = 300000;

  try {
    estimateGas = await WethContract.estimateGas[method](...params, { value });
  } catch (err) {}

  const txn = await WethContract.populateTransaction[method](...params, {
    value,
    gasLimit: estimateGas ? Big(estimateGas.toString()).mul(1.2).toFixed(0) : 5000000,
  });

  return { txn, gasLimit: estimateGas };
};

export default getWrapOrUnwrapTx;
