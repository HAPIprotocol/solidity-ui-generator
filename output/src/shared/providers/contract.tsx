import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Chain } from 'viem/_types/types/chain';

import manifest from 'manifest.json';
import { IContractInfo } from 'shared/models';

interface IContractContext {
  chain: Chain | null;
  selectedContract: IContractInfo | null;
  setSelectedContract: Dispatch<SetStateAction<IContractInfo | null>>;
}

export const ContractContext = createContext<IContractContext>(
  {} as IContractContext
);

export const useContractContext = () => useContext(ContractContext);

export function ContractProvider({ children }: PropsWithChildren) {
  const [chain, setChain] = useState<Chain | null>(null);
  const [selectedContract, setSelectedContract] =
    useState<IContractInfo | null>(null);

  const value = { chain, setSelectedContract, selectedContract };

  const memoizedValue = useMemo(() => value, [value]);

  return (
    <ContractContext.Provider value={memoizedValue}>
      {children}
    </ContractContext.Provider>
  );
}
