import type { Token } from '@/types';

export const CHAIN_ID = 42161;
export const arbitrum: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    name: 'ETH',
    symbol: 'ETH',
    icon: '/assets/tokens/eth.png',
    decimals: 18,
    isNative: true,
    address: 'native'
  },
  wusdrv3: {
    chainId: CHAIN_ID,
    address: '0x9483ab65847A447e36d21af1CaB8C87e9712ff93',
    decimals: 9,
    symbol: 'wUSDRv3',
    name: 'Wrapped USDR',
    icon: '/assets/tokens/wusdrv3.webp'
  },
  'usd+': {
    chainId: CHAIN_ID,
    address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
    decimals: 6,
    symbol: 'USD+',
    name: 'USD+',
    icon: '/assets/tokens/usd-plus.png'
  },
  chr: {
    chainId: CHAIN_ID,
    address: '0x15b2fb8f08E4Ac1Ce019EADAe02eE92AeDF06851',
    decimals: 18,
    symbol: 'CHR',
    name: 'CHRONOS',
    icon: '/assets/tokens/chr.png'
  },
  'dai+': {
    chainId: CHAIN_ID,
    address: '0xeb8E93A0c7504Bffd8A8fFa56CD754c63aAeBFe8',
    decimals: 18,
    symbol: 'DAI+',
    name: 'DAI+',
    icon: '/assets/tokens/dai+.png'
  },
  'usdc.e': {
    chainId: CHAIN_ID,
    address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    decimals: 6,
    symbol: 'USDC.e',
    name: 'Bridged USDC',
    icon: '/assets/tokens/usdc.png'
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '/assets/tokens/usdc.png'
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: '/assets/tokens/usdt.png'
  },
  frax: {
    chainId: CHAIN_ID,
    address: '0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F',
    name: 'Frax',
    symbol: 'FRAX',
    icon: '/assets/tokens/frax.webp',
    decimals: 18
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d',
    decimals: 18,
    symbol: 'MAI',
    name: 'Mai Stablecoin',
    icon: '/assets/tokens/mai.png'
  },
  lusd: {
    chainId: CHAIN_ID,
    address: '0x93b346b6BC2548dA6A1E7d98E9a421B42541425b',
    name: 'LUSD Stablecoin',
    symbol: 'LUSD',
    icon: '/assets/tokens/lusd.png',
    decimals: 18
  },
  arb: {
    chainId: CHAIN_ID,
    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    decimals: 18,
    symbol: 'ARB',
    name: 'Arbitrum',
    icon: '/assets/tokens/arb.png'
  },
  fctr: {
    chainId: CHAIN_ID,
    address: '0x6dD963C510c2D2f09d5eDdB48Ede45FeD063Eb36',
    decimals: 18,
    symbol: 'FCTR',
    name: 'Factor',
    icon: '/assets/tokens/fctr.png'
  },
  winr: {
    chainId: CHAIN_ID,
    address: '0xD77B108d4f6cefaa0Cae9506A934e825BEccA46E',
    decimals: 18,
    symbol: 'WINR',
    name: 'WINR',
    icon: '/assets/tokens/winr.png'
  },
  pendle: {
    chainId: CHAIN_ID,
    address: '0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8',
    decimals: 18,
    symbol: 'PENDLE',
    name: 'Pendle',
    icon: '/assets/tokens/pendle.png'
  },
  gmx: {
    chainId: CHAIN_ID,
    address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
    decimals: 18,
    symbol: 'GMX',
    name: 'GMX',
    icon: '/assets/tokens/gmx.png'
  },
  trove: {
    chainId: CHAIN_ID,
    address: '0x982239D38Af50B0168dA33346d85Fb12929c4c07',
    decimals: 18,
    symbol: 'TROVE',
    name: 'Arbitrove Governance Token',
    icon: '/assets/tokens/trove.png'
  },
  'jones dao': {
    chainId: CHAIN_ID,
    address: '0x10393c20975cF177a3513071bC110f7962CD67da',
    decimals: 18,
    symbol: 'JONES',
    name: 'Jones DAO',
    icon: '/assets/tokens/jones-dao.png'
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },
  deus: {
    chainId: CHAIN_ID,
    address: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
    decimals: 18,
    symbol: 'DEUS',
    name: 'DEUS',
    icon: '/assets/tokens/deus.png'
  },
  fba: {
    chainId: CHAIN_ID,
    address: '0x13aABC0a9A5d6865dA8fD0296080E172CF8BB958',
    decimals: 18,
    symbol: 'FBA',
    name: 'Firebird Aggregator',
    icon: '/assets/tokens/fba.png'
  },
  alusd: {
    chainId: CHAIN_ID,
    address: '0xCB8FA9a76b8e203D8C3797bF438d8FB81Ea3326A',
    decimals: 18,
    symbol: 'alUSD',
    name: 'Alchemix USD',
    icon: '/assets/tokens/alusd.webp'
  },
  sparta: {
    chainId: CHAIN_ID,
    address: '0x11F98c7E42A367DaB4f200d2fdc460fb445CE9a8',
    decimals: 18,
    symbol: 'SPARTA',
    name: 'SPARTA',
    icon: '/assets/tokens/sparta.png'
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: '/assets/tokens/wbtc.png'
  },
  gswift: {
    chainId: CHAIN_ID,
    address: '0x580E933D90091b9cE380740E3a4A39c67eB85B4c',
    decimals: 18,
    symbol: 'GSWIFT',
    name: 'GameSwift',
    icon: '/assets/tokens/gswift.png'
  },
  grail: {
    chainId: CHAIN_ID,
    address: '0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8',
    decimals: 18,
    symbol: 'GRAIL',
    name: 'Camelot token',
    icon: '/assets/tokens/grail.png'
  },
  ram: {
    chainId: CHAIN_ID,
    address: '0xAAA6C1E32C55A7Bfa8066A6FAE9b42650F262418',
    decimals: 18,
    symbol: 'RAM',
    name: 'Ramses',
    icon: '/assets/tokens/ram.png'
  },
  'wst-eth': {
    chainId: CHAIN_ID,
    address: '0x5979D7b546E38E414F7E9822514be443A4800529',
    decimals: 18,
    symbol: 'wstETH',
    name: 'Wrapped liquid staked Ether',
    icon: '/assets/tokens/wsteth.png'
  },
  rdnt: {
    chainId: CHAIN_ID,
    address: '0x3082CC23568eA640225c2467653dB90e9250AaA0',
    decimals: 18,
    symbol: 'RDNT',
    name: 'Radiant',
    icon: '/assets/tokens/rdnt.png'
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: '/assets/tokens/dai.png'
  },
  reth: {
    chainId: CHAIN_ID,
    address: '0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8',
    decimals: 18,
    symbol: 'rETH',
    name: 'Rocket Pool ETH',
    icon: '/assets/tokens/reth.png'
  },
  sushi: {
    chainId: CHAIN_ID,
    address: '0xd4d42F0b6DEF4CE0383636770eF773390d85c61A',
    decimals: 18,
    symbol: 'SUSHI',
    name: 'SushiToken',
    icon: '/assets/tokens/sushi.png'
  },
  sliz: {
    chainId: CHAIN_ID,
    address: '0x463913D3a3D3D291667D53B8325c598Eb88D3B0e',
    decimals: 18,
    symbol: 'SLIZ',
    name: 'SolidLizard dex token',
    icon: '/assets/tokens/sliz.png'
  },
  link: {
    chainId: CHAIN_ID,
    address: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
    decimals: 18,
    symbol: 'LINK',
    name: 'ChainLink Token',
    icon: '/assets/tokens/link.png'
  },
  uni: {
    chainId: CHAIN_ID,
    address: '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0',
    decimals: 18,
    symbol: 'UNI',
    name: 'Uniswap',
    icon: '/assets/tokens/uni.png'
  },
  dpx: {
    chainId: CHAIN_ID,
    address: '0x6c2c06790b3e3e3c38e12ee22f8183b37a13ee55',
    decimals: 18,
    symbol: 'DPX',
    name: 'Dopex Governance Token',
    icon: '/assets/tokens/dpx.webp'
  },
  magic: {
    chainId: CHAIN_ID,
    address: '0x539bde0d7dbd336b79148aa742883198bbf60342',
    decimals: 18,
    symbol: 'MAGIC',
    name: 'MAGIC',
    icon: '/assets/tokens/magic.webp'
  },
  sfrxETH: {
    chainId: CHAIN_ID,
    address: '0x95ab45875cffdba1e5f451b950bc2e42c0053f39',
    decimals: 18,
    symbol: 'sfrxETH',
    name: 'Staked Frax Ether',
    icon: '/assets/tokens/sfrxETH.svg'
  },
  wstLINK: {
    chainId: CHAIN_ID,
    address: '0x3106E2e148525b3DB36795b04691D444c24972fB',
    decimals: 18,
    symbol: 'wstLINK',
    name: 'Wrapped stLINK',
    icon: '/assets/tokens/wstLINK.png'
  },
  sfund: {
    chainId: CHAIN_ID,
    address: '0x560363BdA52BC6A44CA6C8c9B4a5FadbDa32fa60',
    decimals: 18,
    symbol: 'SFUND',
    name: 'SeedifyFund',
    icon: '/assets/tokens/sfund.png'
  },
  syk: {
    chainId: CHAIN_ID,
    address: '0xACC51FFDeF63fB0c014c882267C3A17261A5eD50',
    decimals: 18,
    symbol: 'SYK',
    name: 'Stryke Token',
    icon: '/assets/tokens/syk.svg'
  },
  mim: {
    chainId: CHAIN_ID,
    address: '0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A',
    decimals: 18,
    symbol: 'MIM',
    name: 'Magic Internet Money',
    icon: '/assets/tokens/mim.png'
  },
  rseth: {
    address: '0x4186BFC76E2E237523CBC30FD220FE055156b41F',
    chainId: CHAIN_ID,
    symbol: 'rsETH',
    decimals: 18,
    name: 'KelpDao Restaked ETH',
    icon: '/assets/tokens/rseth.svg'
  },
  ethx: {
    chainId: CHAIN_ID,
    address: '0xED65C5085a18Fa160Af0313E60dcc7905E944Dc7',
    decimals: 18,
    symbol: 'ETHx',
    name: 'ETHx',
    icon: '/assets/tokens/ethx.svg'
  },
  zro: {
    chainId: CHAIN_ID,
    address: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
    decimals: 18,
    symbol: 'ZRO',
    name: 'LayerZero',
    icon: '/assets/tokens/zro.webp'
  },
  ezeth: {
    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
    chainId: CHAIN_ID,
    symbol: 'ezETH',
    decimals: 18,
    name: 'Renzo Restaked ETH',
    icon: '/assets/tokens/ezeth.svg'
  },
  'solv-btc': {
    address: '0x3647c54c4c2C65bC7a2D63c0Da2809B399DBBDC0',
    chainId: CHAIN_ID,
    symbol: 'SolvBTC',
    decimals: 18,
    name: 'Solv BTC',
    icon: '/assets/tokens/solv-btc.webp'
  },
  tbtc: {
    chainId: CHAIN_ID,
    address: '0x6c84a8f1c29108F47a79964b5Fe888D4f4D0dE40',
    name: 'Arbitrum tBTC v2',
    decimals: 18,
    symbol: 'tBTC',
    icon: '/assets/tokens/tbtc.webp'
  },
  usde: {
    chainId: CHAIN_ID,
    address: '0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34',
    decimals: 18,
    symbol: 'USDe',
    name: 'USDe',
    icon: '/assets/tokens/usde.svg'
  },
  usdy: {
    chainId: CHAIN_ID,
    address: '0x35e050d3C0eC2d29D269a8EcEa763a183bDF9A9D',
    decimals: 18,
    symbol: 'USDY',
    name: 'Ondo U.S. Dollar Yield',
    icon: '/assets/tokens/usdy.png'
  },
  d2: {
    chainId: CHAIN_ID,
    address: '0xed7f000eE335B8199b004cCA1c6f36d188CF6cb8',
    decimals: 18,
    symbol: 'D2',
    name: 'D2',
    icon: '/assets/tokens/d2.jpg'
  },
  xd2: {
    chainId: CHAIN_ID,
    address: '0x1c17a39B156189BF40905425170a3Ff62fb650DA',
    decimals: 18,
    symbol: 'xD2',
    name: 'xD2',
    icon: '/assets/tokens/xd2.svg'
  },
  'we-eth': {
    address: '0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe',
    chainId: CHAIN_ID,
    symbol: 'weETH',
    decimals: 18,
    name: 'Wrapped eETH',
    icon: '/assets/tokens/weeth.png'
  },
  gUSDC: {
    chainId: CHAIN_ID,
    address: '0x1c17a39B156189BF40905425170a3Ff62fb650DA',
    decimals: 18,
    symbol: 'gUSDC',
    name: 'Gains Network USDC',
    icon: '/assets/tokens/gusdc.png'
  },
  PNP: {
    chainId: CHAIN_ID,
    address: '0x2Ac2B254Bc18cD4999f64773a966E4f4869c34Ee',
    decimals: 18,
    symbol: 'PNP',
    name: 'Penpie Token',
    icon: '/assets/tokens/pnp.jpg'
  },
  PREMIA: {
    chainId: CHAIN_ID,
    address: '0x51fC0f6660482Ea73330E414eFd7808811a57Fa2',
    decimals: 18,
    symbol: 'PREMIA',
    name: 'Premia',
    icon: '/assets/tokens/premia.jpg'
  },
  GNS: {
    chainId: CHAIN_ID,
    address: '0x18c11FD286C5EC11c3b683Caa813B77f5163A122',
    decimals: 18,
    symbol: 'GNS',
    name: 'Gains Network',
    icon: '/assets/tokens/gns.png'
  },
  VRTX: {
    chainId: CHAIN_ID,
    address: '0x95146881b86B3ee99e63705eC87AfE29Fcc044D9',
    decimals: 18,
    symbol: 'VRTX',
    name: 'Vertex',
    icon: '/assets/tokens/vrtx.png'
  },
  sol: {
    chainId: CHAIN_ID,
    address: '0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07',
    decimals: 9,
    symbol: 'SOL',
    name: 'Wrapped SOL',
    icon: '/assets/tokens/sol.svg'
  },
  peas: {
    address: '0x02f92800F57BCD74066F5709F1Daa1A4302Df875',
    chainId: CHAIN_ID,
    symbol: 'PEAS',
    decimals: 18,
    name: 'Peapods',
    icon: '/assets/tokens/peas.webp'
  },
  dmt: {
    address: '0x8B0E6f19Ee57089F7649A455D89D7bC6314D04e8',
    chainId: CHAIN_ID,
    symbol: 'DMT',
    decimals: 18,
    name: 'DMT',
    icon: '/assets/tokens/dmt.png'
  },
  XAI: {
    address: '0x4Cb9a7AE498CEDcBb5EAe9f25736aE7d428C9D66',
    chainId: CHAIN_ID,
    symbol: 'XAI',
    decimals: 18,
    name: 'Xai',
    icon: '/assets/tokens/xai.png'
  },
  USDs: {
    address: '0xD74f5255D557944cf7Dd0E45FF521520002D5748',
    chainId: CHAIN_ID,
    symbol: 'USDs',
    decimals: 18,
    name: 'Sperax USD',
    icon: '/assets/tokens/usds.svg'
  },
  PRY: {
    address: '0x1824a51C106EFC27d35A74efB56d9BF54dDb22d4',
    chainId: CHAIN_ID,
    symbol: 'PRY',
    decimals: 18,
    name: 'Perpy-Token',
    icon: '/assets/tokens/pry.svg'
  },
  APEX: {
    address: '0x61A1ff55C5216b636a294A07D77C6F4Df10d3B56',
    chainId: CHAIN_ID,
    symbol: 'APEX',
    decimals: 18,
    name: 'ApeX Token',
    icon: '/assets/tokens/apex.svg'
  },
  Bonsai: {
    address: '0x79EaD7a012D97eD8DeEcE279f9bC39e264d7Eef9',
    chainId: CHAIN_ID,
    symbol: 'Bonsai',
    decimals: 18,
    name: 'Bonsai',
    icon: '/assets/tokens/bonsai.png'
  },
  RDPX: {
    address: '0x32Eb7902D4134bf98A28b963D26de779AF92A212',
    chainId: CHAIN_ID,
    symbol: 'RDPX',
    decimals: 18,
    name: 'Dopex Rebate Token',
    icon: '/assets/tokens/rdpx.png'
  },
  ETHFI: {
    address: '0x7189fb5B6504bbfF6a852B13B7B82a3c118fDc27',
    chainId: CHAIN_ID,
    symbol: 'ETHFI',
    decimals: 18,
    name: 'ether.fi governance token',
    icon: '/assets/tokens/ethfi.svg'
  },
  uniETH: {
    chainId: CHAIN_ID,
    address: '0x3d15fD46CE9e551498328B1C83071D9509E2C3a0',
    decimals: 18,
    symbol: 'uniETH',
    name: 'Universal ETH',
    icon: '/assets/tokens/uni-eth.png'
  },
  GG: {
    chainId: CHAIN_ID,
    address: '0x000000000026839b3f4181f2cF69336af6153b99',
    decimals: 18,
    symbol: 'GG',
    name: 'GG',
    icon: '/assets/tokens/gg.png'
  },
  RDP: {
    chainId: CHAIN_ID,
    address: '0x54BDBF3cE36f451Ec61493236b8E6213ac87c0f6',
    decimals: 18,
    symbol: 'RDP',
    name: 'Radpie',
    icon: '/assets/tokens/rdp.png'
  },
  MOZ: {
    chainId: CHAIN_ID,
    address: '0x20547341E58fB558637FA15379C92e11F7b7F710',
    decimals: 18,
    symbol: 'MOZ',
    name: 'Mozaic Token',
    icon: '/assets/tokens/moz.png'
  },
  MOON: {
    chainId: CHAIN_ID,
    address: '0x24404DC041d74cd03cFE28855F555559390C931b',
    decimals: 18,
    symbol: 'MOON',
    name: 'Moons',
    icon: '/assets/tokens/moons.png'
  },
  AURY: {
    chainId: CHAIN_ID,
    address: '0x11Bf4f05EB28b802ED3aB672594DEcB20ffe2313',
    decimals: 18,
    symbol: 'AURY',
    name: 'Aury',
    icon: '/assets/tokens/aury.png'
  },
  FLY: {
    chainId: CHAIN_ID,
    address: '0x000F1720A263f96532D1ac2bb9CDC12b72C6f386',
    decimals: 18,
    symbol: 'FLY',
    name: 'Fluidity',
    icon: '/assets/tokens/fly.png'
  },
  flrEUR: {
    chainId: CHAIN_ID,
    address: '0x9B6226dd0191a77d032F56A6d383044EE99944C3',
    decimals: 18,
    symbol: 'flrEUR',
    name: 'Florence Finance flrEUR',
    icon: '/assets/tokens/flr.svg'
  },
  ECLIP: {
    chainId: CHAIN_ID,
    address: '0x93ca0d85837FF83158Cd14D65B169CdB223b1921',
    decimals: 18,
    symbol: 'ECLIP',
    name: 'Eclipse Fi',
    icon: '/assets/tokens/eclip.svg'
  },
  star: {
    address: '0xB299751B088336E165dA313c33e3195B8c6663A6',
    chainId: CHAIN_ID,
    symbol: 'STAR',
    decimals: 18,
    name: 'StarHeroes',
    icon: '/assets/tokens/star.png'
  },
  frxeth: {
    chainId: CHAIN_ID,
    address: '0x178412e79c25968a32e89b11f63B33F733770c2A',
    decimals: 18,
    symbol: 'frxETH',
    name: 'Frax Ether',
    icon: '/assets/tokens/frxeth.webp'
  },
  aleth: {
    chainId: CHAIN_ID,
    address: '0x17573150d67d820542EFb24210371545a4868B03',
    decimals: 18,
    symbol: 'alETH',
    name: 'Alchemix ETH',
    icon: '/assets/tokens/aleth.png'
  },
  osETH: {
    address: '0xf7d4e7273E5015C96728A6b02f31C505eE184603',
    chainId: CHAIN_ID,
    symbol: 'osETH',
    decimals: 18,
    name: 'Staked ETH',
    icon: '/assets/tokens/oseth.webp'
  },
  dola: {
    chainId: CHAIN_ID,
    address: '0x6A7661795C374c0bFC635934efAddFf3A7Ee23b6',
    decimals: 18,
    symbol: 'DOLA',
    name: 'DOLA USD Stablecoin',
    icon: '/assets/tokens/dola.svg'
  },
  abcRAM: {
    address: '0x9EfCFc5b49390FC3fb9B58607D2e89445Bb380BF',
    chainId: CHAIN_ID,
    symbol: 'abcRAM',
    decimals: 18,
    name: 'abcRAM',
    icon: '/assets/tokens/abcRAM.webp'
  },
  USDx: {
    address: '0xb2F30A7C980f052f02563fb518dcc39e6bf38175',
    chainId: CHAIN_ID,
    symbol: 'USDx',
    decimals: 18,
    name: 'Synthetix USD',
    icon: '/assets/tokens/usdx.webp'
  },
  grai: {
    chainId: CHAIN_ID,
    address: '0x894134a25a5faC1c2C26F1d8fBf05111a3CB9487',
    decimals: 18,
    symbol: 'GRAI',
    name: 'Gravita Debt Token',
    icon: '/assets/tokens/grai.svg'
  },
  comp: {
    address: '0x354A6dA3fcde098F8389cad84b0182725c6C91dE',
    chainId: CHAIN_ID,
    symbol: 'COMP',
    decimals: 18,
    name: 'Compound',
    icon: '/assets/tokens/comp.webp'
  },
  ichi: {
    chainId: CHAIN_ID,
    address: '0xadf5DD3E51bF28aB4F07e684eCF5d00691818790',
    decimals: 18,
    symbol: 'ICHI',
    name: 'ICHI',
    icon: '/assets/tokens/ichi.webp'
  },
  EUROs: {
    address: '0x643b34980E635719C15a2D4ce69571a258F940E9',
    chainId: CHAIN_ID,
    symbol: 'EUROs',
    decimals: 18,
    name: 'The Standard EURO',
    icon: '/assets/tokens/euros.webp'
  },
  agEUR: {
    address: '0xFA5Ed56A203466CbBC2430a43c66b9D8723528E7',
    chainId: CHAIN_ID,
    symbol: 'agEUR',
    decimals: 18,
    name: 'agEUR',
    icon: '/assets/tokens/agEUR.webp'
  },
  psm: {
    address: '0x17A8541B82BF67e10B0874284b4Ae66858cb1fd5',
    chainId: CHAIN_ID,
    symbol: 'PSM',
    decimals: 18,
    name: 'Possum',
    icon: '/assets/tokens/psm.webp'
  },
  lqdr: {
    address: '0x816E21c33fa5F8440EBcDF6e01D39314541BEA72',
    chainId: CHAIN_ID,
    symbol: 'Lqdr',
    decimals: 18,
    name: 'LqdrV2',
    icon: '/assets/tokens/lqdr.webp'
  },
  tarot: {
    address: '0x13278cD824D33A7aDB9f0a9A84ACA7C0D2DEEBf7',
    chainId: CHAIN_ID,
    symbol: 'TAROT',
    decimals: 18,
    name: 'Tarot',
    icon: '/assets/tokens/tarot.webp'
  },
  pool: {
    address: '0xCF934E2402A5e072928a39a956964eb8F2B5B79C',
    chainId: CHAIN_ID,
    symbol: 'POOL',
    decimals: 18,
    name: 'PoolTogether',
    icon: '/assets/tokens/pool.webp'
  },
  usdfi: {
    address: '0x249c48e22E95514Ca975De31f473F30c2f3C0916',
    chainId: CHAIN_ID,
    symbol: 'USDFI',
    decimals: 18,
    name: 'USDFI',
    icon: '/assets/tokens/usdfi.webp'
  },
  'fly-wheel': {
    address: '0x018E32f5a78329A28232e99A158879B3bB512cb1',
    chainId: CHAIN_ID,
    symbol: 'FLYWHEEL',
    decimals: 18,
    name: 'FLYWHEEL',
    icon: '/assets/tokens/fly-wheel.webp'
  },
  'solv-btc.bbn': {
    address: '0x346c574C56e1A4aAa8dc88Cda8F7EB12b39947aB',
    chainId: CHAIN_ID,
    symbol: 'SolvBTC.BBN',
    decimals: 18,
    name: 'SolvBTC Babylon',
    icon: '/assets/tokens/solv-btc.bbn.webp'
  },
  'solv-btc.ena': {
    address: '0xaFAfd68AFe3fe65d376eEC9Eab1802616cFacCb8',
    chainId: CHAIN_ID,
    symbol: 'SolvBTC.ENA',
    decimals: 18,
    name: 'SolvBTC Ethena',
    icon: '/assets/tokens/solv-btc.ena.webp'
  },
  odin: {
    address: '0xeE9857dE0e55d4A54D36a5A5a73A15e57435FdCA',
    chainId: CHAIN_ID,
    symbol: 'ODIN',
    decimals: 18,
    name: 'AsgardX',
    icon: '/assets/tokens/odin.webp'
  },
  govi: {
    address: '0x07E49d5dE43DDA6162Fa28D24d5935C151875283',
    chainId: CHAIN_ID,
    symbol: 'GOVI',
    decimals: 18,
    name: 'GOVI',
    icon: '/assets/tokens/govi.webp'
  },
  spell: {
    address: '0x3E6648C5a70A150A88bCE65F4aD4d506Fe15d2AF',
    chainId: CHAIN_ID,
    symbol: 'SPELL',
    decimals: 18,
    name: 'Spell Token',
    icon: '/assets/tokens/spell.webp'
  },
  lon: {
    address: '0x55678cd083fcDC2947a0Df635c93C838C89454A3',
    chainId: CHAIN_ID,
    symbol: 'LON',
    decimals: 18,
    name: 'Tokenlon',
    icon: '/assets/tokens/lon.webp'
  },
  nuon: {
    address: '0xfb9Fed8cB962548A11fE7F6F282949061395c7F5',
    chainId: CHAIN_ID,
    symbol: 'NUON',
    decimals: 18,
    name: 'NUON',
    icon: '/assets/tokens/nuon.webp'
  },
  ydf: {
    address: '0x30dcBa0405004cF124045793E1933C798Af9E66a',
    chainId: CHAIN_ID,
    symbol: 'YDF',
    decimals: 18,
    name: 'Yieldification',
    icon: '/assets/tokens/ydf.webp'
  },
  frm: {
    address: '0x9f6AbbF0Ba6B5bfa27f4deb6597CC6Ec20573FDA',
    chainId: CHAIN_ID,
    symbol: 'FRM',
    decimals: 18,
    name: 'Ferrum Network Token',
    icon: '/assets/tokens/frm.webp'
  },
  ztx: {
    address: '0x1C43D05be7E5b54D506e3DdB6f0305e8A66CD04e',
    chainId: CHAIN_ID,
    symbol: 'ZTX',
    decimals: 18,
    name: 'ZTX',
    icon: '/assets/tokens/ztx.webp'
  },
  jgOHM: {
    address: '0x5375616bB6c52A90439fF96882a986d8FCdCe421',
    chainId: CHAIN_ID,
    symbol: 'jgOHM',
    decimals: 18,
    name: 'Jones gOHM',
    icon: '/assets/tokens/jgOHM.jpg'
  },
  gOHM: {
    address: '0x8D9bA570D6cb60C7e3e0F31343Efe75AB8E65FB1',
    chainId: CHAIN_ID,
    symbol: 'gOHM',
    decimals: 18,
    name: 'Governance OHM',
    icon: '/assets/tokens/gOHM.webp'
  },
  w3n: {
    address: '0xf7693c6fD9a7172D537FA75D133D309501Cbd657',
    chainId: CHAIN_ID,
    symbol: 'W3N',
    decimals: 18,
    name: 'Web3 No Value',
    icon: '/assets/tokens/w3n.webp'
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
  liqd: {
    address: '0x93C15cd7DE26f07265f0272E0b831C5D7fAb174f',
    chainId: CHAIN_ID,
    symbol: 'LIQD',
    decimals: 18,
    name: 'Liquid',
    icon: '/assets/tokens/liqd.webp'
  },
  stc: {
    address: '0x89073B7AaAe498771BDb789360b0D3De9d15aD56',
    chainId: CHAIN_ID,
    symbol: 'STC',
    decimals: 18,
    name: 'TechCat',
    icon: '/assets/tokens/stc.webp'
  },
  beef: {
    address: '0x98c435070c24e5152Fc14D130937A38810c104b9',
    chainId: CHAIN_ID,
    symbol: 'BEEF',
    decimals: 18,
    name: 'Kobe',
    icon: '/assets/tokens/beef.webp'
  },
  sx: {
    address: '0x8CF7e3aa6fAf6Ae180E5eC3f0fb95081C2086eBe',
    chainId: CHAIN_ID,
    symbol: 'SX',
    decimals: 18,
    name: 'SX Network',
    icon: '/assets/tokens/sx.webp'
  },
  dei: {
    address: '0xDE1E704dae0B4051e80DAbB26ab6ad6c12262DA0',
    chainId: CHAIN_ID,
    symbol: 'DEI',
    decimals: 18,
    name: 'DEI',
    icon: '/assets/tokens/dei.webp'
  },
  ibex: {
    address: '0x56659245931CB6920e39C189D2a0e7DD0dA2d57b',
    chainId: CHAIN_ID,
    symbol: 'IBEX',
    decimals: 18,
    name: 'IBEX',
    icon: '/assets/tokens/ibex.svg'
  },
  war: {
    address: '0x1F6E4B5fFc94cCA08cF6BB1479148d6329d4bAF5',
    chainId: CHAIN_ID,
    symbol: 'WAR',
    decimals: 18,
    name: 'WAR',
    icon: '/assets/tokens/war.webp'
  },
  aave: {
    chainId: CHAIN_ID,
    address: '0xba5DdD1f9d7F570dc94a51479a000E3BCE967196',
    decimals: 18,
    symbol: 'AAVE',
    name: 'Aave Token',
    icon: '/assets/tokens/aave.svg'
  }
};
