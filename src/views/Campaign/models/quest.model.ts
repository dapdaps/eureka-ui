export interface Quest {
  id: number;
  name: string;
  description: string;
  category: string;
  category_id: number;
  source: string;
  dapps: string;
  networks: string;
  to_networks: string;
  extra_data: string;
  spins: number;
  times: number;
  template: string;
  campaign_id: number;
  category_name: string;
  total_spins: number;

  operators?: {
    dapp_id: number;
    dapp_logo: string;
    dapp_name: string;
    dapp_network: {
      chain_id: number;
      dapp_id: number;
      dapp_src: string;
      network_id: number;
    }[];
    default_chain_id: number;
    route: string;
    theme: string;
  }[];
}
