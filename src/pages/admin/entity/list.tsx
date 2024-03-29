import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type {NextRouter} from 'next/router';
import {TableContainer} from '../../../components/table/container';
import {capitalize, getCreateUrlFor} from '../../../utils';
import {AdminEntityListOptions, AdminEntityListServerSideProperties} from '../../../types';

export function getListView(router: NextRouter) {
  return function ({items, entity}: AdminEntityListOptions) {
    const displayName = capitalize(entity);
    const pageTitle = `${displayName}'s Dashboard`;

    return (
      <>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <div className='container mx-auto'>
          <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-5'>
            <TableContainer router={router} items={items} entity={entity} />
          </div>

          <Link href={getCreateUrlFor(displayName)} className='px-6 py-2 rounded-md text-white transition duration-200 ease-in-out bg-blue-600 hover:bg-blue-700'>
            Create a {displayName}
          </Link>
        </div>
      </>
    );
  };
}

export function getListData(prisma: any) {
  return async function ({params}: AdminEntityListServerSideProperties): Promise<{props: AdminEntityListOptions}> {
    const {entity} = params;

    const items = await prisma[entity].findMany();

    return {
      props: {
        items,
        entity,
      },
    };
  };
}
