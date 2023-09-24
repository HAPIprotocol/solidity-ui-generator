import { createPublicClient, createWalletClient, custom, http } from 'viem';

import { chains } from 'services/config';

const [chain] = chains;

export const publicClient = createPublicClient({
  chain: chain,
  transport: http(),
});

export const walletClient = window.ethereum
  ? createWalletClient({
      chain: chain,
      transport: custom(window.ethereum),
    })
  : null;
