import React from 'react';
import Head from 'next/head';
import type {NextRouter} from 'next/router';
import {capitalize} from '../../../utils';
import AdminForm from '../../../components/form/form';
import {AdminEntityCreateOptions, AdminEntityCreateServerSideProperties, type Item} from '../../../types';

export function getCreateView(router: NextRouter) {
  return function ({item, entity}: AdminEntityCreateOptions) {
    const displayName = capitalize(entity);
    const pageTitle = `${displayName}'s Creation`;

    function onSubmit(data: Item) {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/${entity}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }).then(response => {
        router.push('/');
      }).catch(error => {
        console.error(error);
      });
    }

    return (
      <>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <div className='container mx-auto px-4'>
          <h1 className='text-xl font-semibold mb-4'>Create {displayName}</h1>
          <AdminForm onSubmit={onSubmit} mode='create' item={item} />
        </div>
      </>
    );
  };
}

export function getCreateData(prisma: any) {
  return async function ({params}: AdminEntityCreateServerSideProperties): Promise<{props: AdminEntityCreateOptions}> {
    const {entity} = params;

    const fields = prisma[entity].fields;

    const emptyItems: Item = {};
    for (const field of Object.keys(fields)) {
      const fieldData = fields[field];
      emptyItems[fieldData.name] = fieldData.typeName === 'Int' ? 'number' : 'string';
    }

    return {
      props: {
        item: emptyItems,
        entity,
      },
    };
  };
}
