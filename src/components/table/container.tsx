import React from 'react';
import type {NextRouter} from 'next/router';
import {type Items} from '../../types';
import {TableHeader} from './header';
import {TableRow} from './row';

type TableContainerOptions = {
  items: Items;
  entity: string;
  router: NextRouter;
};

export function TableContainer({router, items, entity}: TableContainerOptions) {
  const onDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_URL}/api/${entity}`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    }).then(response => {
      if (response.status === 200) {
        router.reload();
      }
    }).catch(error => {
      console.error(error);
    });
  };

  const [firstItem] = items;

  if (!firstItem) {
    return (
      <p>No data available</p>
    );
  }

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-5'>
      <table className='min-w-full divide-y divide-gray-200'>
        <TableHeader firstItem={firstItem}/>
        <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
          {items.map(item => (
            <TableRow key={item.id} item={item} entity={entity} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
