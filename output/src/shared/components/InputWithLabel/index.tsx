import React from 'react';

interface IInputLabel {
  label?: string;
  placeholder: string | number;
}

const InputWithLabel: React.FC<IInputLabel> = ({ label, placeholder }) => {
  return (
    <div className='container flex flex-col mt-5'>
      <label className='text-gray-50'>{label}</label>
      <input
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
        autoComplete='off'
        placeholder={placeholder.toString()}
      />
    </div>
  );
};

export default InputWithLabel;
