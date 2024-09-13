// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];
export function useGetTokenBalance(props) {
  const { tokenAddress, owner, updateTokenBalance, place, provider } = props;
  function getTokenBalance(_tokenAddress, _owner) {
    const TokenContract = new ethers.Contract(_tokenAddress, ABI, provider);
    TokenContract.balanceOf(_owner)
      .then((balanceRaw) => {
        console.log('BALANCE:', _tokenAddress, balanceRaw.toString());
        TokenContract.decimals().then((decimals) => {
          const bal = Big(ethers.utils.formatUnits(balanceRaw, decimals)).toFixed();

          updateTokenBalance(bal);
        });
      })
      .catch((err) => {
        console.info('getTokenBal_error:', err);
      });
  }

  // if you need fresh the balance,you only need fresh the render func.
  useEffect(() => {
    if (tokenAddress && owner) {
      getTokenBalance(tokenAddress, owner);
    }
  }, [tokenAddress, owner]);
}
