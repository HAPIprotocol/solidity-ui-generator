import { IConfig } from './config';
import mainnet from './env-defaults/mainnet';
import testnet from './env-defaults/testnet';

enum EEnvironment {
  TESTNET = 'testnet',
  MAINNET = 'mainnet',
}

const environments: { [key in EEnvironment]: IConfig } = {
  [EEnvironment.MAINNET]: mainnet,
  [EEnvironment.TESTNET]: testnet,
};

const currentEnvironment: EEnvironment =
  (process.env.REACT_APP_ENVIRONMENT as EEnvironment) || EEnvironment.MAINNET;

export const { walletConnectProjectId }: IConfig = {
  ...environments[currentEnvironment],
};
