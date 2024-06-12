import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Juice',
  ICON_MAP: {
    HYPLP: "https://ipfs.near.social/ipfs/bafkreicmoqlzhbbtohr7hv7kaudff3x6igg6qr2kf3soal64tadk5zlgy4",
    WETH: "https://ipfs.near.social/ipfs/bafkreif5jqf6onhhj6aqfjt6zq2lqanw6o3kzmb7exnqjw42p4hpwrojmu",
    wJUICE: "https://app.juice.finance/images/logos/juice.svg",
    USDB: "https://app.juice.finance/images/logos/tokens/usdb.svg",
    wUSDB: "https://app.juice.finance/images/logos/protocols/wasabi.svg",
    DUSD: "https://app.juice.finance/images/logos/tokens/dusd.svg"
  }
};
const USDB_POOLS = {
  PROXY_ADDRESS: "0xc877b52c628dba77fc55f1ddb140747155c9b39d",
  LENDING_POOL_ADDRESS: "0x4A1d9220e11a47d8Ab22Ccd82DA616740CF0920a",
  SYMBOL_ADDRESS: "0x4300000000000000000000000000000000000003",
  vaults: [{
    icon: "	https://app.juice.finance/images/logos/protocols/hyperlock.svg",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "USDB/WETH 0.05% LP",
    type: "Liquidity Pools",
    protocol: "Hyperlock <> Thruster V3",
    token0: "USDB",
    token1: "HYPLP",
    strategyAddress: "0xd04c891876675f8c02160ee33466315ac13afc38",
    vaultAddress: "0xd04c891876675f8c02160ee33466315ac13afc38",
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
    icon: "https://app.juice.finance/images/logos/protocols/particle.svg",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "USDB Boosted Points",
    type: "Misc",
    protocol: "Particle",
    token0: "USDB",
    token1: "DUSD",
    strategyAddress: "0x542A672B1DEa78EFd83B9D7D8CAe76cEa59964a1",
    vaultAddress: "0x542A672B1DEa78EFd83B9D7D8CAe76cEa59964a1",
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
    icon: "	https://app.juice.finance/images/logos/protocols/wasabi.svg",
    iconBgColor: "transparent",
    borderColor: "transparent",
    name: "wUSDB Vault",
    type: "Perps",
    protocol: "Wasabi",
    token0: "USDB",
    token1: "wUSDB",
    strategyAddress: "0x0CA56aa647E83A8F0a5f7a81a2fdcA393bC68D78",
    vaultAddress: "0x0CA56aa647E83A8F0a5f7a81a2fdcA393bC68D78",
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
const WETH_POOLS = {
  PROXY_ADDRESS: "0x23eBa06981B5c2a6f1a985BdCE41BD64D18e6dFA",
  LENDING_POOL_ADDRESS: "0x44f33bC796f7d3df55040cd3C631628B560715C2",
  SYMBOL_ADDRESS: "0x4300000000000000000000000000000000000004",
  vaults: [{
    icon: "https://app.juice.finance/images/logos/protocols/etherfi.svg",
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
    icon: "https://app.juice.finance/images/logos/protocols/kelp.svg",
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
    icon: "https://app.juice.finance/images/logos/protocols/renzo.svg",
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
    icon: "https://app.juice.finance/images/logos/protocols/renzo.svg",
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
    icon: "https://app.juice.finance/images/logos/juice.svg",
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
    icon: "https://app.juice.finance/images/logos/juice.svg",
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
    icon: "https://app.juice.finance/images/logos/protocols/wasabi.svg",
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
    icon: "https://app.juice.finance/images/logos/protocols/thruster.svg",
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

const networks = {
  // blast
  81457: {
    SymbolList: ['USDB Vaults', 'WETH Vaults'],
    PoolsMapping: {
      0: USDB_POOLS,
      1: WETH_POOLS
    }
  },
};

export default { basic, networks };
