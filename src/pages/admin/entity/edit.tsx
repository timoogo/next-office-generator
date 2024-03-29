import React from 'react';
import Head from 'next/head';
import type {NextRouter} from 'next/router';
import {capitalize} from '../../../utils';
import AdminForm from '../../../components/form/form';
import {AdminEntityEditOptions, AdminEntityEditServerSideProperties, type Item} from '../../../types';

export function getEditView(router: NextRouter) {
  return function ({item, entity}: AdminEntityEditOptions) {
    const displayName = capitalize(entity);
    const pageTitle = `${displayName}'s Edition`;

    function onSubmit(item: Item) {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/${entity}`, {
        method: 'PUT',
        body: JSON.stringify(item), // FormData est l'état local avec les données du formulaire
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
          <AdminForm onSubmit={onSubmit} mode='edit' item={item} />
        </div>
      </>
    );
  };
}

export function getEditData(prisma: any) {
  return async function ({params}: AdminEntityEditServerSideProperties): Promise<{props: AdminEntityEditOptions}> {
    const {id, entity} = params;

    const item = await prisma[entity].findUnique({
      where: {
        id: Number(id),
      },
    });

    return {
      props: {
        item,
        entity,
      },
    };
  };
}
