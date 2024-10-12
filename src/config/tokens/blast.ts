import type { Token } from '@/types';

const CHAIN_ID = 81457;

export const blast: { [key: string]: Token } = {
  eth: {
    address: 'native',
    isNative: true,
    chainId: CHAIN_ID,
    symbol: 'ETH',
    decimals: 18,
    name: 'Ether',
    icon: '/assets/tokens/eth.png'
  },
  usdb: {
    address: '0x4300000000000000000000000000000000000003',
    chainId: CHAIN_ID,
    symbol: 'USDB',
    decimals: 18,
    name: 'USDB',
    icon: '/assets/tokens/usdb.svg'
  },
  weth: {
    address: '0x4300000000000000000000000000000000000004',
    chainId: CHAIN_ID,
    symbol: 'WETH',
    decimals: 18,
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },
  yes: {
    address: '0x20fe91f17ec9080e3cac2d688b4ecb48c5ac3a9c',
    chainId: CHAIN_ID,
    symbol: 'YES',
    decimals: 18,
    name: 'YES',
    icon: '/assets/tokens/yes.png'
  },
  ezeth: {
    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
    chainId: CHAIN_ID,
    symbol: 'ezETH',
    decimals: 18,
    name: 'Renzo Restaked ETH',
    icon: '/assets/tokens/ezeth.svg'
  },
  oezeth: {
    address: '0x4991b902f397dc16b0bbd21b0057a20b4b357ae2',
    chainId: CHAIN_ID,
    symbol: 'oezETH',
    decimals: 18,
    name: 'Orbit ezETH ',
    icon: '/assets/tokens/ezeth.svg'
  },
  'mwstETH-WPUNKS:20': {
    address: '0x9a50953716bA58e3d6719Ea5c437452ac578705F',
    chainId: CHAIN_ID,
    symbol: 'mwstETH-WPUNKS:20',
    decimals: 18,
    name: 'MetaStreet V2 Deposit: WPUNKS-wstETH:20',
    icon: '/assets/tokens/mwstETH-WPUNKS-20.svg'
  },
  'mwstETH-WPUNKS:40': {
    address: '0x999f220296B5843b2909Cc5f8b4204AacA5341D8',
    chainId: CHAIN_ID,
    symbol: 'mwstETH-WPUNKS:40',
    decimals: 18,
    name: 'MetaStreet V2 Deposit: WPUNKS-wstETH:40',
    icon: '/assets/tokens/mwstETH-WPUNKS-40.svg'
  },
  wrseth: {
    address: '0xe7903B1F75C534Dd8159b313d92cDCfbC62cB3Cd',
    chainId: CHAIN_ID,
    symbol: 'wrsETH',
    decimals: 18,
    name: 'rsETHWrapper',
    icon: '/assets/tokens/wrseth.svg'
  },
  orbit: {
    address: '0x42E12D42b3d6C4A74a88A61063856756Ea2DB357',
    chainId: CHAIN_ID,
    symbol: 'ORBIT',
    decimals: 18,
    name: 'Orbit Protocol',
    icon: '/assets/tokens/orbit.svg'
  },
  axlusdc: {
    address: '0xEB466342C4d449BC9f53A865D5Cb90586f405215',
    chainId: CHAIN_ID,
    symbol: 'axlUSDC',
    decimals: 6,
    name: 'Axelar Wrapped USDC',
    icon: '/assets/tokens/usdc.png'
  },
  juice: {
    address: '0x818a92bc81aad0053d72ba753fb5bc3d0c5c0923',
    chainId: CHAIN_ID,
    symbol: 'JUICE',
    decimals: 18,
    name: 'Juice',
    icon: '/assets/tokens/juice.svg'
  },
  yield: {
    address: '0x67fa2887914fA3729e9EED7630294Fe124f417A0',
    chainId: CHAIN_ID,
    symbol: 'YIELD',
    decimals: 18,
    name: 'Yield Token',
    icon: '/assets/tokens/yield.svg'
  },
  $wai: {
    address: '0x129ed667bf8C065fE5f66c9b44B7cB0126D85cC3',
    chainId: CHAIN_ID,
    symbol: '$WAI',
    decimals: 18,
    name: 'AIWAIFU',
    icon: '/assets/tokens/wai.svg'
  },
  ole: {
    address: '0x73c369f61c90f03eb0dd172e95c90208a28dc5bc',
    chainId: CHAIN_ID,
    symbol: 'OLE',
    decimals: 18,
    name: 'OLE token powering both DistrictOne and OpenLeverage',
    icon: '/assets/tokens/ole.svg',
    priceKey: 'openleverage'
  },
  andy: {
    address: '0xd43d8adac6a4c7d9aeece7c3151fca8f23752cf8',
    chainId: CHAIN_ID,
    symbol: 'ANDY',
    decimals: 9,
    name: 'Andy',
    icon: '/assets/tokens/andy.svg'
  },
  mim: {
    address: '0x76DA31D7C9CbEAE102aff34D3398bC450c8374c1',
    chainId: CHAIN_ID,
    symbol: 'MIM',
    decimals: 18,
    name: 'Magic Internet Money',
    icon: '/assets/tokens/mim.png'
  },
  blste: {
    address: '0x5f49349fB82454d4cA935f3e2e736bD5BE556578',
    chainId: CHAIN_ID,
    symbol: 'BLSTE',
    decimals: 18,
    name: 'BLSTE',
    icon: '/assets/tokens/blste.png'
  },
  musd: {
    address: '0x837fE561e9C5DFa73F607fDa679295DBC2Be5E40',
    chainId: CHAIN_ID,
    symbol: 'MUSD',
    decimals: 18,
    name: 'Monoswap USD',
    icon: '/assets/tokens/musd.png'
  },
  wif: {
    address: '0x2Ef6EE4884892b15DfCF53B33ed139FEF6141A49',
    chainId: CHAIN_ID,
    symbol: 'WIF',
    decimals: 18,
    name: 'Dog Wif Blast',
    icon: '/assets/tokens/wif.jpg'
  },
  xmomo: {
    address: '0x28A922aD2d2A02250473b30F3444E20b138354d1',
    chainId: CHAIN_ID,
    symbol: 'xMONO',
    decimals: 18,
    name: 'xMonoswap',
    icon: '/assets/tokens/xmomo.png'
  },
  wbtc: {
    address: '0xF7bc58b8D8f97ADC129cfC4c9f45Ce3C0E1D2692',
    chainId: CHAIN_ID,
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: '/assets/tokens/wbtc.png'
  },
  dbz: {
    address: '0x5F59EcF360F19444173D120fec7D1FB0c42e0f26',
    chainId: CHAIN_ID,
    symbol: 'DBZ',
    decimals: 18,
    name: 'DragonBall',
    icon: '/assets/tokens/dbz.png'
  },
  omni: {
    address: '0x9e20461bc2c4c980f62f1B279D71734207a6A356',
    chainId: CHAIN_ID,
    symbol: 'OMNI',
    decimals: 18,
    name: 'OmniCat',
    icon: '/assets/tokens/omni.png',
    priceKey: 'omnicat'
  },
  sss: {
    address: '0xfd4D19F9FBb9F730C3C88a21755832BD2455144e',
    chainId: CHAIN_ID,
    symbol: 'SSS',
    decimals: 18,
    name: 'SSS',
    icon: '/assets/tokens/sss.svg'
  },
  weeth: {
    address: '0x04c0599ae5a44757c0af6f9ec3b93da8976c150a',
    chainId: CHAIN_ID,
    symbol: 'weETH',
    decimals: 18,
    name: 'Wrapped eETH',
    icon: '/assets/tokens/weeth.png'
  },
  pac: {
    address: '0x5ffd9ebd27f2fcab044c0f0a26a45cb62fa29c06',
    chainId: CHAIN_ID,
    symbol: 'PAC',
    decimals: 18,
    name: 'PacMoon',
    icon: '/assets/tokens/pac.svg'
  },
  fwweth: {
    address: '0x66714DB8F3397c767d0A602458B5b4E3C0FE7dd1',
    chainId: CHAIN_ID,
    symbol: 'fwWETH',
    decimals: 18,
    name: 'Few Wrapped Wrapped Ether',
    icon: '/assets/tokens/fwweth.svg'
  },
  fwusdb: {
    address: '0x866f2C06B83Df2ed7Ca9C2D044940E7CD55a06d6',
    chainId: CHAIN_ID,
    symbol: 'fwUSDB',
    decimals: 18,
    name: 'Few Wrapped USDB',
    icon: '/assets/tokens/fwusdb.svg'
  },
  ousdb: {
    address: '0x9aECEdCD6A82d26F2f86D331B17a1C1676442A87',
    chainId: CHAIN_ID,
    symbol: 'oUSDB',
    decimals: 18,
    name: 'Orbit USDB',
    icon: '/assets/tokens/ousdb.svg'
  },
  oeth: {
    address: '0x0872b71EFC37CB8DdE22B2118De3d800427fdba0',
    chainId: CHAIN_ID,
    symbol: 'oETH',
    decimals: 18,
    name: 'oEther V2',
    icon: '/assets/tokens/oeth.svg'
  },
  rseth: {
    address: '0x4186bfc76e2e237523cbc30fd220fe055156b41f',
    chainId: CHAIN_ID,
    symbol: 'rsETH',
    decimals: 18,
    name: 'KelpDao Restaked ETH',
    icon: '/assets/tokens/rseth.svg'
  },
  deus: {
    address: '0xDE55B113A27Cc0c5893CAa6Ee1C020b6B46650C0',
    chainId: CHAIN_ID,
    symbol: 'DEUS',
    decimals: 18,
    name: 'DEUS',
    icon: '/assets/tokens/deus.webp'
  },
  pxeth: {
    chainId: CHAIN_ID,
    address: '0x9E0d7D79735e1c63333128149c7b616a0dC0bBDb',
    decimals: 18,
    symbol: 'pxETH',
    name: 'Pirex Ether OFT',
    icon: '/assets/tokens/pxeth.png'
  },
  'usd+': {
    chainId: CHAIN_ID,
    address: '0x4fEE793d435c6D2c10C135983BB9d6D4fC7B9BBd',
    decimals: 18,
    symbol: 'USD+',
    name: 'USD+',
    icon: '/assets/tokens/usd-plus.png'
  },
  blade: {
    chainId: CHAIN_ID,
    address: '0xD1FedD031b92f50a50c05E2C45aF1aDb4CEa82f4',
    decimals: 18,
    symbol: 'BLADE',
    name: 'Blade',
    icon: '/assets/tokens/blade.png'
  },
  've-blade': {
    chainId: CHAIN_ID,
    address: '0xF8f2ab7C84CDB6CCaF1F699eB54Ba30C36B95d85',
    decimals: 18,
    symbol: 'veBLADE',
    name: 'Locked BLADE',
    icon: '/assets/tokens/ve-blade.png'
  },
  aso: {
    chainId: CHAIN_ID,
    address: '0x54E7780089AeE73EF98B8238B0866a517914254e',
    decimals: 18,
    symbol: 'ASO',
    name: 'ASO',
    icon: '/assets/tokens/aso.png'
  },
  mclb: {
    chainId: CHAIN_ID,
    address: '0xc308c807bf32bd26ee249deaaa6e04aba463962d',
    decimals: 18,
    symbol: 'MCLB',
    name: 'MCLB',
    icon: '/assets/tokens/mclb.svg'
  },
  kap: {
    chainId: CHAIN_ID,
    address: '0x15d24de366F69b835Be19f7Cf9447e770315DD80',
    decimals: 18,
    symbol: 'KAP',
    name: 'KAP',
    icon: '/assets/tokens/kap.webp'
  },
  glory: {
    chainId: CHAIN_ID,
    address: '0xd582879453337bd149ae53ec2092b0af5281d1d7',
    decimals: 18,
    symbol: 'GLORY',
    name: 'GLORY',
    icon: '/assets/tokens/glory.svg'
  },
  early: {
    chainId: CHAIN_ID,
    address: '0x7135B32e9903BdB4e19a8b1D22fC2038964B8451',
    decimals: 18,
    symbol: 'EARLY',
    name: 'EARLY',
    icon: '/assets/tokens/early.webp'
  },
  mia: {
    chainId: CHAIN_ID,
    address: '0xA4C7aA67189EC5623121c6C94Ec757DfeD932D4B',
    decimals: 18,
    symbol: 'MIA',
    name: 'Mia',
    icon: '/assets/tokens/mia.svg',
    priceKey: 'mia-2d4b'
  },
  baja: {
    chainId: CHAIN_ID,
    address: '0x5FE8534a6F96cb01261Bd96e98c17C2c1Cab3204',
    decimals: 18,
    symbol: 'BAJA',
    name: 'Baja',
    icon: '/assets/tokens/baja.svg'
  },
  bag: {
    chainId: CHAIN_ID,
    address: '0xb9dfCd4CF589bB8090569cb52FaC1b88Dbe4981F',
    decimals: 18,
    symbol: 'BAG',
    name: 'Bag',
    icon: '/assets/tokens/bag.svg'
  },
  pump: {
    chainId: CHAIN_ID,
    address: '0x216a5a1135a9dab49fa9ad865e0f22fe22b5630a',
    decimals: 18,
    symbol: 'PUMP',
    name: 'PUMP',
    icon: '/assets/tokens/pump.svg'
  },
  dusd: {
    chainId: CHAIN_ID,
    address: '0x1a3d9b2fa5c6522c8c071dc07125ce55df90b253',
    decimals: 18,
    symbol: 'DUSD',
    name: 'DUSD',
    icon: '/assets/tokens/dusd.png'
  },
  deth: {
    chainId: CHAIN_ID,
    address: '0x1Da40C742F32bBEe81694051c0eE07485fC630f6',
    decimals: 18,
    symbol: 'DETH',
    name: 'DETH',
    icon: '/assets/tokens/deth.png'
  },
  fxs: {
    chainId: CHAIN_ID,
    address: '0x23432452b720c80553458496d4d9d7c5003280d0',
    decimals: 18,
    symbol: 'FXS',
    name: 'Frax Shares',
    icon: '/assets/tokens/fxs.svg'
  },
  usdbx: {
    chainId: CHAIN_ID,
    address: '0x836aED3b0E0ee44C77e0b6Db34D170AbCCe9BaAC',
    decimals: 18,
    symbol: 'USDBx',
    name: 'Wand USDBx',
    icon: '/assets/tokens/usdbx.svg'
  },
  upt: {
    chainId: CHAIN_ID,
    address: '0x08e0948E952063a6396a24fc59554aC476bEa66e',
    decimals: 18,
    symbol: 'UPT',
    name: 'Upto3',
    icon: '/assets/tokens/upt.svg'
  },
  nptx: {
    chainId: CHAIN_ID,
    address: '0x75483179a38d21f3608e71bbede5ec1314f0067d',
    decimals: 18,
    symbol: 'NPTX',
    name: 'NeptuneX',
    icon: '/assets/tokens/nptx.svg'
  },
  'mWETH-PPG:10': {
    chainId: CHAIN_ID,
    address: '0x6531ae67098bc73db9179dcbc6f161fcd9fd4c01',
    decimals: 18,
    symbol: 'mWETH-PPG:10',
    name: 'MetaStreet V2 Deposit: PPG-WETH:10',
    icon: '/assets/tokens/mWETH-PPG:10.svg'
  },
  big: {
    chainId: CHAIN_ID,
    address: '0x76d6556758365e63e48a0dfafd19c8dba15f97ee',
    decimals: 18,
    symbol: 'BIG',
    name: 'BIG',
    icon: '/assets/tokens/big.svg'
  },
  ankr: {
    chainId: CHAIN_ID,
    address: '0x3580ac35BED2981d6bDD671a5982c2467d301241',
    decimals: 18,
    symbol: 'ANKR',
    name: 'Ankr Network',
    icon: '/assets/tokens/ankr.svg'
  },
  peace: {
    chainId: CHAIN_ID,
    address: '0x0A4B0263589750E6383e199310Be98E6e2deE258',
    decimals: 18,
    symbol: 'PEACE',
    name: 'WORLD PEACE',
    icon: '/assets/tokens/peace.svg'
  },
  vroom: {
    chainId: CHAIN_ID,
    address: '0x891c9B37177Bdf8Edc891119C9d8aEefDa9A5246',
    decimals: 18,
    symbol: 'VROOM',
    name: 'VROOM',
    icon: '/assets/tokens/vroom.svg'
  },
  swim: {
    chainId: CHAIN_ID,
    address: '0x5D68d64e80F47EFF763B087DeAAe46fF25205674',
    decimals: 18,
    symbol: '$SWIM',
    name: 'SWIM',
    icon: '/assets/tokens/swim.svg'
  },
  alien: {
    chainId: CHAIN_ID,
    address: '0xca84812e477ee5a96a92328689d8ce2589ab6ffd',
    decimals: 18,
    symbol: 'ALIEN',
    name: 'Alien',
    icon: '/assets/tokens/alien.svg'
  },
  'usdc+': {
    chainId: CHAIN_ID,
    address: '0x870a8F46b62B8BDeda4c02530C1750CddF2ED32e',
    decimals: 18,
    symbol: 'USDC+',
    name: 'USDC+',
    icon: '/assets/tokens/usdc-plus.svg'
  },
  bnd: {
    chainId: CHAIN_ID,
    address: '0xd71035849d2fba67533bf50900a3e8b684ac1b42',
    decimals: 18,
    symbol: 'BND',
    name: 'BlastName Dot',
    icon: '/assets/tokens/bnd.svg'
  },
  pacm: {
    chainId: CHAIN_ID,
    address: '0x0b4d0ee29857c3961b380d4ec138ea5814e346b9',
    decimals: 18,
    symbol: '$PACM',
    name: 'P@cman Blastoff',
    icon: '/assets/tokens/pacm.svg'
  },
  usb: {
    chainId: CHAIN_ID,
    address: '0xD86b2B6f1169e4304Be700D6522c3Ff79FF8fB77',
    decimals: 18,
    symbol: 'USB',
    name: 'Wand USB',
    icon: '/assets/tokens/usb.svg'
  },
  wels: {
    chainId: CHAIN_ID,
    address: '0xb3443dd8590ec811726df6909d9bca6d6d4e250e',
    decimals: 18,
    symbol: 'WELS',
    name: 'Wrapped Ethlas Token',
    icon: '/assets/tokens/wels.svg'
  },
  aura: {
    chainId: CHAIN_ID,
    address: '0x1509706a6c66CA549ff0cB464de88231DDBe213B',
    decimals: 18,
    symbol: 'AURA',
    name: 'Aura',
    icon: '/assets/tokens/aura.png'
  },
  bns: {
    chainId: CHAIN_ID,
    address: '0x0c2ffacd70c1d1cb04d4803dea055dd9d4b57601',
    decimals: 18,
    symbol: 'BNS',
    name: 'BlastName Service',
    icon: '/assets/tokens/bns.svg'
  },
  ethx: {
    chainId: CHAIN_ID,
    address: '0xd79d6Fe06F4C2b17291015169d1443f50D0C2838',
    decimals: 18,
    symbol: 'ETHx',
    name: 'Wand ETHx',
    icon: '/assets/tokens/ethx.svg'
  },
  inETH: {
    chainId: CHAIN_ID,
    address: '0x5A7a183B6B44Dc4EC2E3d2eF43F98C5152b1d76d',
    decimals: 18,
    symbol: 'inETH',
    name: 'InceptionLRT restaked ETH',
    icon: '/assets/tokens/inETH.svg'
  },
  zai: {
    chainId: CHAIN_ID,
    address: '0x68449870eea84453044bd430822827e21fd8f101',
    decimals: 18,
    symbol: 'ZAI',
    name: 'ZAIBOT.io',
    icon: '/assets/tokens/zai.svg'
  },
  pstake: {
    chainId: CHAIN_ID,
    address: '0xcbf7b47e9da345812e3bd732e3ee369a7203b5ae',
    decimals: 18,
    symbol: 'PSTAKE',
    name: 'pSTAKE Finance',
    icon: '/assets/tokens/pstake.svg'
  },
  core: {
    chainId: CHAIN_ID,
    address: '0x233b23DE890A8c21F6198D03425a2b986AE05536',
    decimals: 18,
    symbol: 'CORE',
    name: 'Core Markets',
    icon: '/assets/tokens/core.svg'
  },
  ohno: {
    chainId: CHAIN_ID,
    address: '0x000000dAA580e54635a043D2773f2c698593836a',
    decimals: 18,
    symbol: 'OHNO',
    name: 'Oh No',
    icon: '/assets/tokens/ohno.svg'
  },
  bepe: {
    chainId: CHAIN_ID,
    address: '0xb582dc28968c725d2868130752afa0c13ebf9b1a',
    decimals: 18,
    symbol: 'BEPE',
    name: 'Blast Pepe',
    icon: '/assets/tokens/bepe.svg'
  },
  dola: {
    chainId: CHAIN_ID,
    address: '0x8e38179D361402f6a94767757e807146609E9B3d',
    decimals: 18,
    symbol: 'DOLA',
    name: 'DOLA USD Stablecoin',
    icon: '/assets/tokens/dola.svg'
  },
  ghost: {
    chainId: CHAIN_ID,
    address: '0xCC50560827465F25132929711D5b2cf78625d399',
    decimals: 18,
    symbol: 'GHOST',
    name: 'Ghost Coin',
    icon: '/assets/tokens/ghost.svg'
  },
  ankrETH: {
    chainId: CHAIN_ID,
    address: '0x049e6A52e2C9b7814c8178908F3630726c134c92',
    symbol: 'ankrETH',
    decimals: 18,
    name: 'Ankr Staked ETH',
    icon: '/assets/tokens/ankrETH.png'
  },
  sfrax: {
    chainId: CHAIN_ID,
    address: '0xe4796ccb6bb5de2290c417ac337f2b66ca2e770e',
    decimals: 18,
    symbol: 'sFRAX',
    name: 'Staked FRAX',
    icon: '/assets/tokens/sfrax.svg'
  },
  mblastopians: {
    chainId: CHAIN_ID,
    address: '0xc8d8d820f88df3bd48c4f8e95bca3b994b73c699',
    decimals: 18,
    symbol: 'mBLASTOPIANS',
    name: 'mBlastopians',
    icon: '/assets/tokens/mblastopians.svg'
  },
  tes: {
    chainId: CHAIN_ID,
    address: '0x87E154E86Fb691AB8A27116e93Ed8d54e2b8C18C',
    decimals: 18,
    symbol: 'TES',
    name: 'Titan Trading Token',
    icon: '/assets/tokens/tes.svg'
  },
  'mWETH-PPG:5': {
    chainId: CHAIN_ID,
    address: '0x41cF7ea4Ba650191e829A6bD31B9e2049C78D858',
    decimals: 18,
    symbol: 'mWETH-PPG:5',
    name: 'MetaStreet V2 Deposit: PPG-WETH:5',
    icon: '/assets/tokens/mWETH-PPG:5.svg'
  },
  bus: {
    chainId: CHAIN_ID,
    address: '0x472df997a253a8ae94121572d2017a7232705ab2',
    decimals: 18,
    symbol: 'BUS',
    name: 'BUS',
    icon: '/assets/tokens/bus.png'
  },
  sfrxETH: {
    chainId: CHAIN_ID,
    address: '0x1f55a02a049033e3419a8e2975cf3f572f4e6e9a',
    decimals: 18,
    symbol: 'sfrxETH',
    name: 'Staked Frax Ether',
    icon: '/assets/tokens/sfrxETH.svg'
  },
  bwool: {
    chainId: CHAIN_ID,
    address: '0xb5a86030b64afaa75c42c0d28f8d5ce5f9f61401',
    decimals: 18,
    symbol: 'bWOOL',
    name: 'bWOOL',
    icon: '/assets/tokens/bwool.svg'
  },
  sUSDe: {
    chainId: CHAIN_ID,
    address: '0x211cc4dd073734da055fbf44a2b4667d5e5fe5d2',
    decimals: 18,
    symbol: 'sUSDe',
    name: 'Staked USDe',
    icon: '/assets/tokens/sUSDe.svg'
  },
  ese: {
    chainId: CHAIN_ID,
    address: '0x491e6de43b55c8eae702edc263e32339da42f58c',
    decimals: 18,
    symbol: 'ESE',
    name: 'eesee',
    icon: '/assets/tokens/ese.svg'
  },
  bpepe: {
    chainId: CHAIN_ID,
    address: '0xB6e0d8A730C6e5c85c637b1cf7aD6fD07927b965',
    decimals: 18,
    symbol: 'bPEPE',
    name: 'Blastin Pepes',
    icon: '/assets/tokens/bpepe.svg'
  },
  rbx: {
    chainId: CHAIN_ID,
    address: '0x236bb48fcF61ce996B2C8C196a9258c176100c7d',
    decimals: 18,
    symbol: 'RBX',
    name: 'RabbitX',
    icon: '/assets/tokens/rbx.svg'
  },
  usde: {
    chainId: CHAIN_ID,
    address: '0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34',
    decimals: 18,
    symbol: 'USDe',
    name: 'USDe',
    icon: '/assets/tokens/usde.svg'
  },
  ai: {
    chainId: CHAIN_ID,
    address: '0x764933fbAd8f5D04Ccd088602096655c2ED9879F',
    decimals: 18,
    symbol: 'AI',
    name: 'Any Inu',
    icon: '/assets/tokens/ai.svg'
  },
  blast: {
    chainId: CHAIN_ID,
    address: '0xb1a5700fA2358173Fe465e6eA4Ff52E36e88E2ad',
    decimals: 18,
    symbol: 'BLAST',
    name: 'Blast',
    icon: '/assets/tokens/blast.svg'
  },
  // 'we-eth': {
  //   address: '0x04c0599ae5a44757c0af6f9ec3b93da8976c150a',
  //   chainId: CHAIN_ID,
  //   symbol: 'weETH',
  //   decimals: 18,
  //   name: 'Wrapped eETH',
  //   icon: '/assets/tokens/weeth.png'
  // },
  yolo: {
    address: '0xf77dd21c5ce38ac08786BE35Ef1d1DeC1a6a15F3',
    chainId: CHAIN_ID,
    symbol: 'YOLO',
    decimals: 18,
    name: 'YOLO',
    icon: '/assets/tokens/yolo.svg'
  },
  usdz: {
    address: '0x52056ed29fe015f4ba2e3b079d10c0b87f46e8c6',
    chainId: CHAIN_ID,
    symbol: 'USDz',
    decimals: 18,
    name: 'USDz',
    icon: '/assets/tokens/usdz.svg'
  },
  ultraETHs: {
    address: '0xbb4e01b8940e8e2b3a95ced7941969d033786ff7',
    chainId: CHAIN_ID,
    symbol: 'ultraETHs',
    decimals: 18,
    name: 'Affine ultraETHs 2.0',
    icon: '/assets/tokens/ultra-eths.svg'
  },
  pex: {
    address: '0xae57fe379494B30Ec1E085Fb8a87d9C2FdcbcA2a',
    chainId: CHAIN_ID,
    symbol: 'PEX',
    decimals: 18,
    name: 'Phoenix',
    icon: '/assets/tokens/default_icon.png'
  },
  kala: {
    address: '0x2f67f59b3629bf24962290db9ede0cd4127e606d',
    chainId: CHAIN_ID,
    symbol: 'KALA',
    decimals: 18,
    name: 'Kalax',
    icon: '/assets/tokens/kala.png'
  },
  tok: {
    address: '0x232009a705c382046f9ee8c05558d3fbc249949a',
    chainId: CHAIN_ID,
    symbol: 'TOK',
    decimals: 9,
    name: 'TOKAI',
    icon: '/assets/tokens/default_icon.png'
  },
  skeep: {
    address: '0x5B1eBa69DC9F9c09AFE29b27264cCf3183999a47',
    chainId: CHAIN_ID,
    symbol: 'SKEEP',
    decimals: 18,
    name: 'Keep Calm',
    icon: '/assets/tokens/default_icon.png'
  },
  goody: {
    address: '0x2f7acaB1e2cc551D9423E74c0FD625B957d52efD',
    chainId: CHAIN_ID,
    symbol: 'GOODY',
    decimals: 18,
    name: 'Goody',
    icon: '/assets/tokens/default_icon.png'
  },
  hype: {
    address: '0x9FE9991dAF6b9a5d79280F48cbb6827D46DE2EA4',
    chainId: CHAIN_ID,
    symbol: 'HYPE',
    decimals: 18,
    name: 'HyperBlast',
    icon: '/assets/tokens/hype.webp'
  },
  coin: {
    address: '0xb73d8850510f2001FD4655c3bAF98F3dFb00c0CC',
    chainId: CHAIN_ID,
    symbol: 'coin',
    decimals: 18,
    name: 'DJENN',
    icon: '/assets/tokens/default_icon.png'
  },
  trndo: {
    address: '0x9E92C0B2b84DDac571BdE330C4b44096A7c99909',
    chainId: CHAIN_ID,
    symbol: 'TRNDO',
    decimals: 18,
    name: 'Tornado',
    icon: '/assets/tokens/default_icon.png'
  },
  greed: {
    address: '0xe6A062fba3918376500A602c800b1E0307420457',
    chainId: CHAIN_ID,
    symbol: 'GREED',
    decimals: 18,
    name: 'GREED',
    icon: '/assets/tokens/greed.webp'
  },
  gbt: {
    address: '0xBC295dfFD0cBd38747e511545e304615c4a1Dc6E',
    chainId: CHAIN_ID,
    symbol: 'GBT',
    decimals: 18,
    name: 'GBT',
    icon: '/assets/tokens/default_icon.png'
  },
  dam: {
    address: '0xdC60C24de182b07CB3f3A9269F120d8c15c4b381',
    chainId: CHAIN_ID,
    symbol: 'DAM',
    decimals: 18,
    name: 'Digital Art Movement',
    icon: '/assets/tokens/default_icon.png'
  },
  nogold: {
    address: '0xcDbe12611F18B43098202d45928c905b34736C06',
    chainId: CHAIN_ID,
    symbol: 'NOGOLD',
    decimals: 18,
    name: 'NOGOLD',
    icon: '/assets/tokens/default_icon.png'
  },
  ring: {
    address: '0x25F233C3E3676f9e900a89644a3FE5404d643c84',
    chainId: CHAIN_ID,
    symbol: 'RING',
    decimals: 18,
    name: 'Ring Governance Token',
    icon: '/assets/tokens/ring.svg'
  },
  long: {
    address: '0xbDFd771208c7A0fC128AE538e1c4BcA9A354Ec4E',
    chainId: CHAIN_ID,
    symbol: 'LONG',
    decimals: 18,
    name: 'Long Token',
    icon: '/assets/tokens/long.jpg'
  },
  up: {
    address: '0x2D4B554c0596C7B77EAEDF3e732Ce93Ba968b23d',
    chainId: CHAIN_ID,
    symbol: 'UP',
    decimals: 18,
    name: 'UP',
    icon: '/assets/tokens/up.svg'
  },
  flap: {
    address: '0x40fF8458f802Cc057edccDC143Cf701C828f7308',
    chainId: CHAIN_ID,
    symbol: 'FLAP',
    decimals: 18,
    name: 'Flappy Blast',
    icon: '/assets/tokens/flap.png'
  },
  $hoge: {
    address: '0x548A6fE792015DD2A7827659D3Feb8Cf88cf1C79',
    chainId: CHAIN_ID,
    symbol: '$HOGE',
    decimals: 18,
    name: 'BlastHoge',
    icon: '/assets/tokens/hoge.webp'
  },
  preon: {
    address: '0x135f9B3D5DEC9D73C042Cf380AdFFF95f4Fe9E35',
    chainId: CHAIN_ID,
    symbol: 'PREON',
    decimals: 18,
    name: 'PREON',
    icon: '/assets/tokens/preon.svg'
  },
  star: {
    address: '0xC19669A405067927865B40Ea045a2baabbbe57f5',
    chainId: CHAIN_ID,
    symbol: 'STAR',
    decimals: 18,
    name: 'STAR',
    icon: '/assets/tokens/star.svg'
  },
  ibex: {
    address: '0x9f04B6CEfd5BCd67d76aB708F17553Ce40188e6A',
    chainId: CHAIN_ID,
    symbol: 'IBEX',
    decimals: 18,
    name: 'IBEX',
    icon: '/assets/tokens/ibex.svg'
  },
  fdao: {
    address: '0x3B0cFFdA9a5aB64135C227638e777cEec0C243A8',
    chainId: CHAIN_ID,
    symbol: 'fDAO',
    decimals: 18,
    name: 'Fang Dao',
    icon: '/assets/tokens/fdao.svg'
  }
};
