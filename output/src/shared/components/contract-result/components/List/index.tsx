import React from 'react';

import { ABIEntry } from 'shared/models';

import FunctionComponent from '../FunctionComponent';

interface IListModel {
  abi: ABIEntry[];
}

const List: React.FC<IListModel> = ({ abi }) => {
  return (
    <div className='h-screen'>
      {abi.length &&
        abi.map((func, index) => (
          <FunctionComponent
            key={`$index-${index}`}
            func={func}
            index={index}
          />
        ))}
    </div>
  );
};

export default List;
