import type { Token } from '@/types';

const CHAIN_ID = 42161;
export const arbitrum: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
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
    icon: 'https://ipfs.near.social/ipfs/bafkreibwds6fxcej7ioqbbl6k4x7o4m2kmvc2ryly2ghamkuuqaxvl56d4'
  },
  'usd+': {
    chainId: CHAIN_ID,
    address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
    decimals: 6,
    symbol: 'USD+',
    name: 'USD+',
    icon: 'https://ipfs.near.social/ipfs/bafkreiccxz5kzr7fnbbnlzpe5e25zuxuhwp2mtf6rdqvcjtmz4jvi33zgu'
  },
  chr: {
    chainId: CHAIN_ID,
    address: '0x15b2fb8f08E4Ac1Ce019EADAe02eE92AeDF06851',
    decimals: 18,
    symbol: 'CHR',
    name: 'CHRONOS',
    icon: 'https://ipfs.near.social/ipfs/bafkreifchhzjooclf3qnimmciuonqgkxkkmy327dbcsxx3aolrszq5hjaq'
  },
  'dai+': {
    chainId: CHAIN_ID,
    address: '0xeb8E93A0c7504Bffd8A8fFa56CD754c63aAeBFe8',
    decimals: 18,
    symbol: 'DAI+',
    name: 'DAI+',
    icon: 'https://ipfs.near.social/ipfs/bafkreidjdnhf4q4fwzio7utmlrfq53fsmfcvtmsixdm2ixzefy5bvjj6vu'
  },
  'usdc.e': {
    chainId: CHAIN_ID,
    address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    decimals: 6,
    symbol: 'USDC.e',
    name: 'Bridged USDC',
    icon: 'https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla'
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    icon: 'https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla'
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: 'https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i'
  },
  frax: {
    chainId: CHAIN_ID,
    address: '0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F',
    name: 'Frax',
    symbol: 'FRAX',
    icon: 'https://assets.coingecko.com/coins/images/13422/standard/FRAX_icon.png?1696513182',
    decimals: 18
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d',
    decimals: 18,
    symbol: 'MAI',
    name: 'Mai Stablecoin',
    icon: 'https://ipfs.near.social/ipfs/bafkreicgly7mfpvv4o32u6hpcei7z4le7a67gtfbdvhi5avf5dkpddy5pu'
  },
  lusd: {
    chainId: CHAIN_ID,
    address: '0x93b346b6BC2548dA6A1E7d98E9a421B42541425b',
    name: 'LUSD Stablecoin',
    symbol: 'LUSD',
    icon: 'https://ipfs.near.social/ipfs/bafkreihne6zw3myw5dwh72giml63vjjksmixrf435hf7cnsg5f3ubgdnde',
    decimals: 18
  },
  arb: {
    chainId: CHAIN_ID,
    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    decimals: 18,
    symbol: 'ARB',
    name: 'Arbitrum',
    icon: 'https://ipfs.near.social/ipfs/bafkreid7njdklgdliaqs57sth2ixfrxpss6xe5vjprcgcp6rwqcb4zl3me'
  },
  fctr: {
    chainId: CHAIN_ID,
    address: '0x6dD963C510c2D2f09d5eDdB48Ede45FeD063Eb36',
    decimals: 18,
    symbol: 'FCTR',
    name: 'Factor',
    icon: 'https://ipfs.near.social/ipfs/bafkreih6tw7de5m56hq4fkzywsjzaktat2jjipxszkw7uzv67qlxn5lydu'
  },
  winr: {
    chainId: CHAIN_ID,
    address: '0xD77B108d4f6cefaa0Cae9506A934e825BEccA46E',
    decimals: 18,
    symbol: 'WINR',
    name: 'WINR',
    icon: 'https://ipfs.near.social/ipfs/bafkreieb2p7alvhsukpp67yupyz5yiu5mpwlp4yy2epwr3zsxtotc5lvoi'
  },
  pendle: {
    chainId: CHAIN_ID,
    address: '0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8',
    decimals: 18,
    symbol: 'PENDLE',
    name: 'Pendle',
    icon: 'https://ipfs.near.social/ipfs/bafkreigmom3zubq5otiuafmhrkg444q4higxd2oaa7ykq4zteyfqah5tz4'
  },
  gmx: {
    chainId: CHAIN_ID,
    address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
    decimals: 18,
    symbol: 'GMX',
    name: 'GMX',
    icon: 'https://ipfs.near.social/ipfs/bafkreicl37uzmlopck5vl22v3b2ju5mwyztjxamudxwwwykvdjtn3mbihm'
  },
  trove: {
    chainId: CHAIN_ID,
    address: '0x982239D38Af50B0168dA33346d85Fb12929c4c07',
    decimals: 18,
    symbol: 'TROVE',
    name: 'Arbitrove Governance Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreihsvhurpnozp52botgrcg2j673fvn3633y23bkx54dp6bfpov2zum'
  },
  'jones dao': {
    chainId: CHAIN_ID,
    address: '0x10393c20975cF177a3513071bC110f7962CD67da',
    decimals: 18,
    symbol: 'JONES',
    name: 'Jones DAO',
    icon: 'https://ipfs.near.social/ipfs/bafkreibx6e6tsab3xxd6s7alev2tgvbjs4welhfndrrunsedvgopv2hmj4'
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: 'https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4'
  },
  deus: {
    chainId: CHAIN_ID,
    address: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
    decimals: 18,
    symbol: 'DEUS',
    name: 'DEUS',
    icon: 'https://ipfs.near.social/ipfs/bafkreieunqohwvmd42bs4riistxw52cxt5pxrsnd7ipd4fsqvw33ej5nra'
  },
  fba: {
    chainId: CHAIN_ID,
    address: '0x13aABC0a9A5d6865dA8fD0296080E172CF8BB958',
    decimals: 18,
    symbol: 'FBA',
    name: 'Firebird Aggregator',
    icon: 'https://ipfs.near.social/ipfs/bafkreichwusk6u232gj54kdf2m3zbb4bbwwxfad2it6e3xfnsjiy4fdzpe'
  },
  alusd: {
    chainId: CHAIN_ID,
    address: '0xCB8FA9a76b8e203D8C3797bF438d8FB81Ea3326A',
    decimals: 18,
    symbol: 'alUSD',
    name: 'Alchemix USD',
    icon: 'https://ipfs.near.social/ipfs/bafkreiatqfw3xloh4btud42jsnzvliege2h7v3ptroxehngq32ryllxpfi'
  },
  sparta: {
    chainId: CHAIN_ID,
    address: '0x11F98c7E42A367DaB4f200d2fdc460fb445CE9a8',
    decimals: 18,
    symbol: 'SPARTA',
    name: 'SPARTA',
    icon: 'https://ipfs.near.social/ipfs/bafkreihe3hvj3bkgljgfwhgzz6r3unz447ccoegm2gkvfo5v3vpagt43ly'
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: 'https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q'
  },
  gswift: {
    chainId: CHAIN_ID,
    address: '0x580E933D90091b9cE380740E3a4A39c67eB85B4c',
    decimals: 18,
    symbol: 'GSWIFT',
    name: 'GameSwift',
    icon: 'https://ipfs.near.social/ipfs/bafkreiftjoz65kgqbxrymhvyrcwiv6cklcynjflnq4xvukoeidahj6h7ta'
  },
  grail: {
    chainId: CHAIN_ID,
    address: '0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8',
    decimals: 18,
    symbol: 'GRAIL',
    name: 'Camelot token',
    icon: 'https://ipfs.near.social/ipfs/bafkreibnsqc22kpgbax23sog6z5q6ep2ysajpexz53xdjrrcp64ns3nsue'
  },
  ram: {
    chainId: CHAIN_ID,
    address: '0xAAA6C1E32C55A7Bfa8066A6FAE9b42650F262418',
    decimals: 18,
    symbol: 'RAM',
    name: 'Ramses',
    icon: 'https://ipfs.near.social/ipfs/bafkreiapmufwi3jhpn3t2t7zcvlgwejuicp6ry557y6eh2znoh4r3p27he'
  },
  'wst-eth': {
    chainId: CHAIN_ID,
    address: '0x5979D7b546E38E414F7E9822514be443A4800529',
    decimals: 18,
    symbol: 'wstETH',
    name: 'Wrapped liquid staked Ether',
    icon: 'https://ipfs.near.social/ipfs/bafkreibukwahpp2ei74ax5acm6p7uwcnbsfvdzkizsdzqu26yfbxndpvra'
  },
  rdnt: {
    chainId: CHAIN_ID,
    address: '0x3082CC23568eA640225c2467653dB90e9250AaA0',
    decimals: 18,
    symbol: 'RDNT',
    name: 'Radiant',
    icon: 'https://ipfs.near.social/ipfs/bafkreiboaplfrmdlyxumajlxnipkk4viu6pxqow7ue2ixlimgkenre2gru'
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: 'https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu'
  },
  reth: {
    chainId: CHAIN_ID,
    address: '0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8',
    decimals: 18,
    symbol: 'rETH',
    name: 'Rocket Pool ETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreicgk4jnpvyfe7jqup46y5epyxoemounktft6yxtym7o7wcagiecpy'
  },
  sushi: {
    chainId: CHAIN_ID,
    address: '0xd4d42F0b6DEF4CE0383636770eF773390d85c61A',
    decimals: 18,
    symbol: 'SUSHI',
    name: 'SushiToken',
    icon: 'https://ipfs.near.social/ipfs/bafkreif5a3jne5ol2d57r2terziofqhosgl5txptv7q7bit42qt5jzoaqa'
  },
  sliz: {
    chainId: CHAIN_ID,
    address: '0x463913D3a3D3D291667D53B8325c598Eb88D3B0e',
    decimals: 18,
    symbol: 'SLIZ',
    name: 'SolidLizard dex token',
    icon: 'https://ipfs.near.social/ipfs/bafkreifygw42y5orsb3l4xxz2blupunkfu4dh3nqlspvc5c3dciadkrcfi'
  },
  link: {
    chainId: CHAIN_ID,
    address: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
    decimals: 18,
    symbol: 'LINK',
    name: 'ChainLink Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreidrq7qk3d6epwaxobq4gk7yowljr5tnslxwrsbd7vnw3srkt7ok3u'
  },
  uni: {
    chainId: CHAIN_ID,
    address: '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0',
    decimals: 18,
    symbol: 'UNI',
    name: 'Uniswap',
    icon: 'https://ipfs.near.social/ipfs/bafkreihcntncnhk7xxmodpn5caplocnppdia2b4kafbxtvxtkewbveqate'
  },
  dpx: {
    chainId: CHAIN_ID,
    address: '0x6c2c06790b3e3e3c38e12ee22f8183b37a13ee55',
    decimals: 18,
    symbol: 'DPX',
    name: 'Dopex Governance Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreic3v4hznmt74l2yp4wdjucji35laybhzwnie3ffhl3ys6sr4zld4u'
  },
  magic: {
    chainId: CHAIN_ID,
    address: '0x539bde0d7dbd336b79148aa742883198bbf60342',
    decimals: 18,
    symbol: 'MAGIC',
    name: 'MAGIC',
    icon: 'https://ipfs.near.social/ipfs/bafkreif7syzj3bk2mudrsxglwfgkb4tkd63yw3tit773he5sc2l5jsmb74'
  },
  sfrxETH: {
    chainId: CHAIN_ID,
    address: '0x95ab45875cffdba1e5f451b950bc2e42c0053f39',
    decimals: 18,
    symbol: 'sfrxETH',
    name: 'Staked Frax Ether',
    icon: 'https://ipfs.near.social/ipfs/bafkreiaq5taf3cuvvqar5qbqpqzbj5ys2xx2skgstbaorxgxchtswispmi'
  },
  wstLINK: {
    chainId: CHAIN_ID,
    address: '0x3106E2e148525b3DB36795b04691D444c24972fB',
    decimals: 18,
    symbol: 'wstLINK',
    name: 'Wrapped stLINK',
    icon: 'https://ipfs.near.social/ipfs/bafkreiaanoxf5qwqevex37ofwqzk2fgoyxowo6uxpnhjusphujjpcputtq'
  },
  sfund: {
    chainId: CHAIN_ID,
    address: '0x560363BdA52BC6A44CA6C8c9B4a5FadbDa32fa60',
    decimals: 18,
    symbol: 'SFUND',
    name: 'SeedifyFund',
    icon: 'https://ipfs.near.social/ipfs/bafkreiahgchq3pdfgutves2q635mhnddmejqu77zuqzqry3um3nx4bmnte'
  },
  syk: {
    chainId: CHAIN_ID,
    address: '0xACC51FFDeF63fB0c014c882267C3A17261A5eD50',
    decimals: 18,
    symbol: 'SYK',
    name: 'Stryke Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreidehbtenij3af5us3j3gwiowzbzadcoxgrvirpxbujcbkxsfvv5ce'
  },
  mim: {
    chainId: CHAIN_ID,
    address: '0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A',
    decimals: 18,
    symbol: 'MIM',
    name: 'Magic Internet Money',
    icon: 'https://ipfs.near.social/ipfs/bafkreib435margnveti57fw3puzvlw5jr6kmzgbmxn5gju37up2h4e6as4'
  },
  rseth: {
    address: '0x4186BFC76E2E237523CBC30FD220FE055156b41F',
    chainId: CHAIN_ID,
    symbol: 'rsETH',
    decimals: 18,
    name: 'KelpDao Restaked ETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreibhmbhdfll7apn5mjmlmt6eh2fgn4wcvrkl3yhqfujgw5dgkqvg2e'
  },
  ethx: {
    chainId: CHAIN_ID,
    address: '0xED65C5085a18Fa160Af0313E60dcc7905E944Dc7',
    decimals: 18,
    symbol: 'ETHx',
    name: 'ETHx',
    icon: 'https://ipfs.near.social/ipfs/bafkreicyoq5fpk5myiemw7nijy4cu53q3epe4izqvyaaxayvaspvkay6zu'
  },
  zro: {
    chainId: CHAIN_ID,
    address: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
    decimals: 18,
    symbol: 'ZRO',
    name: 'LayerZero',
    icon: 'https://ipfs.near.social/ipfs/bafkreiexfhn5fiqmvhvhb7ooduyu5ra5ufnx32sv5o74vobboap37thi2u'
  },
  ezeth: {
    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
    chainId: CHAIN_ID,
    symbol: 'ezETH',
    decimals: 18,
    name: 'Renzo Restaked ETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreiee5yhfnbsjedzqj2p4uaeko327ooenqptplslol2pxwir463z7ii'
  },
  'solv-btc': {
    address: '0x3647c54c4c2C65bC7a2D63c0Da2809B399DBBDC0',
    chainId: CHAIN_ID,
    symbol: 'SolvBTC',
    decimals: 18,
    name: 'Solv BTC',
    icon: 'https://ipfs.near.social/ipfs/bafkreifiiyr3pn7bnrixrydppkxzvvbdt2vv375ve4hdcqzdzqljjkbfuq'
  },
  tbtc: {
    chainId: CHAIN_ID,
    address: '0x6c84a8f1c29108F47a79964b5Fe888D4f4D0dE40',
    name: 'Arbitrum tBTC v2',
    decimals: 18,
    symbol: 'tBTC',
    icon: 'https://ipfs.near.social/ipfs/bafkreifjganma5l5mvy5kbixwg5kvkr3a7uqzbarsxwgkzgxcjs4az433y'
  },
  usde: {
    chainId: CHAIN_ID,
    address: '0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34',
    decimals: 18,
    symbol: 'USDe',
    name: 'USDe',
    icon: 'https://ipfs.near.social/ipfs/bafkreiajqdsi6gpuagir7qhmuijojujf56atbiqw3ftmcjp6w4yz5l2nd4'
  },
  usdy: {
    chainId: CHAIN_ID,
    address: '0x35e050d3C0eC2d29D269a8EcEa763a183bDF9A9D',
    decimals: 18,
    symbol: 'USDY',
    name: 'Ondo U.S. Dollar Yield',
    icon: '/images/tokens/usdy.png'
  },
  d2: {
    chainId: CHAIN_ID,
    address: '0xed7f000eE335B8199b004cCA1c6f36d188CF6cb8',
    decimals: 18,
    symbol: 'D2',
    name: 'D2',
    icon: '/images/tokens/d2.jpg'
  },
  xd2: {
    chainId: CHAIN_ID,
    address: '0x1c17a39B156189BF40905425170a3Ff62fb650DA',
    decimals: 18,
    symbol: 'xD2',
    name: 'xD2',
    icon: '/images/tokens/xd2.svg'
  },
  'we-eth': {
    address: '0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe',
    chainId: CHAIN_ID,
    symbol: 'weETH',
    decimals: 18,
    name: 'Wrapped eETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreiay4btbz3rhrgxzztx72njurb5sgubxno3tlkv2hvzxoauxzz6d6e'
  },
  gUSDC: {
    chainId: CHAIN_ID,
    address: '0x1c17a39B156189BF40905425170a3Ff62fb650DA',
    decimals: 18,
    symbol: 'gUSDC',
    name: 'Gains Network USDC',
    icon: '/images/tokens/gusdc.png'
  },
  PNP: {
    chainId: CHAIN_ID,
    address: '0x2Ac2B254Bc18cD4999f64773a966E4f4869c34Ee',
    decimals: 18,
    symbol: 'PNP',
    name: 'Penpie Token',
    icon: '/images/tokens/pnp.jpg'
  },
  PREMIA: {
    chainId: CHAIN_ID,
    address: '0x51fC0f6660482Ea73330E414eFd7808811a57Fa2',
    decimals: 18,
    symbol: 'PREMIA',
    name: 'Premia',
    icon: '/images/tokens/premia.jpg'
  },
  GNS: {
    chainId: CHAIN_ID,
    address: '0x18c11FD286C5EC11c3b683Caa813B77f5163A122',
    decimals: 18,
    symbol: 'GNS',
    name: 'Gains Network',
    icon: '/images/tokens/gns.png'
  },
  VRTX: {
    chainId: CHAIN_ID,
    address: '0x95146881b86B3ee99e63705eC87AfE29Fcc044D9',
    decimals: 18,
    symbol: 'VRTX',
    name: 'Vertex',
    icon: '/images/tokens/vrtx.png'
  },
  sol: {
    chainId: CHAIN_ID,
    address: '0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07',
    decimals: 18,
    symbol: 'SOL',
    name: 'Wrapped SOL',
    icon: '/images/tokens/sol.svg'
  },
  peas: {
    address: '0x02f92800F57BCD74066F5709F1Daa1A4302Df875',
    chainId: CHAIN_ID,
    symbol: 'PEAS',
    decimals: 18,
    name: 'Peapods',
    icon: '/images/tokens/peas.webp'
  },
  dmt: {
    address: '0x8B0E6f19Ee57089F7649A455D89D7bC6314D04e8',
    chainId: CHAIN_ID,
    symbol: 'DMT',
    decimals: 18,
    name: 'DMT',
    icon: '/images/tokens/dmt.png'
  },
  XAI: {
    address: '0x4Cb9a7AE498CEDcBb5EAe9f25736aE7d428C9D66',
    chainId: CHAIN_ID,
    symbol: 'XAI',
    decimals: 18,
    name: 'Xai',
    icon: '/images/tokens/xai.png'
  },
  USDs: {
    address: '0xD74f5255D557944cf7Dd0E45FF521520002D5748',
    chainId: CHAIN_ID,
    symbol: 'USDs',
    decimals: 18,
    name: 'Sperax USD',
    icon: '/images/tokens/usds.svg'
  },
  PRY: {
    address: '0x1824a51C106EFC27d35A74efB56d9BF54dDb22d4',
    chainId: CHAIN_ID,
    symbol: 'PRY',
    decimals: 18,
    name: 'Perpy-Token',
    icon: '/images/tokens/pry.svg'
  },
  APEX: {
    address: '0x61A1ff55C5216b636a294A07D77C6F4Df10d3B56',
    chainId: CHAIN_ID,
    symbol: 'APEX',
    decimals: 18,
    name: 'ApeX Token',
    icon: '/images/tokens/apex.svg'
  },
  Bonsai: {
    address: '0x79EaD7a012D97eD8DeEcE279f9bC39e264d7Eef9',
    chainId: CHAIN_ID,
    symbol: 'Bonsai',
    decimals: 18,
    name: 'Bonsai',
    icon: '/images/tokens/bonsai.png'
  },
  RDPX: {
    address: '0x32Eb7902D4134bf98A28b963D26de779AF92A212',
    chainId: CHAIN_ID,
    symbol: 'RDPX',
    decimals: 18,
    name: 'Dopex Rebate Token',
    icon: '/images/tokens/rdpx.png'
  },
  ETHFI: {
    address: '0x7189fb5B6504bbfF6a852B13B7B82a3c118fDc27',
    chainId: CHAIN_ID,
    symbol: 'ETHFI',
    decimals: 18,
    name: 'ether.fi governance token',
    icon: '/images/tokens/ethfi.svg'
  },
  uniETH: {
    chainId: CHAIN_ID,
    address: '0x3d15fD46CE9e551498328B1C83071D9509E2C3a0',
    decimals: 18,
    symbol: 'uniETH',
    name: 'Universal ETH',
    icon: '/images/tokens/uni-eth.png'
  },
  GG: {
    chainId: CHAIN_ID,
    address: '0x000000000026839b3f4181f2cF69336af6153b99',
    decimals: 18,
    symbol: 'GG',
    name: 'GG',
    icon: '/images/tokens/gg.png'
  },
  RDP: {
    chainId: CHAIN_ID,
    address: '0x54BDBF3cE36f451Ec61493236b8E6213ac87c0f6',
    decimals: 18,
    symbol: 'RDP',
    name: 'Radpie',
    icon: '/images/tokens/rdp.png'
  },
  MOZ: {
    chainId: CHAIN_ID,
    address: '0x20547341E58fB558637FA15379C92e11F7b7F710',
    decimals: 18,
    symbol: 'MOZ',
    name: 'Mozaic Token',
    icon: '/images/tokens/moz.png'
  },
  MOON: {
    chainId: CHAIN_ID,
    address: '0x24404DC041d74cd03cFE28855F555559390C931b',
    decimals: 18,
    symbol: 'MOON',
    name: 'Moons',
    icon: '/images/tokens/moons.png'
  },
  AURY: {
    chainId: CHAIN_ID,
    address: '0x11Bf4f05EB28b802ED3aB672594DEcB20ffe2313',
    decimals: 18,
    symbol: 'AURY',
    name: 'Aury',
    icon: '/images/tokens/aury.png'
  },
  FLY: {
    chainId: CHAIN_ID,
    address: '0x000F1720A263f96532D1ac2bb9CDC12b72C6f386',
    decimals: 18,
    symbol: 'FLY',
    name: 'Fluidity',
    icon: '/images/tokens/fly.png'
  },
  flrEUR: {
    chainId: CHAIN_ID,
    address: '0x9B6226dd0191a77d032F56A6d383044EE99944C3',
    decimals: 18,
    symbol: 'flrEUR',
    name: 'Florence Finance flrEUR',
    icon: '/images/tokens/flr.svg'
  },
  ECLIP: {
    chainId: CHAIN_ID,
    address: '0x93ca0d85837FF83158Cd14D65B169CdB223b1921',
    decimals: 18,
    symbol: 'ECLIP',
    name: 'Eclipse Fi',
    icon: '/images/tokens/eclip.svg'
  },
  star: {
    address: '0xB299751B088336E165dA313c33e3195B8c6663A6',
    chainId: CHAIN_ID,
    symbol: 'STAR',
    decimals: 18,
    name: 'StarHeroes',
    icon: '/images/tokens/star.png'
  },
  frxeth: {
    chainId: CHAIN_ID,
    address: '0x178412e79c25968a32e89b11f63B33F733770c2A',
    decimals: 18,
    symbol: 'frxETH',
    name: 'Frax Ether',
    icon: 'https://ipfs.near.social/ipfs/bafkreig2u6c72b4gy5nu3d57xlqzjb6ycf2luqnofdzq6btqzav3tqrqnq'
  },
  aleth: {
    chainId: CHAIN_ID,
    address: '0x17573150d67d820542EFb24210371545a4868B03',
    decimals: 18,
    symbol: 'alETH',
    name: 'Alchemix ETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreihzglwb4igvthk5qeewmhu4tuoafl7nn6sfe7dfej2yklsywlmp4a'
  },
  osETH: {
    address: '0xf7d4e7273E5015C96728A6b02f31C505eE184603',
    chainId: CHAIN_ID,
    symbol: 'osETH',
    decimals: 18,
    name: 'Staked ETH',
    icon: '/images/tokens/oseth.webp'
  },
  dola: {
    chainId: CHAIN_ID,
    address: '0x6A7661795C374c0bFC635934efAddFf3A7Ee23b6',
    decimals: 18,
    symbol: 'DOLA',
    name: 'DOLA USD Stablecoin',
    icon: 'https://ipfs.near.social/ipfs/bafkreickj6qq7glaxvvwzjbaqz2cbe5bxbglo6pwu7qzi3ardqtgjm5smi'
  },
  abcRAM: {
    address: '0x9EfCFc5b49390FC3fb9B58607D2e89445Bb380BF',
    chainId: CHAIN_ID,
    symbol: 'abcRAM',
    decimals: 18,
    name: 'abcRAM',
    icon: '/images/tokens/abcRAM.webp'
  },
  USDx: {
    address: '0xb2F30A7C980f052f02563fb518dcc39e6bf38175',
    chainId: CHAIN_ID,
    symbol: 'USDx',
    decimals: 18,
    name: 'Synthetix USD',
    icon: '/images/tokens/usdx.webp'
  },
  grai: {
    chainId: CHAIN_ID,
    address: '0x894134a25a5faC1c2C26F1d8fBf05111a3CB9487',
    decimals: 18,
    symbol: 'GRAI',
    name: 'Gravita Debt Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreic62f4fvqgjso3trvpbyveldzk5ejt5ggb43jy56l2m5rjm7fzdtu'
  },
  comp: {
    address: '0x354A6dA3fcde098F8389cad84b0182725c6C91dE',
    chainId: CHAIN_ID,
    symbol: 'COMP',
    decimals: 18,
    name: 'Compound',
    icon: '/images/tokens/comp.webp'
  },
  ichi: {
    chainId: CHAIN_ID,
    address: '0xadf5DD3E51bF28aB4F07e684eCF5d00691818790',
    decimals: 18,
    symbol: 'ICHI',
    name: 'ICHI',
    icon: 'https://ipfs.near.social/ipfs/bafkreighebzdujyypybl5okn4kab5a65bscjfcdfipaqd2bi4y6pj46tpi'
  },
  EUROs: {
    address: '0x643b34980E635719C15a2D4ce69571a258F940E9',
    chainId: CHAIN_ID,
    symbol: 'EUROs',
    decimals: 18,
    name: 'The Standard EURO',
    icon: '/images/tokens/euros.webp'
  },
  agEUR: {
    address: '0xFA5Ed56A203466CbBC2430a43c66b9D8723528E7',
    chainId: CHAIN_ID,
    symbol: 'agEUR',
    decimals: 18,
    name: 'agEUR',
    icon: '/images/tokens/agEUR.webp'
  },
  psm: {
    address: '0x17A8541B82BF67e10B0874284b4Ae66858cb1fd5',
    chainId: CHAIN_ID,
    symbol: 'PSM',
    decimals: 18,
    name: 'Possum',
    icon: '/images/tokens/psm.webp'
  },
  lqdr: {
    address: '0x816E21c33fa5F8440EBcDF6e01D39314541BEA72',
    chainId: CHAIN_ID,
    symbol: 'Lqdr',
    decimals: 18,
    name: 'LqdrV2',
    icon: '/images/tokens/lqdr.webp'
  },
  tarot: {
    address: '0x13278cD824D33A7aDB9f0a9A84ACA7C0D2DEEBf7',
    chainId: CHAIN_ID,
    symbol: 'TAROT',
    decimals: 18,
    name: 'Tarot',
    icon: '/images/tokens/tarot.webp'
  },
  pool: {
    address: '0xCF934E2402A5e072928a39a956964eb8F2B5B79C',
    chainId: CHAIN_ID,
    symbol: 'POOL',
    decimals: 18,
    name: 'PoolTogether',
    icon: '/images/tokens/pool.webp'
  },
  usdfi: {
    address: '0x249c48e22E95514Ca975De31f473F30c2f3C0916',
    chainId: CHAIN_ID,
    symbol: 'USDFI',
    decimals: 18,
    name: 'USDFI',
    icon: '/images/tokens/usdfi.webp'
  },
  'fly-wheel': {
    address: '0x018E32f5a78329A28232e99A158879B3bB512cb1',
    chainId: CHAIN_ID,
    symbol: 'FLYWHEEL',
    decimals: 18,
    name: 'FLYWHEEL',
    icon: '/images/tokens/fly-wheel.webp'
  },
  'solv-btc.bbn': {
    address: '0x346c574C56e1A4aAa8dc88Cda8F7EB12b39947aB',
    chainId: CHAIN_ID,
    symbol: 'SolvBTC.BBN',
    decimals: 18,
    name: 'SolvBTC Babylon',
    icon: '/images/tokens/solv-btc.bbn.webp'
  },
  'solv-btc.ena': {
    address: '0xaFAfd68AFe3fe65d376eEC9Eab1802616cFacCb8',
    chainId: CHAIN_ID,
    symbol: 'SolvBTC.ENA',
    decimals: 18,
    name: 'SolvBTC Ethena',
    icon: '/images/tokens/solv-btc.ena.webp'
  },
  odin: {
    address: '0xeE9857dE0e55d4A54D36a5A5a73A15e57435FdCA',
    chainId: CHAIN_ID,
    symbol: 'ODIN',
    decimals: 18,
    name: 'AsgardX',
    icon: '/images/tokens/odin.webp'
  },
  govi: {
    address: '0x07E49d5dE43DDA6162Fa28D24d5935C151875283',
    chainId: CHAIN_ID,
    symbol: 'GOVI',
    decimals: 18,
    name: 'GOVI',
    icon: '/images/tokens/govi.webp'
  },
  spell: {
    address: '0x3E6648C5a70A150A88bCE65F4aD4d506Fe15d2AF',
    chainId: CHAIN_ID,
    symbol: 'SPELL',
    decimals: 18,
    name: 'Spell Token',
    icon: '/images/tokens/spell.webp'
  },
  lon: {
    address: '0x55678cd083fcDC2947a0Df635c93C838C89454A3',
    chainId: CHAIN_ID,
    symbol: 'LON',
    decimals: 18,
    name: 'Tokenlon',
    icon: '/images/tokens/lon.webp'
  },
  nuon: {
    address: '0xfb9Fed8cB962548A11fE7F6F282949061395c7F5',
    chainId: CHAIN_ID,
    symbol: 'NUON',
    decimals: 18,
    name: 'NUON',
    icon: '/images/tokens/nuon.webp'
  },
  ydf: {
    address: '0x30dcBa0405004cF124045793E1933C798Af9E66a',
    chainId: CHAIN_ID,
    symbol: 'YDF',
    decimals: 18,
    name: 'Yieldification',
    icon: '/images/tokens/ydf.webp'
  },
  frm: {
    address: '0x9f6AbbF0Ba6B5bfa27f4deb6597CC6Ec20573FDA',
    chainId: CHAIN_ID,
    symbol: 'FRM',
    decimals: 18,
    name: 'Ferrum Network Token',
    icon: '/images/tokens/frm.webp'
  },
  ztx: {
    address: '0x1C43D05be7E5b54D506e3DdB6f0305e8A66CD04e',
    chainId: CHAIN_ID,
    symbol: 'ZTX',
    decimals: 18,
    name: 'ZTX',
    icon: '/images/tokens/ztx.webp'
  },
  jgOHM: {
    address: '0x5375616bB6c52A90439fF96882a986d8FCdCe421',
    chainId: CHAIN_ID,
    symbol: 'jgOHM',
    decimals: 18,
    name: 'Jones gOHM',
    icon: '/images/tokens/jgOHM.jpg'
  },
  gOHM: {
    address: '0x8D9bA570D6cb60C7e3e0F31343Efe75AB8E65FB1',
    chainId: CHAIN_ID,
    symbol: 'gOHM',
    decimals: 18,
    name: 'Governance OHM',
    icon: '/images/tokens/gOHM.webp'
  },
  w3n: {
    address: '0xf7693c6fD9a7172D537FA75D133D309501Cbd657',
    chainId: CHAIN_ID,
    symbol: 'W3N',
    decimals: 18,
    name: 'Web3 No Value',
    icon: '/images/tokens/w3n.webp'
  },
  omni: {
    address: '0x9e20461bc2c4c980f62f1B279D71734207a6A356',
    chainId: CHAIN_ID,
    symbol: 'OMNI',
    decimals: 18,
    name: 'OmniCat',
    icon: 'https://ipfs.near.social/ipfs/bafkreigzusaroe6xtxrlags6ke7jy576mxxfgphab4mhmigm6hfu5fbjiy',
    priceKey: 'omnicat'
  },
  liqd: {
    address: '0x93C15cd7DE26f07265f0272E0b831C5D7fAb174f',
    chainId: CHAIN_ID,
    symbol: 'LIQD',
    decimals: 18,
    name: 'Liquid',
    icon: '/images/tokens/liqd.webp'
  },
  stc: {
    address: '0x89073B7AaAe498771BDb789360b0D3De9d15aD56',
    chainId: CHAIN_ID,
    symbol: 'STC',
    decimals: 18,
    name: 'TechCat',
    icon: '/images/tokens/stc.webp'
  },
  beef: {
    address: '0x98c435070c24e5152Fc14D130937A38810c104b9',
    chainId: CHAIN_ID,
    symbol: 'BEEF',
    decimals: 18,
    name: 'Kobe',
    icon: '/images/tokens/beef.webp'
  },
  sx: {
    address: '0x8CF7e3aa6fAf6Ae180E5eC3f0fb95081C2086eBe',
    chainId: CHAIN_ID,
    symbol: 'SX',
    decimals: 18,
    name: 'SX Network',
    icon: '/images/tokens/sx.webp'
  },
  dei: {
    address: '0xDE1E704dae0B4051e80DAbB26ab6ad6c12262DA0',
    chainId: CHAIN_ID,
    symbol: 'DEI',
    decimals: 18,
    name: 'DEI',
    icon: '/images/tokens/dei.webp'
  },
  ibex: {
    address: '0x56659245931CB6920e39C189D2a0e7DD0dA2d57b',
    chainId: CHAIN_ID,
    symbol: 'IBEX',
    decimals: 18,
    name: 'IBEX',
    icon: '/images/tokens/ibex.svg'
  },
  war: {
    address: '0x1F6E4B5fFc94cCA08cF6BB1479148d6329d4bAF5',
    chainId: CHAIN_ID,
    symbol: 'WAR',
    decimals: 18,
    name: 'WAR',
    icon: '/images/tokens/war.webp'
  },
  aave: {
    chainId: CHAIN_ID,
    address: '0xba5DdD1f9d7F570dc94a51479a000E3BCE967196',
    decimals: 18,
    symbol: 'AAVE',
    name: 'Aave Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreicmsnivbvp2xd3ewcjb5kybgnbnevbcojhn4mgub7rregnbtqcige'
  },
  plvglp: {
    chainId: CHAIN_ID,
    address: '0x5326E71Ff593Ecc2CF7AcaE5Fe57582D6e74CFF1',
    decimals: 18,
    symbol: 'PLVGLP',
    name: 'Plutus Vault GLP',
    icon: 'https://arbiscan.io/token/images/plutusdao_32.png'
  }
};
