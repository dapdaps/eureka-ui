
const basic = {
  name: "arrakis-finance",
  logo: "https://ipfs.near.social/ipfs/bafkreibgmu62fb5o3n3s54srlzyf7ppn2c42racp5q3gnukcjgkfwkzuse",
  amountOutFn: "bluebiu.near/widget/Liquidity.ARRAKISFINANCE",
  ICON_VAULT_MAP: {
    "WETH": "https://app.steer.finance/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftrustwallet%2Fassets%2Fmaster%2Fblockchains%2Fethereum%2Fassets%2F0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2%2Flogo.png&w=128&q=100",
    "STONE": "https://app.steer.finance/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fks-setting-1d682dca%2Fdee351e5-ff61-4a8f-994d-82f3078119661696785945490.png&w=128&q=100",
    "wUSDM": "https://app.steer.finance/_next/image?url=https%3A%2F%2Fassets.coingecko.com%2Fcoins%2Fimages%2F33785%2Fstandard%2FwUSDM_PNG_240px.png%3F1702981552&w=128&q=100",
    "USDC": "https://app.steer.finance/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftrustwallet%2Fassets%2Fmaster%2Fblockchains%2Fethereum%2Fassets%2F0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48%2Flogo.png&w=128&q=100",
    "USDT": "https://app.steer.finance/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftrustwallet%2Fassets%2Fmaster%2Fblockchains%2Fethereum%2Fassets%2F0xdAC17F958D2ee523a2206206994597C13D831ec7%2Flogo.png&w=128&q=100",
    "WBTC": "https://app.steer.finance/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftrustwallet%2Fassets%2Fmaster%2Fblockchains%2Fethereum%2Fassets%2F0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599%2Flogo.png&w=128&q=100",
    "MANTA": "https://app.steer.finance/_next/image?url=https%3A%2F%2Fi.imgur.com%2FQMlGUKa.png&w=128&q=100",
    "m.USDT": "https://app.steer.finance/_next/image?url=https%3A%2F%2Fcdn.sushi.com%2Fimage%2Fupload%2Ff_auto%2Cc_limit%2Cw_48%2Fd_unknown.png%2Ftokens%2F1088%2F0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC.jpg&w=128&q=100",
    "m.USDC": "https://app.steer.finance/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2FMaiaDAO%2Ftoken-list%2Fmain%2F0xEA32A96608495e54156Ae48931A7c20f0dcc1a21.png&w=128&q=100",
    "WMETIS": "https://app.steer.finance/_next/image?url=https%3A%2F%2Fcdn.sushi.com%2Fimage%2Fupload%2Ff_auto%2Cc_limit%2Cw_48%2Fd_unknown.png%2Ftokens%2F1088%2F0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481.jpg&w=128&q=100",
    "artMETIS": "/images/unknow.png"
  }
};
const networks = {
  // metis
  1088: {
    ALL_DATA_URL: "https://subgraph.satsuma-prod.com/769a117cc018/steer/steer-protocol-metis/api",
    FEE_APR_URL: "/pool/fee-apr",
    ammName: "Hercules",
    ammImage: "https://app.steer.finance/_next/image?url=%2Ficons%2Fhercules.png&w=256&q=75",
    pairs: [{
      id: "W m.USDT-m.USDC",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "m.USDT",
      token1: "m.USDC",
      decimals0: 6,
      decimals1: 6,
      poolAddress: "0xa1b0a025669eae9dd3133e9fa2c2c30ea8399b2a"
    }, {
      id: "W WETH-WMETIS",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "WETH",
      token1: "WMETIS",
      decimals0: 18,
      decimals1: 18,
      poolAddress: "0xbd718c67cd1e2f7fbe22d47be21036cd647c7714"
    }, {
      id: "W WETH-m.USDC",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "WETH",
      token1: "m.USDC",
      decimals0: 18,
      decimals1: 6,
      poolAddress: "0x35096c3ca17d12cbb78fa4262f3c6eff73ac9ffc"
    }, {
      id: "W WMETIS-m.USDC",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "WMETIS",
      token1: "m.USDC",
      decimals0: 18,
      decimals1: 6,
      poolAddress: "0xa4e4949e0cccd8282f30e7e113d8a551a1ed1aeb"
    }, {
      id: "N artMETIS-WMETIS",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "artMETIS",
      token1: "WMETIS",
      decimals0: 18,
      decimals1: 18,
      poolAddress: "0xfd1f58c4c05d8ed5040ee9ba7edb5cc5bf53930e"
    }],
    addresses: {
      "m.USDT": "0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc",
      "m.USDC": "0xea32a96608495e54156ae48931a7c20f0dcc1a21",
      "WETH": "0x420000000000000000000000000000000000000a",
      "WMETIS": "0x75cb093e4d61d2a2e65d8e0bbb01de8d89b53481",
      "artMETIS": "0x2583a2538272f31e9a15dd12a432b8c96ab4821d",

      "W m.USDT-m.USDC": "0x8bdfba00b0553fc316c6798832900d369bb23125",
      "W WETH-WMETIS": "0xdc4a852bc9358a326c5ae1feb681815bbacc27a2",
      "W WETH-m.USDC": "0xce2e58630c76f76c355109fff1e2976a2c409bd2",
      "W WMETIS-m.USDC": "0x029b7195e376e211d34212182f91925bf749023f",
      "N artMETIS-WMETIS": "0x252d0af80d46652a74b062be56c1cc38324d3ea4"
    },
  },
  // manta
  169: {
    ALL_DATA_URL: "https://subgraph.steer.finance/manta/subgraphs/name/steerprotocol/steer-manta",
    STAKING_POOLS_URL: "https://9i52h964s3.execute-api.us-east-1.amazonaws.com/dev/staking-pools",
    FEE_APR_URL: "/pool/fee-apr",
    ammName: "QuickSwap",
    ammImage: "https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg",
    pairs: [{
      id: "N WETH-STONE",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "WETH",
      token1: "STONE",
      decimals0: 18,
      decimals1: 18,
      stakingAddress: '0xda3B0De674EbbC0C7e4511736BA64F9Fb4bF4434'
    }, {
      id: "W wUSDM-STONE",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "wUSDM",
      token1: "STONE",
      decimals0: 18,
      decimals1: 18,
      stakingAddress: '0xd24dcf41c944e12800d240915f17b31f8a845e7a'
    }, {
      id: "N USDC-USDT",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "USDC",
      token1: "USDT",
      decimals0: 6,
      decimals1: 6,
      stakingAddress: '0xe651604d065200db4ceb552524f58fd6c5b65220'
    }, {
      id: "N USDC-wUSDM",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "USDC",
      token1: "wUSDM",
      decimals0: 6,
      decimals1: 18,
      stakingAddress: '0xbb91f8734a3947ac5f8846c3d3b6e2aab05a9ba3'
    }, {
      id: "W WETH-USDC",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "WETH",
      token1: "USDC",
      decimals0: 18,
      decimals1: 6,
      stakingAddress: '0xea5f7c83724d74d5348280fce32c1efd7bf18ecd'
    }, {
      id: "N WETH-WBTC",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "WETH",
      token1: "WBTC",
      decimals0: 18,
      decimals1: 8,
      stakingAddress: '0x8848cfc66f2d24f97c4456931b44da2aa2a7664b'
    }, {
      id: "N WETH-MANTA",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "WETH",
      token1: "MANTA",
      decimals0: 18,
      decimals1: 18,
      stakingAddress: '0x232246aca060a711f79a956a2368dff28cb1da49'
    }, {
      id: "W MANTA-STONE",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "MANTA",
      token1: "STONE",
      decimals0: 18,
      decimals1: 18,
      stakingAddress: '0xaf413a5e60d18ed3567d48d03ad305cf1761d645'
    },],
    addresses: {
      WETH: "0x0dc808adce2099a9f62aa87d9670745aba741746",
      STONE: "0xec901da9c68e90798bbbb74c11406a32a70652c3",
      wUSDM: "0xbdad407f77f44f7da6684b416b1951eca461fb07",
      USDC: "0xb73603c5d87fa094b7314c74ace2e64d165016fb",
      USDT: "0xf417f5a458ec102b90352f697d6e2ac3a3d2851f",
      WBTC: "0x305e88d809c9dc03179554bfbf85ac05ce8f18d6",
      MANTA: "0x95cef13441be50d20ca4558cc0a27b601ac544e5",

      "N WETH-STONE": "0x8451bd897c128fbbb4aef45a0a92d7da420d8146",
      "W wUSDM-STONE": "0x8deef181002533c81ce9db81cb61a8dd8ece9f5f",
      "N USDC-USDT": "0xbfff632091ce8d5bcc2bd960c419afd0291d13b4",
      "N USDC-wUSDM": "0x9b20887d7376f7e575caa6a115329e364d54af58",
      "W WETH-USDC": "0x791f7ccc726d9a857c54b2bf8f9fd1464f62216a",
      "N WETH-WBTC": "0x9a3a74b7ecc0f2c838a1de6c8253a458b56c7ffb",
      "N WETH-MANTA": "0x9ea10ed3d30b034a5eebdf1f1e5c34a72124abfc",
      "W MANTA-STONE": "0xa1cd0f7f8876fdd6e4db51ead0ef1fd5de971183"
    }
  }
};

export default { basic, networks };
