import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Juice',
  ICON_MAP: {
    HYPLP: "https://ipfs.near.social/ipfs/bafkreicmoqlzhbbtohr7hv7kaudff3x6igg6qr2kf3soal64tadk5zlgy4",
    WETH: "https://ipfs.near.social/ipfs/bafkreif5jqf6onhhj6aqfjt6zq2lqanw6o3kzmb7exnqjw42p4hpwrojmu",
    wJUICE: "/images/juice/juice.svg",
    USDB: "/images/juice/usdb.svg",
    wUSDB: "/images/juice/wasabi.svg",
    DUSD: "/images/juice/dusd.svg",
    DETH: "/images/juice/deth.svg",
    BLAST: "/images/juice/blast.webp"
  }
};
const WETH_WETH_POOLS = {
  PROXY_ADDRESS: "0x23eBa06981B5c2a6f1a985BdCE41BD64D18e6dFA",
  LENDING_POOL_ADDRESS: "0x44f33bC796f7d3df55040cd3C631628B560715C2",
  SYMBOL_ADDRESS: "0x4300000000000000000000000000000000000004",
  vaults: [{
    icon: "/images/juice/blast.webp",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "Blast WETH V3 LP",
    type: "Liquidity Pools",
    protocol: "Hyperlock <> Thruster V3",
    token0: "WETH",
    token1: "HYPLP",
    strategyAddress: "0x78E6265a11a41E5Dcd1431448d00f3524943fD11",
    vaultAddress: "0x9A0AA28d999a21d3cf6F2703CDBba9FeAF4a32F7",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Thruster Points",
    }, {
      type: "points",
      label: "Hyperlock Points",
    }]
  }, {
    icon: "/images/juice/blast.webp",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "Blast Spot",
    type: "Spot",
    protocol: "Thruster V3",
    token0: "WETH",
    token1: "BLAST",
    strategyAddress: "0x3FeC7f626923445F587C4881a80D00a7104782d1",
    vaultAddress: "0x9A0AA28d999a21d3cf6F2703CDBba9FeAF4a32F7",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Thruster Points",
    }]
  }, {
    icon: "/images/juice/particle.svg",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "WETH Boosted Points",
    type: "Misc",
    protocol: "Particle",
    token0: "WETH",
    token1: "DETH",
    strategyAddress: "0x6F3Bc2f9034C151326A80F5ca1Ee0F1eA1E6f002",
    vaultAddress: "",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "multiplier",
      label: "Points Multiplier",
    }, {
      type: "points",
      label: "Particle Points",
    }]
  }, {
    icon: "/images/juice/etherfi.svg",
    iconBgColor: "#FFF",
    name: "EtherFi V3 LP",
    type: "Liquidity Pools",
    protocol: "Hyperlock <> Thruster V3",
    token0: "WETH",
    token1: "HYPLP",
    strategyAddress: "0xEA42f500A92E4CAa02b2F10E323EadEE1F00fbF7",
    vaultAddress: "0xFE8FA9F973E1DB10578ED14ace06e9D29875Ff1A",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "EtherFi Points",
    }, {
      type: "points",
      label: "Eigen Layer Points",
    }, {
      type: "points",
      label: "Thruster Points",
    }, {
      type: "points",
      label: "Hyperlock Points",
    }]
  }, {
    icon: "/images/juice/kelp.svg",
    iconBgColor: "#000",
    name: "Kelp V3 LP V2",
    type: "Liquidity Pools",
    protocol: "Hyperlock <> Thruster V3",
    token0: "WETH",
    token1: "HYPLP",
    strategyAddress: "0x40214EDef589149b9cebb7BE7025197d885D6CB1",
    vaultAddress: "0x4cc9959Ae7A4d380C1100b271BC63D9961Ca162f",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Kelp Points",
    }, {
      type: "points",
      label: "Eigen Layer Points",
    }, {
      type: "points",
      label: "Thruster Points",
    }, {
      type: "points",
      label: "Hyperlock Points",
    }]
  }, {
    icon: "/images/juice/renzo.svg",
    iconBgColor: "#000",
    name: "Renzo V3 LP",
    type: "Liquidity Pools",
    protocol: "Hyperlock <> Thruster V3",
    token0: "WETH",
    token1: "HYPLP",
    strategyAddress: "0x9Dfd4094b3e88f3b9E79b04514B1669D6779AeC9",
    vaultAddress: "0x7BE481D464CAD7ad99500CE8A637599eB8d0FCDB",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Renzo Points",
    }, {
      type: "points",
      label: "Eigen Layer Points",
    }, {
      type: "points",
      label: "Thruster Points",
    }, {
      type: "points",
      label: "Hyperlock Points",
    }]
  }, {
    icon: "/images/juice/renzo.svg",
    iconBgColor: "#000",
    name: "Renzo Spot Long",
    type: "Spot",
    protocol: "Thruster V3",
    token0: "WETH",
    token1: "HYPLP",
    strategyAddress: "0x741011f52B7499ca951f8b8Ee547DD3Cdd813Fda",
    vaultAddress: "0x1d42751CE4F28F58e7b757A586615A0CF31566DF",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Renzo Points",
    }, {
      type: "points",
      label: "Eigen Layer Points",
    }, {
      type: "points",
      label: "Thruster Points",
    }]
  }, {
    icon: "/images/juice/juice.svg",
    iconBgColor: "#000",
    name: "JUICE/WETH LP",
    type: "Liquidity Pools",
    protocol: "Hyperlock <> Thruster V2",
    token0: "WETH",
    token1: "HYPLP",
    strategyAddress: "0x576314F851732b208d807260FE19FeC7Dba3E40C",
    vaultAddress: "0x576314F851732b208d807260FE19FeC7Dba3E40C",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Thruster Points",
    }, {
      type: "points",
      label: "Hyperlock Points",
    }]
  }, {
    icon: "/images/juice/juice.svg",
    iconBgColor: "#000",
    name: "JUICE Spot Long",
    type: "Spot",
    protocol: "Thruster <> Wasabi",
    token0: "WETH",
    token1: "wJUICE",
    strategyAddress: "0x15e44C3f3F9B34fC49cc15A18a597bf80F144bC9",
    vaultAddress: "0x4E4B4A3111d128628c427E78a2abAd1635fE6542",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Thruster Points",
    }, {
      type: "points",
      label: "Hyperlock Points",
    }]
  }, {
    icon: "/images/juice/wasabi.svg",
    iconBgColor: "#000",
    name: "wETH Vault",
    type: "Perps",
    protocol: "Wasabi",
    token0: "WETH",
    token1: "wJUICE",
    strategyAddress: "0x98546CdD046219b25B2E617A55563A5e4a3b9Adc",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Wasabi Points",
    }, {
      type: "apy",
      label: "Variable APY",
    }]
  }, {
    icon: "/images/juice/thruster.svg",
    iconBgColor: "#000",
    name: "WETH Short Spot",
    type: "Short Spot",
    protocol: "Thruster V3",
    token0: "WETH",
    token1: "USDB",
    strategyAddress: "0xC2eB02621e74E294B73B9fab0A94081393F31978",
    vaultAddress: "0xf00DA13d2960Cf113edCef6e3f30D92E52906537",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Thruster Points",
    }]
  }]
}
const WETH_USDB_POOLS = {
  PROXY_ADDRESS: "0x105e285f1a2370d325046fed1424d4e73f6fa2b0",
  LENDING_POOL_ADDRESS: "0x4A1d9220e11a47d8Ab22Ccd82DA616740CF0920a",
  SYMBOL_ADDRESS: ["0x4300000000000000000000000000000000000004", "0x4300000000000000000000000000000000000003"],
  vaults: [{
    icon: "/images/juice/usde.svg",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "Ethena USDE V3 LP",
    type: "Liquidity Pools",
    protocol: "Hyperlock <> Thruster V3",
    token0: "USDB",
    token1: "HYPLP",
    strategyAddress: "0xc1B1aE2502D2cDEF4772FB4A4a6fcBf4fd9c1b80",
    vaultAddress: "0x8C1bb76510D6873a4A156A9Cb394E74A3783BDB5",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "sats",
      label: "Ethena Sats",
    }, {
      type: "points",
      label: "Thruster Points",
    }, {
      type: "points",
      label: "Hyperlock Points",
    }]
  }, {
    icon: "/images/juice/particle.svg",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "USDB Boosted Points",
    type: "Misc",
    protocol: "Particle",
    token0: "USDB",
    token1: "DUSD",
    strategyAddress: "0x542A672B1DEa78EFd83B9D7D8CAe76cEa59964a1",
    vaultAddress: "",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Points Multiplier",
    }, {
      type: "points",
      label: "Particle Points",
    }]
  }, {
    icon: "/images/juice/thruster.svg",
    iconBgColor: "#000000",
    borderColor: "#000000",
    name: "WETH Spot Long",
    type: "Spot",
    protocol: "Thruster V3",
    token0: "USDB",
    token1: "WETH",
    strategyAddress: "0x4A355D57fc1A5eEB33C0a19539744A2144220027",
    vaultAddress: "0xf00DA13d2960Cf113edCef6e3f30D92E52906537",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Thruster Points",
    }]
  }]
}
const USDB_USDB_POOLS = {
  PROXY_ADDRESS: "0xc877b52c628dba77fc55f1ddb140747155c9b39d",
  LENDING_POOL_ADDRESS: "0x4A1d9220e11a47d8Ab22Ccd82DA616740CF0920a",
  SYMBOL_ADDRESS: "0x4300000000000000000000000000000000000003",
  vaults: [{
    icon: "/images/juice/usde.svg",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "Ethena USDE V3 LP",
    type: "Liquidity Pools",
    protocol: "Hyperlock <> Thruster V3",
    token0: "USDB",
    token1: "HYPLP",
    strategyAddress: "0xc1B1aE2502D2cDEF4772FB4A4a6fcBf4fd9c1b80",
    vaultAddress: "0x8C1bb76510D6873a4A156A9Cb394E74A3783BDB5",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "sats",
      label: "Ethena Sats",
    }, {
      type: "points",
      label: "Thruster Points",
    }, {
      type: "points",
      label: "Hyperlock Points",
    }]
  }, {
    icon: "/images/juice/hyperlock.svg",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "USDB/WETH 0.05% LP",
    type: "Liquidity Pools",
    protocol: "Hyperlock <> Thruster V3",
    token0: "USDB",
    token1: "HYPLP",
    strategyAddress: "0xd04c891876675f8c02160ee33466315ac13afc38",
    vaultAddress: "0x7f0DB0D77d0694F29c3f940b5B1F589FFf6EF2e0",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Thruster Points",
    }, {
      type: "points",
      label: "Hyperlock Points",
    }]
  }, {
    icon: "/images/juice/particle.svg",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "USDB Boosted Points",
    type: "Misc",
    protocol: "Particle",
    token0: "USDB",
    token1: "DUSD",
    strategyAddress: "0x542A672B1DEa78EFd83B9D7D8CAe76cEa59964a1",
    vaultAddress: "",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Points Multiplier",
    }, {
      type: "points",
      label: "Particle Points",
    }]
  }, {
    icon: "/images/juice/wasabi.svg",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "wUSDB Vault",
    type: "Perps",
    protocol: "Wasabi",
    token0: "USDB",
    token1: "wUSDB",
    strategyAddress: "0x0CA56aa647E83A8F0a5f7a81a2fdcA393bC68D78",
    vaultAddress: "",
    pointList: [{
      type: "deposited",
      label: "Total Deposited",
    }, {
      type: "points",
      label: "Wasabi Points",
    }, {
      type: "apy",
      label: "Variable APY",
    }]
  }]
}


const networks = {
  // blast
  81457: {
    SYMBOL_LIST: ['WETH/WETH', 'WETH/USDB', 'USDB/USDB'],
    POOLS_MAPPING: {
      0: WETH_WETH_POOLS,
      1: WETH_USDB_POOLS,
      2: USDB_USDB_POOLS,
    },
    SYMBOL_NAME_MAPPING: {
      0: ['WETH', 'WETH'],
      1: ['WETH', 'USDB'],
      2: ['USDB', 'USDB'],
    }
  },
};

export default { basic, networks };
