import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import React from 'react';
import './App.css';
import { Chain, WagmiConfig, configureChains, createConfig } from 'wagmi';

import manifest from 'manifest.json';
import { walletConnectProjectId } from 'services/config';
import { ContractProvider } from 'shared/providers/contract';

import ContractResult from './shared/components/contract-result';
import Header from './shared/components/header';

function App() {
  const chains = manifest.chains as Chain[];

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId: walletConnectProjectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId: walletConnectProjectId, chains }),
    publicClient,
  });

  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return (
    <ContractProvider>
      <WagmiConfig config={wagmiConfig}>
        <div className='App'>
          <Header />
          <ContractResult />
        </div>
      </WagmiConfig>
      <Web3Modal
        projectId={walletConnectProjectId}
        ethereumClient={ethereumClient}
      />
    </ContractProvider>
  );
}

export default App;
