
const basic = {
  name: "steer",
  icon: "https://s3.amazonaws.com/dapdap.prod/images/154-steerfinance.png",
  dappSrc: 'bluebiu.near/widget/Liquidity.STEER',
  amountOutFn: "bluebiu.near/widget/Liquidity.STEER",
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
    "artMETIS": "https://token-list.hercules.exchange/assets/artMETIS.svg",
    "USDB": "https://app.steer.finance/_next/image?url=https%3A%2F%2Fcdn.sushi.com%2Fimage%2Fupload%2Ff_auto%2Cc_limit%2Cw_64%2Cq_auto%2Ftokens%2F81457%2F0x4300000000000000000000000000000000000003.jpg&w=128&q=100",
    "PAC": "",
    "pxETH": "https://app.steer.finance/_next/image?url=https%3A%2F%2Ffenix-dex-api.vercel.app%2Ftokens%2FpxETH.png&w=128&q=100",

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
      stakingAddress: '0xda3B0De674EbbC0C7e4511736BA64F9Fb4bF4434',
      poolAddress: '0xa5101d48355d5d731c2bedd273aa0eb7ed55d0c7'
    }, {
      id: "W wUSDM-STONE",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "wUSDM",
      token1: "STONE",
      decimals0: 18,
      decimals1: 18,
      stakingAddress: '0xd24dcf41c944e12800d240915f17b31f8a845e7a',
      poolAddress: '0x1a6378383258a5d8ae40d383200ae29c53e85af9'
    }, {
      id: "N USDC-USDT",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "USDC",
      token1: "USDT",
      decimals0: 6,
      decimals1: 6,
      stakingAddress: '0xe651604d065200db4ceb552524f58fd6c5b65220',
      poolAddress: '0x462609c41ca27bd4240778c53c0908542b59b972'
    }, {
      id: "N USDC-wUSDM",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "USDC",
      token1: "wUSDM",
      decimals0: 6,
      decimals1: 18,
      stakingAddress: '0xbb91f8734a3947ac5f8846c3d3b6e2aab05a9ba3',
      poolAddress: '0xba411f7a5be3dff6663ee3fa1918fcdcdda53055'
    }, {
      id: "W WETH-USDC",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "WETH",
      token1: "USDC",
      decimals0: 18,
      decimals1: 6,
      stakingAddress: '0xea5f7c83724d74d5348280fce32c1efd7bf18ecd',
      poolAddress: '0x739ee4c59ed05fcaab772ee6cee1f39d360740be'
    }, {
      id: "N WETH-WBTC",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "WETH",
      token1: "WBTC",
      decimals0: 18,
      decimals1: 8,
      stakingAddress: '0x8848cfc66f2d24f97c4456931b44da2aa2a7664b',
      poolAddress: '0xfc9ffc1c6e0ebf7be3ce93245b309f4d3b593101'
    }, {
      id: "N WETH-MANTA",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "WETH",
      token1: "MANTA",
      decimals0: 18,
      decimals1: 18,
      stakingAddress: '0x232246aca060a711f79a956a2368dff28cb1da49',
      poolAddress: '0x97433019b560c1c20055ba5edc8eef226f2d1be7'
    }, {
      id: "W MANTA-STONE",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "MANTA",
      token1: "STONE",
      decimals0: 18,
      decimals1: 18,
      stakingAddress: '0xaf413a5e60d18ed3567d48d03ad305cf1761d645',
      poolAddress: '0x665b3941a7801900d8a9cf0e6b5a3299d31afd7b'
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
  },
  81457: {
    ALL_DATA_URL: "https://api.goldsky.com/api/public/project_clohj3ta78ok12nzs5m8yag0b/subgraphs/steer-protocol-blast/1.1.1/gn",
    STAKING_POOLS_URL: "https://9i52h964s3.execute-api.us-east-1.amazonaws.com/dev/staking-pools",
    FEE_APR_URL: "/pool/fee-apr",
    ammName: "Thruster",
    ammImage: "	https://app.steer.finance/icons/thruster.svg",
    pairs: [{
      id: "W USDB-WETH",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "USDB",
      token1: "WETH",
      decimals0: 18,
      decimals1: 18,
      poolAddress: '0xcd03572e7cfb94996beebaa539234ce5c23ae1d6',
      ammName: "Sushi",
      ammImage: "https://app.steer.finance/_next/image?url=https%3A%2F%2Fsteer.finance%2Fwp-content%2Fuploads%2F2023%2F05%2Fsushiswap-sushi-logo.png&w=256&q=75",
    },
    {
      id: "W USDB-axlUSDC",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "USDB",
      token1: "axlUSDC",
      decimals0: 18,
      decimals1: 18,
      poolAddress: '0xbbeb0f9a75705f44e7026ec79727cc39581feeb7',
      ammName: "Sushi",
      ammImage: "https://app.steer.finance/_next/image?url=https%3A%2F%2Fsteer.finance%2Fwp-content%2Fuploads%2F2023%2F05%2Fsushiswap-sushi-logo.png&w=256&q=75",
    },
    {
      id: "W2 USDB-WETH",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "USDB",
      token1: "WETH",
      decimals0: 18,
      decimals1: 18,
      poolAddress: '0xf00da13d2960cf113edcef6e3f30d92e52906537'
    }, {
      id: "W WETH-PAC",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "WETH",
      token1: "PAC",
      decimals0: 18,
      decimals1: 18,
      poolAddress: '0x6e3d09ffd8d35604652e74f7128f08c8474365d6'
    }, {
      id: "W USDB-WBTC",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "USDB",
      token1: "WBTC",
      decimals0: 18,
      decimals1: 8,
      poolAddress: '0xe6d7c6b51ea6d613ec14513f9cefa13fb852d12b'
    }, {
      id: "N WETH-pxETH",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "WETH",
      token1: "pxETH",
      decimals0: 18,
      decimals1: 18,
      poolAddress: '0x1df83f225455dbecfe1e05e3a23affe94565bd32'
    }, {
      id: "W WETH-WBTC",
      strategy: "Dynamic",
      strategy2: "Wide",
      token0: "WETH",
      token1: "WBTC",
      decimals0: 18,
      decimals1: 8,
      poolAddress: '0xecb1c17a51d782ac2757e2ab568d159854b9b4bd'
    }, {
      id: "N sfrxETH-WETH",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "sfrxETH",
      token1: "WETH",
      decimals0: 18,
      decimals1: 18,
      poolAddress: '0x559e44572145aabf6fdbc7e49db92bb6e6079c66'
    }],
    addresses: {
      "USDB": "0x4300000000000000000000000000000000000003",
      "WETH": "0x4300000000000000000000000000000000000004",
      "PAC": "0x5ffd9ebd27f2fcab044c0f0a26a45cb62fa29c06",
      "WBTC": "0xf7bc58b8d8f97adc129cfc4c9f45ce3c0e1d2692",
      "pxETH": "0x9e0d7d79735e1c63333128149c7b616a0dc0bbdb",
      "sfrxETH": "0x1f55a02a049033e3419a8e2975cf3f572f4e6e9a",
      "axlUSDC": "0xeb466342c4d449bc9f53a865d5cb90586f405215",

      "W USDB-WETH": "0x9753ac312f15f27591407c73136bc7a3b161d6dd",
      "W USDB-axlUSDC": "0xcd5c2edcaca6c699b641db03cfd0dc004b733a06",
      "W2 USDB-WETH": "0x6f67080223add653e1584fc73596cad1269169ec",
      "W WETH-PAC": "0x9ef1225833033a12bc2266755cf50067e47130bd",
      "W USDB-WBTC": "0x5b353677edb1ccf3ba39aed840b3f86bc1b6c6af",
      "N WETH-pxETH": "0x875f0c2a2959ce6179058002525d7151c2098161",
      "W WETH-WBTC": "0x7b2eb4046c9bb13a73c1d736c9a0e87d096e0a75",
      "N sfrxETH-WETH": "0x33cfa854933c20a95b573c021bc1c4634c57ed20"
    }
  }
};

export default { basic, networks };
