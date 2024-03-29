import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {capitalize} from '../../../utils';
import {AdminEntityReadOptions, AdminEntityReadServerSideProperties, type Item} from '../../../types';

export function getReadView() {
  return function ({item, entity}: AdminEntityReadOptions) {
    const displayName = capitalize(entity);
    const pageTitle = `${displayName}'s Dashboard`;

    if (!item) {
      return <div>{displayName} not found</div>;
    }

    return (
      <>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <div>
          <h1>Model: {displayName}</h1>
          {
            Object.keys(item).map(key => {
              const value = item[key];

              return (
                <>
                  <p>{key}: {value}</p>
                </>
              );
            })
          }
        </div>
        <div>
          <Link href={`/${displayName}/edit/${item.id}`}>Edit</Link>
        </div>
      </>
    );
  };
}

export function getReadData(prisma: any) {
  return async function ({params}: AdminEntityReadServerSideProperties): Promise<{props: AdminEntityReadOptions}> {
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
