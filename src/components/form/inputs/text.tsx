import React from 'react';

type GenericInputTextOptions = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function GenericInputText(options: GenericInputTextOptions) {
  return (
    <input
      type='text'
      name={options.name}
      value={options.value || ''}
      onChange={options.onChange}
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    />
  );
}
