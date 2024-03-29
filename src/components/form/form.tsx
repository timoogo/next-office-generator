import React, {
  useState, type ChangeEvent, type FormEvent,
} from 'react';
import {capitalize} from '../../utils';
import {type Item} from '../../types';
import GenericInputNumber from './inputs/number';
import GenericInputText from './inputs/text';

const excludedFields = new Set(['id', 'created_at', 'updated_at']);

type AdminFormOptions = {
  onSubmit: (item: Item) => void;
  mode: 'edit' | 'create';
  item: Item;
};

export default function AdminForm({item, mode, onSubmit}: AdminFormOptions) {
  const clonedItem = {...item};
  if (mode === 'create') {
    for (let key in clonedItem) {
      clonedItem[key] = undefined;
    }
  }

  const [formData, setFormData] = useState<Record<string, any>>(clonedItem);

  function onChange(type: 'number' | 'string') {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [event.target.name]: type === 'number' && event.target.value !== '' ? Number.parseInt(event.target.value, 10) : event.target.value,
      });
    };
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).filter(key => !excludedFields.has(key)).map(key => {
        const value = formData[key];

        return (
          <div key={key} className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={key}>
              {capitalize(key)}
            </label>
            {(mode === 'create' && item[key] === 'number') || (mode === 'edit' && typeof value === 'number') ? (
              <GenericInputNumber name={key} value={String(value)} onChange={onChange('number')} />
            ) : undefined}
            {(mode === 'create' && item[key] === 'string') || (mode === 'edit' && typeof value === 'string') ? (
              <GenericInputText name={key} value={value} onChange={onChange('string')} />
            ) : undefined}
          </div>
        );
      })}

      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        type='submit'>
        {mode === 'create' ? 'Create' : 'Edit'}
      </button>
    </form>
  );
}
