import { EMPTY_STRING } from 'shared/constants';
import { IContractInfo } from 'shared/models';

export const sliceString = (text: string, step = 4): string => {
  if (!text) return EMPTY_STRING;

  if (text.length > 20) {
    const head = text.substring(0, step);
    const tail = text.substring(text.length - step, text.length);
    return `${head}…${tail}`;
  }
  return text;
};

export const getAbiPaths = (
  contract: IContractInfo | null
): {
  isNotUploadedFiles: boolean;
  contractPathDirectory: string;
  nameAbiFile: string;
} => {
  const contractPath = contract?.src.split('/') || [' '];

  const contractPathDirectory = contractPath[contractPath.length - 1];

  const lastDotIndex = contractPathDirectory.lastIndexOf('.');

  const nameAbiFile = contractPathDirectory.slice(0, lastDotIndex);

  const isNotUploadedFiles = !contractPathDirectory || !nameAbiFile;

  return {
    isNotUploadedFiles,
    contractPathDirectory,
    nameAbiFile,
  };
};
