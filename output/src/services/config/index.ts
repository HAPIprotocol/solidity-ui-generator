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
  (process.env.ENVIRONMENT as EEnvironment) || EEnvironment.MAINNET;

export const { walletConnectProjectId, chains }: IConfig = {
  ...environments[currentEnvironment],
};
