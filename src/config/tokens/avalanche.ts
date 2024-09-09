import type { Token } from '@/types';

const CHAIN_ID = 43114;
export const avalanche: { [key: string]: Token } = {
  usdc: {
    chainId: CHAIN_ID,
    address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6
  },
  'usdc.e': {
    chainId: CHAIN_ID,
    address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    decimals: 6,
    symbol: 'USDC.e',
    name: 'Bridged USDC',
    icon: 'https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla'
  },
  'dai.e': {
    chainId: CHAIN_ID,
    address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    decimals: 18,
    symbol: 'DAI.e',
    name: 'Dai Stablecoin',
    icon: 'https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu'
  },
  'usdt.e': {
    chainId: CHAIN_ID,
    address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    decimals: 6,
    symbol: 'USDT.e',
    name: 'Tether USD',
    icon: 'https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i'
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    name: 'USDT',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 6
  },
  frax: {
    chainId: CHAIN_ID,
    address: '0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64',
    name: 'Frax',
    symbol: 'FRAX',
    icon: 'https://assets.coingecko.com/coins/images/13422/standard/FRAX_icon.png?1696513182',
    decimals: 18
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: 'https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916',
    decimals: 18
  },
  avax: {
    chainId: CHAIN_ID,
    name: 'AVAX',
    symbol: 'AVAX',
    icon: 'https://assets.dapdap.net/images/bafkreiaxodsgromeeaihu44fazsxdopkrqvinqzhyfxvx5mrbcmduqdfpq.svg',
    decimals: 18,
    address: 'native',
    isNative: true
  },
  eth: {
    chainId: CHAIN_ID,
    address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18
  },
  wavax: {
    chainId: CHAIN_ID,
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    decimals: 18,
    symbol: 'WAVAX',
    name: 'Wrapped AVAX',
    icon: 'https://ipfs.near.social/ipfs/bafkreidhh4bxo55sq6bf2t2kkdbotbxcaj4s2v2wcwmq2e4bb6ilepmpve'
  },
  'wbtc.e': {
    chainId: CHAIN_ID,
    address: '0x50b7545627a5162F82A992c33b87aDc75187B218',
    decimals: 8,
    symbol: 'WBTC.e',
    name: 'Wrapped BTC',
    icon: 'https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q'
  },
  'link.e': {
    chainId: CHAIN_ID,
    address: '0x5947BB275c521040051D82396192181b413227A3',
    decimals: 18,
    symbol: 'LINK.e',
    name: 'Chainlink Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreidrq7qk3d6epwaxobq4gk7yowljr5tnslxwrsbd7vnw3srkt7ok3u'
  },
  savax: {
    chainId: CHAIN_ID,
    address: '0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE',
    decimals: 18,
    symbol: 'sAVAX',
    name: 'Staked AVAX',
    icon: 'https://ipfs.near.social/ipfs/bafkreia2hefekktykcred4hdkfduh62aeygtdn3r3qzj3ox53val6laosy'
  },
  'btc.b': {
    chainId: CHAIN_ID,
    address: '0x152b9d0FdC40C096757F570A51E494bd4b943E50',
    decimals: 8,
    symbol: 'BTC.b',
    name: 'Bitcoin',
    icon: 'https://ipfs.near.social/ipfs/bafkreig2h2vpf7u7ukbgomgurcvvfyujl66qdrbsp6u2bcga3wdyxladii'
  },
  xava: {
    chainId: CHAIN_ID,
    address: '0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4',
    decimals: 18,
    symbol: 'XAVA',
    name: 'Avalaunch',
    icon: 'https://ipfs.near.social/ipfs/bafkreiaxodsgromeeaihu44fazsxdopkrqvinqzhyfxvx5mrbcmduqdfpq'
  },
  phar: {
    chainId: CHAIN_ID,
    address: '0xaaab9d12a30504559b0c5a9a5977fee4a6081c6b',
    decimals: 18,
    symbol: 'PHAR',
    name: 'PHARAOH',
    icon: 'https://ipfs.near.social/ipfs/bafkreibmhma6xbsypqfytcuvfsntksowzw4omkrthtu5wbpvohvyw4rqlq'
  },
  mim: {
    chainId: CHAIN_ID,
    address: '0x130966628846bfd36ff31a822705796e8cb8c18d',
    decimals: 18,
    symbol: 'MIM',
    name: 'Magic Internet Money',
    icon: 'https://ipfs.near.social/ipfs/bafkreib435margnveti57fw3puzvlw5jr6kmzgbmxn5gju37up2h4e6as4'
  },
  'gg-avax': {
    chainId: CHAIN_ID,
    address: '0xA25EaF2906FA1a3a13EdAc9B9657108Af7B703e3',
    decimals: 18,
    symbol: 'ggAVAX',
    name: 'GoGoPool Liquid Staking Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreielxptqa3eyccjl4j5jn2brnjmfvolyg6dqr4fuzselycvhfijq3a'
  },
  ggp: {
    chainId: CHAIN_ID,
    address: '0x69260B9483F9871ca57f81A90D91E2F96c2Cd11d',
    decimals: 18,
    symbol: 'GGP',
    name: 'GoGoPool Protocol',
    icon: 'https://ipfs.near.social/ipfs/bafkreigbc3ptxwbgqupn5gpzzr37kiwtnyp2utpms5rry4zhdb2kga2fai'
  },
  'a-usd': {
    chainId: CHAIN_ID,
    address: '0xaBe7a9dFDA35230ff60D1590a929aE0644c47DC1',
    decimals: 18,
    symbol: 'aUSD',
    name: 'aUSD',
    icon: 'https://ipfs.near.social/ipfs/bafkreibpwbq44xwu5ghuhfp4cbkacw5gma7ds2fmwha6pubb65bemyb5vu'
  },
  'abc-phar': {
    chainId: CHAIN_ID,
    address: '0xd5d0A9b3f2C264b955Ae7161cfA6D38A7aEa60a7',
    decimals: 18,
    symbol: 'abcPHAR',
    name: 'abcPHAR',
    icon: 'https://ipfs.near.social/ipfs/bafkreiaqxukwoxnkz37xmsvrulpigdrqlgw5j7pgsoygs5vwsvk6jpx7zm'
  },
  swol: {
    chainId: CHAIN_ID,
    address: '0x245B532ad64c7FBfeEC9aa42f37291b183cEA91b',
    decimals: 18,
    symbol: 'SWOL',
    name: 'SWOL',
    icon: 'https://ipfs.near.social/ipfs/bafkreihl5foz67cz567je73qlijpr3ruzgr52tfjikb7nwaugt7zd5nv7e'
  },
  zro: {
    chainId: CHAIN_ID,
    address: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
    decimals: 18,
    symbol: 'ZRO',
    name: 'LayerZero',
    icon: 'https://ipfs.near.social/ipfs/bafkreiexfhn5fiqmvhvhb7ooduyu5ra5ufnx32sv5o74vobboap37thi2u'
  },
  png: {
    chainId: CHAIN_ID,
    address: '0x60781C2586D68229fde47564546784ab3fACA982',
    decimals: 18,
    symbol: 'PNG',
    name: 'Pangolin',
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/43114/0x60781C2586D68229fde47564546784ab3fACA982/logo_24.png'
  },
  yak: {
    chainId: CHAIN_ID,
    address: '0x59414b3089ce2AF0010e7523Dea7E2b35d776ec7',
    decimals: 18,
    symbol: 'YAK',
    name: 'Yak Token',
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/43114/0x59414b3089ce2AF0010e7523Dea7E2b35d776ec7/logo_24.png'
  },
  qi: {
    chainId: CHAIN_ID,
    address: '0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5',
    decimals: 18,
    symbol: 'QI',
    name: 'BENQI',
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/43114/0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5/logo_24.png'
  },
  'weth.e': {
    address: '0x5375616bB6c52A90439fF96882a986d8FCdCe421',
    chainId: CHAIN_ID,
    symbol: 'WETH.e',
    decimals: 18,
    name: 'WETH.e',
    icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq'
  },
  joe: {
    address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
    chainId: CHAIN_ID,
    symbol: 'JOE',
    decimals: 18,
    name: 'Trader Joe: JOE Tokenjoe',
    icon: '/images/tokens/joe.png'
  },
  coq: {
    address: '0x420FcA0121DC28039145009570975747295f2329',
    chainId: CHAIN_ID,
    symbol: 'COQ',
    decimals: 18,
    name: 'Coq Inu',
    icon: '/images/tokens/coq.png'
  },
  shrap: {
    address: '0xd402298a793948698b9a63311404fbbee944eafd',
    chainId: CHAIN_ID,
    symbol: 'SHRAP',
    decimals: 18,
    name: 'SHRAPToken',
    icon: '/images/tokens/shrap.png'
  },
  beam: {
    address: '0x62d0a8458ed7719fdaf978fe5929c6d342b0bfce',
    chainId: CHAIN_ID,
    symbol: 'BEAM',
    decimals: 18,
    name: 'Beam',
    icon: '/images/tokens/beam.png'
  },
  prime: {
    address: '0x33c8036e99082b0c395374832fecf70c42c7f298',
    chainId: CHAIN_ID,
    symbol: 'PRIME',
    decimals: 18,
    name: 'Delta Prime',
    icon: '/images/tokens/prime.png'
  },
  alot: {
    address: '0x093783055f9047c2bff99c4e414501f8a147bc69',
    chainId: CHAIN_ID,
    symbol: 'ALOT',
    decimals: 18,
    name: 'alot',
    icon: '/images/tokens/alot.png'
  },
  aleph: {
    address: '0xc0fbc4967259786c743361a5885ef49380473dcf',
    chainId: CHAIN_ID,
    symbol: 'ALEPH',
    decimals: 18,
    name: 'Aleph.im V 2 Super Token',
    icon: '/images/tokens/aleph.png'
  },
  ampl: {
    address: '0x027dbcA046ca156De9622cD1e2D907d375e53aa7',
    chainId: CHAIN_ID,
    symbol: 'AMPL',
    decimals: 9,
    name: 'Ampleforth',
    icon: '/images/tokens/ampl.png'
  },
  bnUSD: {
    address: '0xdBDd50997361522495EcFE57EBb6850dA0E4C699',
    chainId: CHAIN_ID,
    symbol: 'bnUSD',
    decimals: 9,
    name: 'Balanced Dollar',
    icon: '/images/tokens/bnUSD.webp'
  },
  kimbo: {
    address: '0x184ff13B3EBCB25Be44e860163A5D8391Dd568c1',
    chainId: CHAIN_ID,
    symbol: 'KIMBO',
    decimals: 9,
    name: 'Kimbo',
    icon: '/images/tokens/kimbo.webp'
  },
  sicko: {
    address: '0xF6C95C3A750CC7f6a8C96d9b08CC132A44c7Bd72',
    chainId: CHAIN_ID,
    symbol: '$SICKO',
    decimals: 9,
    name: 'ACID404: THE SICKOS',
    icon: '/images/tokens/sicko.webp'
  },
  hefe: {
    address: '0x18E3605B13F10016901eAC609b9E188CF7c18973',
    chainId: CHAIN_ID,
    symbol: 'HEFE',
    decimals: 9,
    name: 'HEFE',
    icon: '/images/tokens/hefe.webp'
  }
};
