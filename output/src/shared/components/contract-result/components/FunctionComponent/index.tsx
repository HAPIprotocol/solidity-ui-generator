import React, { Dispatch, SetStateAction } from 'react';

import { ABIEntry } from 'shared/models';

interface IFunction {
  func: ABIEntry;
  index: number;
  setArguments: Dispatch<SetStateAction<Array<{ name: string; type: string }>>>;
}

const FunctionComponent: React.FC<IFunction> = ({
  func,
  index,
  setArguments,
}) => {
  const showInputArguments = () => {
    setArguments(func.inputs || []);
  };

  return (
    <div className='mt-4 text-left border border-gray-600 rounded p-5 m-auto'>
      <div
        className='func-header cursor-pointer flex justify-between align-middle m-auto'
        onClick={showInputArguments}>
        <span className='text-white text-left'>{`${index + 1}. ${
          func?.name || 'Undefined name'
        }`}</span>
      </div>
    </div>
  );
};

export default FunctionComponent;
