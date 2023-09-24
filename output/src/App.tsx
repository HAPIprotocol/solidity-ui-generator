import React from 'react';
import './App.css';
import { WindowProvider } from 'wagmi';

import ContractResult from './shared/components/contract-result';
import Header from './shared/components/header';
import { WagmiProvider } from './shared/providers/wallet';

declare global {
  interface Window {
    ethereum: WindowProvider;
  }
}

function App() {
  return (
    <WagmiProvider>
      <div className='App'>
        <Header />
        <ContractResult />
      </div>
    </WagmiProvider>
  );
}

export default App;
