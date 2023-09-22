import React, { useState } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import InputWithLabel from 'shared/components/InputWithLabel';
import { getPlaceholder } from 'shared/helpers/web3/abi-encoder';
import { ABIEntry } from 'shared/models';

interface IFunction {
  func: ABIEntry;
  index: number;
}

const FunctionComponent: React.FC<IFunction> = ({ func, index }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleFunc = () => setIsOpen((value) => !value);

  return (
    <div className='mt-4 text-left border border-gray-600 rounded p-5'>
      <div
        className='func-header cursor-pointer flex justify-between align-middle'
        onClick={toggleFunc}>
        <span className='text-white text-left'>{`${index + 1}. ${
          func?.name || 'Undefined name'
        }`}</span>
        {!isOpen ? (
          <AiOutlineArrowDown fill='white' />
        ) : (
          <AiOutlineArrowUp fill='white' />
        )}
      </div>
      {isOpen && (
        <div className='func-body'>
          {func.inputs?.map((input, index) => (
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
        </div>
      )}
    </div>
  );
};

export default FunctionComponent;
