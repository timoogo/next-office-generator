import React from 'react';
import Link from 'next/link';
import {getEditUrlFor, getReadUrlFor} from '../../utils';
import {type Item} from '../../types';

type TableRowProperties = {
  item: Item;
  entity: string;
  onDelete: (id: number) => void;
};

export const TableRow: React.FC<TableRowProperties> = ({item, entity, onDelete}) => {
  const keys = Object.keys(item);
  const columnWidth = `calc(100% / ${keys.length + 1})`;

  return (
    <tr>
      {keys.map(key => (
        <td key={`${item.id}-${key}`}
          className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center'
          style={{width: columnWidth}}>
          {item[key]}
        </td>
      ))}
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className={'text-center'}>

          <Link href={getReadUrlFor(entity, item.id)}>View</Link>
          {' | '}
          <Link href={getEditUrlFor(entity, item.id)}>Modify</Link>
          {' | '}
          {/* use handler to delete on button */}
          <button onClick={() => {
            onDelete(item.id);
          }}>Delete</button>
        </div>
      </td>
    </tr>
  );
};
