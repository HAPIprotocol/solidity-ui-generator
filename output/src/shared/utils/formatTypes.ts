import Big from 'big.js';

import { valueToBigNumber } from './calculations';

export const formatType = (type: string, value: string) => {
  let val: Big | string;

  switch (type) {
    case 'uint':
    case 'uint8':
    case 'uint16':
    case 'uint256':
      val = valueToBigNumber(value);
      break;

    case 'bytes':
    case 'bytes32':
      val = value;
      break;

    case 'bytes4':
      val = value;
      break;

    case 'address':
      val = value;
      break;

    default:
      val = value;
  }

  return val;
};
