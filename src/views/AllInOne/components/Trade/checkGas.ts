import { utils } from 'ethers';
import Big from 'big.js';

const checkGas = ({ rawBalance, gasPrice, gasLimit, value }: any) => {
  const _balance = Big(utils.formatEther(rawBalance)).add(value || 0);
  const gas = Big(gasLimit).mul(gasPrice);

  return {
    isGasEnough: _balance.lt(gas),
    gas,
  };
};

export default checkGas;
