import { Chain } from 'viem';

export interface ABIEntry {
  inputs?: Array<{ name: string; type: string }>;
  name?: string;
  stateMutability?: string;
  outputs?: Array<{ name: string; type: string }>;
  type: string;
}

export interface IContractInfo {
  name: string;
  src: string;
  networks: {
    [network: string]: {
      address: string;
    };
  };
  chains: Chain[];
}
