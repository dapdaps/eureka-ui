import ThrusterLiquidity from '@/config/pool/dapps/thruster-liquidity';
import { blast } from '@/config/tokens/blast';

const basic = {
  name: 'Thruster Finance',
  logo: '/assets/dapps/thruster-finance.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  81457: {
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb']
    },
    tokens: [
      blast['eth'],
      blast['usdb'],
      blast['weth'],
      blast['we-eth'],
      blast['blast'],
      blast['yes'],
      blast['ezeth'],
      blast['sUSDe'],
      blast['mwstETH-WPUNKS:20'],
      blast['mwstETH-WPUNKS:40'],
      blast['wrseth'],
      blast['orbit'],
      blast['axlusdc'],
      blast['usde'],
      blast['baja'],
      blast['andy'],
      blast['yield'],
      blast['kap'],
      blast['early'],
      blast['sss'],
      blast['juice'],
      blast['wbtc'],
      blast['yolo'],
      blast['bpepe'],
      blast['sfrxETH'],
      blast['ole'],
      blast['ultraETHs'],
      blast['alien'],
      blast['glory'],
      blast['pex'],
      blast['kala'],
      blast['bag'],
      blast['pxeth'],
      blast['ese'],
      blast['bepe'],
      blast['bus'],
      blast['ghost'],
      blast['peace'],
      blast['pump'],
      blast['nptx'],
      blast['ohno'],
      blast['skeep'],
      blast['upt'],
      blast['hype'],
      blast['usb'],
      blast['pac'],
      blast['bwool'],
      blast['goody'],
      blast['usd+'],
      blast['coin'],
      blast['trndo'],
      blast['greed'],
      blast['gbt'],
      blast['dam'],
      blast['nogold']
    ]
  }
};
// fix#DAP-862 merge the Dex and Pool for Thruster
const { contracts, tokens, fees, defaultFee } = ThrusterLiquidity;

export { basic, networks, contracts, tokens, fees, defaultFee };
