import React from 'react';
import {type Item} from '../../types';

type TableHeaderOptions = {
  firstItem: Item;
};

const className = 'px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center';

export function TableHeader({firstItem}: TableHeaderOptions) {
  const keys = Object.keys(firstItem);
  const columnWidth = `calc(100% / ${keys.length + 1})`;

  return (
    <thead className='bg-gray-50'>
      <tr>
        {keys.map(key => (
          <th key={key}
            className={className}
            style={{width: columnWidth}}>
            {key}
          </th>
        ))}
        <th className={className}
          style={{width: columnWidth}}>
          Actions
        </th>
      </tr>
    </thead>
  );
}
