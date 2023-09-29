import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormValues } from '../contract-result';

interface IInputLabel {
  label?: string;
  placeholder: string | number;
  index: number;
}

const InputWithLabel: React.FC<IInputLabel> = ({
  label,
  placeholder,
  index,
}) => {
  const methods = useFormContext<FormValues>();
  const { register } = methods;

  return (
    <div className='container flex flex-col mt-5'>
      <label className='text-gray-50'>{label}</label>
      <input
        {...register(`arguments.${index}.value`)}
        className='
        outline-0
        bg-transparent
        text-gray-300
        placeholder:text-gray-400
        border
        border-gray-300
        radius
        rounded
        p-1.5
        mt-2
        '
        placeholder={placeholder.toString()}
      />
    </div>
  );
};

export default InputWithLabel;
