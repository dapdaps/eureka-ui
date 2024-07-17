// import { ethereum } from '@/config/tokens/ethereum';

import BaseComponent from '../components/base-component';
import useLido from '../hooks/useLido';

const stETH_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_referral',
        type: 'address',
      },
    ],
    name: 'submit',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'nonces',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const WITHDRAWAL_QUEUE = '0x889edC2eDab5f40e902b864aD4d7AdE8E412F9B1';
const WITHDRAWAL_QUEUE_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: '_amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct WithdrawalQueue.PermitInput',
        name: '_permit',
        type: 'tuple',
      },
    ],
    name: 'requestWithdrawalsWithPermit',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'requestIds',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const Lido = function ({ dapp, setShow, token0, token1, addAction, handleChangeActionType, chainId }: any) {
  const {
    data,
    inAmount,
    outAmount,
    isLoading,
    approved,
    approving,
    leastAmount,
    inToken,
    outToken,
    isInSufficient,
    handleApprove,
    handleAmountChange,
    handleStake,
    handleAddMetaMask,
  } = useLido({
    dapp,
    token0,
    token1,
    addAction,
    chainId
  })
  return (
    <BaseComponent
      componentProps={{
        data,
        setShow,
        inAmount,
        outAmount,
        isLoading,
        approved,
        approving,
        leastAmount,
        actionType,
        inToken,
        outToken,
        isInSufficient,
        handleApprove,
        handleAmountChange,
        handleStake,
        handleAddMetaMask,
      }}
    />
  );
};
export default Lido;
