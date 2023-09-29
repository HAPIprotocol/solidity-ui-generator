import React, { Dispatch, SetStateAction } from 'react';

import { ABIEntry } from 'shared/models';

import FunctionComponent from '../FunctionComponent';

interface IListModel {
  abi: ABIEntry[];
  setArguments: Dispatch<SetStateAction<Array<{ name: string; type: string }>>>;
}

const List: React.FC<IListModel> = ({ abi, setArguments }) => {
  return (
    <div className='h-screen m-auto'>
      {abi.length &&
        abi.map((func, index) => (
          <FunctionComponent
            key={`$index-${index}`}
            func={func}
            index={index}
            setArguments={setArguments}
          />
        ))}
    </div>
  );
};

export default List;
