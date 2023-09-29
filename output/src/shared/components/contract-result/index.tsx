import Big from 'big.js';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import manifest from 'manifest.json';
import { EMPTY_STRING } from 'shared/constants';
import { getPlaceholder } from 'shared/helpers/web3/abi-encoder';
import { ABIEntry, IContractInfo } from 'shared/models';
import { useContractContext } from 'shared/providers/contract';
import { getAbiPaths } from 'shared/utils/formatString';
import { formatType } from 'shared/utils/formatTypes';

import List from './components/List';
import InputWithLabel from '../InputWithLabel';

export type FormValues = {
  arguments: { name: string; type: string; value: string }[];
};

const ContractResult: React.FC = () => {
  const [abi, setAbi] = useState<ABIEntry[]>([]);
  const [inputArguments, setInputArguments] = useState<
    Array<{ name: string; type: string }>
  >([]);

  const { setSelectedContract, selectedContract } = useContractContext();

  const contractButtonActive = 'bg-amber-50 text-black';
  const { nameAbiFile, contractPathDirectory, isNotUploadedFiles } =
    getAbiPaths(selectedContract);

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

  const defaultValues = {
    arguments: inputArguments,
  };

  const methods = useForm<FormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues,
  });

  const { control, handleSubmit, setValue } = methods;
  const { fields } = useFieldArray({
    name: 'arguments',
    control,
  });

  useEffect(() => {
    const newArray = inputArguments.map((el) => ({
      ...el,
      value: EMPTY_STRING,
    }));
    setValue('arguments', newArray);
  }, [inputArguments, setValue]);

  const onSubmit = (data: FormValues) => {
    const params: (string | Big)[] = [];
    const valuesArray = data.arguments.map((arg) => {
      return { value: formatType(arg.type, arg.value) };
    });
    valuesArray.forEach((el) => params.push(el.value));
    console.log(params);
  };

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
              onClick={() => setSelectedContract(contract as IContractInfo)}
              key={contract.name}>
              {contract.name}
            </button>
          ))}
        </div>
        <div className='func-body'>
          <>
            {inputArguments.length ? (
              <>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((input, index) => (
                      <InputWithLabel
                        key={`input-${index}`}
                        index={index}
                        placeholder={getPlaceholder(input.type)}
                        label={`${input.name || '<input>'} (${input.type})`}
                      />
                    ))}
                    <input
                      type='submit'
                      value='Write'
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
                    />
                  </form>
                </FormProvider>
              </>
            ) : (
              <span
                className='
                text-gray-50
                mt-10
                block
                '>
                You have to choose method
              </span>
            )}
          </>
        </div>
      </section>
    </div>
  );
};

export default ContractResult;
