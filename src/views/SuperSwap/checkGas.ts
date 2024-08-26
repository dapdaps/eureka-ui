import Big from 'big.js';
import { utils } from 'ethers';

const checkGas = ({ rawBalance, gasPrice, gasLimit, value }: any) => {
  const _balance = Big(utils.formatEther(rawBalance)).add(value || 0);
  const gas = Big(utils.formatEther(gasLimit)).mul(utils.formatEther(gasPrice));

  return {
    isGasEnough: _balance.lt(gas),
    gas,
  };
};

export default checkGas;
