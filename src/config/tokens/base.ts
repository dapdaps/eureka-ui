import type { Token } from '@/types';

export const CHAIN_ID = 8453;
export const base: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    address: 'native',
    name: 'ETH',
    symbol: 'ETH',
    icon: '/assets/tokens/eth.png',
    decimals: 18,
    isNative: true
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    name: 'USDC',
    symbol: 'USDC',
    icon: '/assets/tokens/usdc.png',
    decimals: 6
  },
  cbeth: {
    chainId: CHAIN_ID,
    address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
    decimals: 18,
    symbol: 'cbETH',
    name: 'Coinbase Wrapped Staked ETH',
    icon: '/assets/tokens/cbeth.svg'
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },
  wsteth: {
    chainId: CHAIN_ID,
    address: '0xc1cba3fcea344f92d9239c08c0568f6f2f0ee452',
    decimals: 18,
    symbol: 'wstETH',
    name: 'Wrapped liquid staked Ether 2.0',
    icon: '/assets/tokens/wsteth.png'
  },
  axlusdc: {
    chainId: CHAIN_ID,
    address: '0xEB466342C4d449BC9f53A865D5Cb90586f405215',
    decimals: 6,
    symbol: 'axlUSDC',
    name: 'Axelar Wrapped USDC',
    icon: '/assets/tokens/usdc.png'
  },
  bswap: {
    chainId: CHAIN_ID,
    address: '0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9',
    decimals: 18,
    symbol: 'BSWAP',
    name: 'Baseswap Token',
    icon: '/assets/tokens/bswap.png'
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: '/assets/tokens/dai.png'
  },
  usdbc: {
    chainId: CHAIN_ID,
    address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
    decimals: 6,
    symbol: 'USDbC',
    name: 'USD Base Coin',
    icon: '/assets/tokens/usdbc.svg'
  },
  rckt: {
    chainId: CHAIN_ID,
    address: '0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09',
    decimals: 18,
    symbol: 'RCKT',
    name: 'RocketSwap',
    icon: '/assets/tokens/rckt.png'
  },
  bald: {
    chainId: CHAIN_ID,
    address: '0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8',
    decimals: 18,
    symbol: 'BALD',
    name: 'Bald',
    icon: '/assets/tokens/bald.png'
  },
  base: {
    chainId: CHAIN_ID,
    address: '0xd07379a755A8f11B57610154861D694b2A0f615a',
    decimals: 18,
    symbol: 'BASE',
    name: 'BASE Token',
    icon: '/assets/tokens/base.png'
  },
  synth: {
    chainId: CHAIN_ID,
    address: '0xbd2DBb8eceA9743CA5B16423b4eAa26bDcfE5eD2',
    decimals: 18,
    symbol: 'SYNTH',
    name: 'Synth Token',
    icon: '/assets/tokens/synth.png'
  },
  hzn: {
    chainId: CHAIN_ID,
    address: '0x081AD949deFe648774C3B8deBe0E4F28a80716dc',
    decimals: 18,
    symbol: 'HZN',
    name: 'Horizon',
    icon: '/assets/tokens/hzn.webp'
  },
  aero: {
    chainId: CHAIN_ID,
    address: '0x940181a94a35a4569e4529a3cdfb74e38fd98631',
    decimals: 18,
    symbol: 'AERO',
    name: 'Aerodrome',
    icon: '/assets/tokens/aero.svg'
  },
  bvm: {
    chainId: CHAIN_ID,
    address: '0xd386a121991E51Eab5e3433Bf5B1cF4C8884b47a',
    decimals: 18,
    symbol: 'BVM',
    name: 'BasedVelocimeter',
    icon: '/assets/tokens/bvm.webp'
  },
  bmx: {
    chainId: CHAIN_ID,
    address: '0x548f93779fBC992010C07467cBaf329DD5F059B7',
    decimals: 18,
    symbol: 'BMX',
    name: 'BMX',
    icon: '/assets/tokens/bmx.webp'
  },
  seam: {
    chainId: CHAIN_ID,
    address: '0x1c7a460413dd4e964f96d8dfc56e7223ce88cd85',
    decimals: 18,
    symbol: 'SEAM',
    name: 'Seamless',
    icon: '/assets/tokens/seam.svg'
  },
  esseam: {
    chainId: CHAIN_ID,
    address: '0x998e44232bef4f8b033e5a5175bdc97f2b10d5e5',
    decimals: 18,
    symbol: 'esSEAM',
    name: 'Escrow SEAM',
    icon: '/assets/tokens/seam.svg'
  },
  reth: {
    chainId: CHAIN_ID,
    address: '0xb6fe221fe9eef5aba221c348ba20a1bf5e73624c',
    decimals: 18,
    symbol: 'rETH',
    name: 'Rocket Pool ETH',
    icon: '/assets/tokens/reth.png'
  },
  aura: {
    chainId: CHAIN_ID,
    address: '0x1509706a6c66ca549ff0cb464de88231ddbe213b',
    name: 'Aura',
    decimals: 18,
    symbol: 'AURA',
    icon: '/assets/tokens/aura.png'
  },
  weeth: {
    chainId: CHAIN_ID,
    address: '0x04c0599ae5a44757c0af6f9ec3b93da8976c150a',
    name: 'Wrapped eETH',
    decimals: 18,
    symbol: 'weETH',
    icon: '/assets/tokens/aura.png'
  },
  ezeth: {
    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
    chainId: CHAIN_ID,
    symbol: 'ezETH',
    decimals: 18,
    name: 'Renzo Restaked ETH',
    icon: '/assets/tokens/ezeth.svg'
  },
  wrseth: {
    chainId: CHAIN_ID,
    address: '0xEDfa23602D0EC14714057867A78d01e94176BEA0',
    decimals: 18,
    symbol: 'wrsETH',
    name: 'rsETHWrapper',
    icon: '/assets/tokens/wrseth.svg'
  },
  olas: {
    chainId: CHAIN_ID,
    address: '0x54330d28ca3357f294334bdc454a032e7f353416',
    name: 'Autonolas',
    decimals: 18,
    symbol: 'OLAS',
    icon: '/assets/tokens/olas.svg'
  },
  axlbal: {
    chainId: CHAIN_ID,
    address: '0x11c1879227d463b60db18c17c20ae739ae8e961a',
    name: 'Axelar Wrapped BAL',
    decimals: 18,
    symbol: 'axlBAL',
    icon: '/assets/tokens/axlbal.svg'
  },
  bal: {
    chainId: CHAIN_ID,
    address: '0x4158734d47fc9692176b5085e0f52ee0da5d47f1',
    name: 'Balancer',
    decimals: 18,
    symbol: 'BAL',
    icon: '/assets/tokens/bal.png'
  },
  tbtc: {
    chainId: CHAIN_ID,
    address: '0x236aa50979d5f3de3bd1eeb40e81137f22ab794b',
    name: 'Polygon tBTC v2',
    decimals: 18,
    symbol: 'tBTC',
    icon: '/assets/tokens/tbtc.webp'
  },
  cbbtc: {
    chainId: CHAIN_ID,
    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
    name: 'Coinbase Wrapped BTC',
    decimals: 8,
    symbol: 'cbBTC',
    icon: '/assets/tokens/cbbtc.png'
  },
  tag: {
    chainId: CHAIN_ID,
    address: '0x7905ea12cc81a215a5f1d0f46df73a53e19e9264',
    name: 'TagTech',
    decimals: 18,
    symbol: 'TAG',
    icon: '/assets/tokens/tag.png'
  },
  brett: {
    chainId: CHAIN_ID,
    address: '0x532f27101965dd16442E59d40670FaF5eBB142E4',
    name: 'Brett',
    decimals: 18,
    symbol: 'BRETT',
    icon: '/assets/tokens/brett.webp'
  },
  krav: {
    chainId: CHAIN_ID,
    address: '0xbE3111856e4acA828593274eA6872f27968C8DD6',
    name: 'KRAV',
    decimals: 18,
    symbol: 'KRAV',
    icon: '/assets/tokens/krav.webp'
  },
  normie: {
    chainId: CHAIN_ID,
    address: '0x47b464eDB8Dc9BC67b5CD4C9310BB87b773845bD',
    name: 'Normie',
    decimals: 9,
    symbol: 'NORMIE',
    icon: '/assets/tokens/normie.webp'
  },
  andy: {
    address: '0x18A8BD1fe17A1BB9FFB39eCD83E9489cfD17a022',
    chainId: CHAIN_ID,
    symbol: 'ANDY',
    decimals: 18,
    name: 'Andy',
    icon: '/assets/tokens/andy.webp'
  },
  tybg: {
    address: '0x0d97F261b1e88845184f678e2d1e7a98D9FD38dE',
    chainId: CHAIN_ID,
    symbol: 'TYBG',
    decimals: 18,
    name: 'Base God',
    icon: '/assets/tokens/basegod.png'
  },
  kibble: {
    address: '0x64cc19A52f4D631eF5BE07947CABA14aE00c52Eb',
    chainId: CHAIN_ID,
    symbol: 'KIBBLE',
    decimals: 18,
    name: 'Kibble',
    icon: '/assets/tokens/kibble.webp'
  },
  toby: {
    address: '0xb8D98a102b0079B69FFbc760C8d857A31653e56e',
    chainId: CHAIN_ID,
    symbol: 'toby',
    decimals: 18,
    name: 'toby',
    icon: '/assets/tokens/toby.webp'
  },
  coin: {
    address: '0xd022723A5005f53C95B51D1822f42B1A3366EE4D',
    chainId: CHAIN_ID,
    symbol: 'COIN',
    decimals: 18,
    name: 'COIN',
    icon: '/assets/tokens/coin.webp'
  },
  ayb: {
    address: '0x7ED613AB8b2b4c6A781DDC97eA98a666c6437511',
    chainId: CHAIN_ID,
    symbol: 'AYB',
    decimals: 18,
    name: 'All Your Base',
    icon: '/assets/tokens/ayb.webp'
  },
  gmr: {
    address: '0xa617c0c739845B2941BD8eDD05c9F993EcC97C18',
    chainId: CHAIN_ID,
    symbol: 'GMR',
    decimals: 18,
    name: 'GAMER',
    icon: '/assets/tokens/gmr.webp'
  },
  fella: {
    address: '0x122A3f185655847980639E8EdF0F0f66cd91C5fE',
    chainId: CHAIN_ID,
    symbol: 'FELLA',
    decimals: 18,
    name: 'FELLA',
    icon: '/assets/tokens/fella.webp'
  },
  'usd-z': {
    address: '0x04d5ddf5f3a8939889f11e97f8c4bb48317f1938',
    chainId: CHAIN_ID,
    symbol: 'USDz',
    decimals: 18,
    name: 'USDz',
    icon: '/assets/tokens/usdz.svg'
  },
  ovn: {
    address: '0xA3d1a8DEB97B111454B294E2324EfAD13a9d8396',
    chainId: CHAIN_ID,
    symbol: 'OVN',
    decimals: 18,
    name: 'OVN',
    icon: '/assets/tokens/ovn.svg'
  },
  'usd+': {
    chainId: CHAIN_ID,
    address: '0xb79dd08ea68a908a97220c76d19a6aa9cbde4376',
    decimals: 6,
    symbol: 'USD+',
    name: 'USD+',
    icon: '/assets/tokens/usd-plus.png'
  },
  'usdc+': {
    chainId: CHAIN_ID,
    address: '0x85483696cc9970ad9edd786b2c5ef735f38d156f',
    decimals: 6,
    symbol: 'USDC+',
    name: 'USDC+',
    icon: '/assets/tokens/usdc-plus.svg'
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0xfde4c96c8593536e31f229ea8f37b2ada2699bb2',
    symbol: 'USDT',
    decimals: 6,
    name: 'Tether USD',
    icon: '/assets/tokens/usdt.png'
  },
  dola: {
    chainId: CHAIN_ID,
    address: '0x4621b7a9c75199271f773ebd9a499dbd165c3191',
    decimals: 18,
    symbol: 'DOLA',
    name: 'DOLA USD Stablecoin',
    icon: '/assets/tokens/dola.svg'
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0xbf1aea8670d2528e08334083616dd9c5f3b087ae',
    decimals: 18,
    symbol: 'MAI',
    name: 'Mai Stablecoin',
    icon: '/assets/tokens/mai.png'
  },
  bsx: {
    chainId: CHAIN_ID,
    address: '0xd5046B976188EB40f6DE40fB527F89c05b323385',
    decimals: 18,
    symbol: 'BSX',
    name: 'BaseX',
    icon: '/assets/tokens/bsx.png'
  },
  higher: {
    chainId: CHAIN_ID,
    address: '0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe',
    decimals: 18,
    symbol: 'HIGHER',
    name: 'higher',
    icon: '/assets/tokens/higher.webp'
  },
  eurc: {
    chainId: CHAIN_ID,
    address: '0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42',
    decimals: 18,
    symbol: 'EURC',
    name: 'EURC',
    icon: '/assets/tokens/eurc.svg'
  },
  fbomb: {
    chainId: CHAIN_ID,
    address: '0x74ccbe53F77b08632ce0CB91D3A545bF6B8E0979',
    decimals: 18,
    symbol: 'fBOMB',
    name: 'Fantom Bomb',
    icon: '/assets/tokens/fbomb.webp'
  },
  klima: {
    chainId: CHAIN_ID,
    address: '0xDCEFd8C8fCc492630B943ABcaB3429F12Ea9Fea2',
    decimals: 9,
    symbol: 'KLIMA',
    name: 'Klima DAO',
    icon: '/assets/tokens/klima.webp'
  },
  rdnt: {
    chainId: CHAIN_ID,
    address: '0xd722E55C1d9D9fA0021A5215Cbb904b92B3dC5d4',
    decimals: 18,
    symbol: 'RDNT',
    name: 'Radiant',
    icon: '/assets/tokens/rdnt.png'
  },
  well: {
    chainId: CHAIN_ID,
    address: '0xA88594D404727625A9437C3f886C7643872296AE',
    decimals: 18,
    symbol: 'WELL',
    name: 'WELL',
    icon: '/assets/tokens/well.svg'
  },
  'bsd-eth': {
    chainId: CHAIN_ID,
    address: '0xCb327b99fF831bF8223cCEd12B1338FF3aA322Ff',
    decimals: 18,
    symbol: 'bsdETH',
    name: 'Based ETH',
    icon: '/assets/tokens/bsd-eth.svg'
  },
  'hy-usd': {
    chainId: CHAIN_ID,
    address: '0xCc7FF230365bD730eE4B352cC2492CEdAC49383e',
    decimals: 18,
    symbol: 'hyUSD',
    name: 'High Yield USD',
    icon: '/assets/tokens/hy-usd.svg'
  },
  'e-usd': {
    chainId: CHAIN_ID,
    address: '0xCfA3Ef56d303AE4fAabA0592388F19d7C3399FB4',
    decimals: 18,
    symbol: 'eUSD',
    name: 'Electronic Dollar',
    icon: '/assets/tokens/e-usd.svg'
  },
  tarot: {
    address: '0xf544251d25f3d243a36b07e7e7962a678f952691',
    chainId: CHAIN_ID,
    symbol: 'TAROT',
    decimals: 18,
    name: 'Tarot',
    icon: '/assets/tokens/tarot.webp'
  },
  gold: {
    address: '0xbeFD5C25A59ef2C1316c5A4944931171F30Cd3E4',
    chainId: CHAIN_ID,
    symbol: 'GOLD',
    decimals: 18,
    name: 'GoldenBoys',
    icon: '/assets/tokens/gold.png'
  },
  kabosu: {
    address: '0x9e949461f9ec22c6032ce26ea509824fd2f6d98f',
    chainId: CHAIN_ID,
    symbol: 'KABOSUCHAN',
    decimals: 18,
    name: 'KABOSU',
    icon: '/assets/tokens/kabosu.png'
  },
  dog: {
    address: '0xAfb89a09D82FBDE58f18Ac6437B3fC81724e4dF6',
    chainId: CHAIN_ID,
    symbol: 'DOG',
    decimals: 18,
    name: 'The Doge NFT',
    icon: '/assets/tokens/dog.webp'
  },
  wDAI: {
    address: '0x73EA165665D3A8c8DF77970251291D8Ad6015b66',
    chainId: CHAIN_ID,
    symbol: 'wDAI',
    decimals: 18,
    name: 'wDAI',
    icon: '/assets/tokens/wdai.png',
    priceKey: 'DAI'
  },
  axlusdt: {
    chainId: CHAIN_ID,
    address: '0x7f5373AE26c3E8FfC4c77b7255DF7eC1A9aF52a6',
    decimals: 6,
    symbol: 'axlUSDT',
    name: 'Axelar Wrapped USDT',
    icon: '/assets/tokens/axlusdt.webp'
  },
  wBLT: {
    address: '0x4E74D4Db6c0726ccded4656d0BCE448876BB4C7A',
    chainId: CHAIN_ID,
    symbol: 'wBLT',
    decimals: 18,
    name: 'Wrapped BMX Liquidity Token',
    icon: '/assets/tokens/wBLT.png'
  },
  ftw: {
    address: '0x3347453Ced85bd288D783d85cDEC9b01Ab90f9D8',
    chainId: CHAIN_ID,
    symbol: 'FTW',
    decimals: 9,
    name: 'FriendTech33',
    icon: '/assets/tokens/ftw.png'
  }
};
