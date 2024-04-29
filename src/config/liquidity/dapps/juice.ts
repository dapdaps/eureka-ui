import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Juice',
  ICON_MAP: {
    HYPLP: "https://ipfs.near.social/ipfs/bafkreicmoqlzhbbtohr7hv7kaudff3x6igg6qr2kf3soal64tadk5zlgy4",
    WETH: "https://ipfs.near.social/ipfs/bafkreif5jqf6onhhj6aqfjt6zq2lqanw6o3kzmb7exnqjw42p4hpwrojmu"
  }
};
const networks = {
  // blast
  81457: {
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
      icon: "https://app.juice.finance/images/logos/protocols/renzo.svg",
      iconBgColor: "#000",
      name: "Kelp V3 LP V2",
      type: "Liquidity Pools",
      protocol: "Hyperlock <> Thruster V3",
      token0: "WETH",
      token1: "HYPLP",
      strategyAddress: "0x9Dfd4094b3e88f3b9E79b04514B1669D6779AeC9",
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
      icon: "https://app.juice.finance/images/logos/juice.svg",
      iconBgColor: "#000",
      name: "JUICE/WETH LP",
      type: "Liquidity Pools",
      protocol: "Hyperlock <> Thruster V2",
      token0: "WETH",
      token1: "HYPLP",
      strategyAddress: "0x576314F851732b208d807260FE19FeC7Dba3E40C",
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
        label: "Thruster Points",
      }, {
        type: "points",
        label: "Hyperlock Points",
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
      pointList: [{
        type: "deposited",
        label: "Total Deposited",
      }, {
        type: "points",
        label: "Thruster Points",
      }]
    }],
  },
};

export default { basic, networks };
