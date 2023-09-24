import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { PropsWithChildren } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import { chains, walletConnectProjectId as projectId } from 'services/config';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);

export function WagmiProvider({ children }: PropsWithChildren) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
