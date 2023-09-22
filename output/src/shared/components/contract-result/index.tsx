import React, { useEffect, useState } from 'react';

import manifest from 'manifest.json';
import { ABIEntry } from 'shared/models';

import List from './components/List';

const ContractResult: React.FC = () => {
  const [abi, setAbi] = useState<ABIEntry[]>([]);
  const [selectedContract, setSelectedContract] = useState<string>('');

  const contractPath = selectedContract.split('/');

  const contractPathDirectory = contractPath[contractPath.length - 1];

  const lastDotIndex = contractPathDirectory.lastIndexOf('.');

  const nameAbiFile = contractPathDirectory.slice(0, lastDotIndex);

  const isNotUploadedFiles = !contractPathDirectory || !nameAbiFile;

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
    <div className='flex h-screen'>
      <aside className='bg-black w-1/4 p-5 flex items-center'>
        {!isNotUploadedFiles ? (
          <List abi={abi} />
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
      <section>
        {manifest.contracts.map((contract) => (
          <button
            onClick={() => setSelectedContract(contract.src)}
            key={contract.name}
            style={{ marginRight: '10px' }}>
            {contract.name}
          </button>
        ))}
      </section>
    </div>
  );
};

export default ContractResult;
