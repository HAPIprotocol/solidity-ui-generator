import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import manifest from 'manifest.json';
import { getPlaceholder } from 'shared/helpers/web3/abi-encoder';
import { ABIEntry } from 'shared/models';

import List from './components/List';
import InputWithLabel from '../InputWithLabel';

interface IContractInfo {
  name: string;
  src: string;
  networks: {
    [network: string]: {
      address: string;
    };
  };
}

const ContractResult: React.FC = () => {
  const [abi, setAbi] = useState<ABIEntry[]>([]);
  const [selectedContract, setSelectedContract] =
    useState<IContractInfo | null>(null);
  const [inputArguments, setInputArguments] = useState<
    Array<{ name: string; type: string }>
  >([]);

  const contractPath = selectedContract?.src.split('/') || [' '];

  const contractPathDirectory = contractPath[contractPath.length - 1];

  const lastDotIndex = contractPathDirectory.lastIndexOf('.');

  const nameAbiFile = contractPathDirectory.slice(0, lastDotIndex);

  const isNotUploadedFiles = !contractPathDirectory || !nameAbiFile;

  const contractButtonActive = 'bg-amber-50 text-black';

  useEffect(() => {
    const getAbi = async () => {
      try {
        if (isNotUploadedFiles) return;
        const data = await import(
          `artifacts/contracts/${contractPathDirectory}/${nameAbiFile}.json`
        );
        if (!data) return;
        setAbi(data.abi);
      } catch (e) {
        console.error(e);
      }
    };
    getAbi();
  }, [contractPathDirectory]);

  return (
    <div className='flex h-screen bg-black'>
      <aside
        className='
        bg-gray-900
        w-1/4
        p-5
        flex
        items-center
        border-gray-800
        border-r
        mr-10
        overflow-x-hidden
        '>
        {!isNotUploadedFiles ? (
          <List
            abi={abi}
            setArguments={setInputArguments}
          />
        ) : (
          <div
            className='
          flex
          justify-center
          text-white
          '>
            <div>Please select one of the available contracts</div>
          </div>
        )}
      </aside>
      <section className='h-screen w-screen'>
        <div className='flex gap-3'>
          {manifest.contracts.map((contract) => (
            <button
              className={classNames(
                'outline-0',
                'p-3',
                'rounded, border',
                'border-gray-500',
                contract.name !== selectedContract?.name && 'text-gray-50',
                'transition',
                contract.name === selectedContract?.name && contractButtonActive
              )}
              onClick={() => setSelectedContract(contract)}
              key={contract.name}>
              {contract.name}
            </button>
          ))}
        </div>
        <div className='func-body'>
          <>
            {inputArguments.length ? (
              <>
                {inputArguments.map((input, index) => (
                  <InputWithLabel
                    key={`input-${index}`}
                    placeholder={getPlaceholder(input.type)}
                    label={`${input.name || '<input>'} (${input.type})`}
                  />
                ))}
                <div
                  className='
            write-button
            w-20
            h-10
            bg-amber-50
            rounded mt-5
            flex
            justify-center
            align-middle
            items-center
            cursor-pointer
            hover:bg-amber-100
            transition
            '
                  onClick={() => undefined}>
                  Write
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        </div>
      </section>
    </div>
  );
};

export default ContractResult;
