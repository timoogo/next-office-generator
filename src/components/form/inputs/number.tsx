import React from 'react';

type GenericInputNumberOptions = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function GenericInputNumber(options: GenericInputNumberOptions) {
  return (
    <input
      type='number'
      name={options.name}
      value={options.value || ''}
      onChange={options.onChange}
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    />
  );
}
