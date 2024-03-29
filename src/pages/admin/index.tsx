import React from 'react';
import Card from '../../components/card/card';
import Head from "next/head";
import {capitalize} from '../../utils';
import {AdminIndexOptions, AdminIndexServerSideProperties} from '../../types';

export function getIndexView() {
  return function ({entityCounts}: AdminIndexOptions) {
    const pageTitle = 'Dashboard';

    return (
        <>
          <Head>
            <title>{pageTitle}</title>
          </Head>
          <div className="bg-gray-200 p-4 min-h-screen">

            <div className="flex flex-col py-2">
              <h1 className="text-6xl py-2 ">{pageTitle}</h1>
              <div className="flex flex-row flex-wrap">
                {Object.keys(entityCounts).map(entity => {
                  const count = entityCounts[entity];
                  const displayName = capitalize(entity);
                  const title = `Total ${displayName}s`

                  return (
                    <Card
                      key={entity}
                      title={title}
                      count={count}
                      description={title}
                      redirection={`/admin/${entity}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
    );
  };
};

export function getIndexData(prisma: any) {
  return async function ({}: AdminIndexServerSideProperties): Promise<{props: AdminIndexOptions}> {

    const entities = Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$'))
    const entityCounts: Record<string, number | string> = {};
    for (const entity of entities) {
      try {
        entityCounts[entity] = await prisma[entity].count();
      } catch (error) {
        console.error(error);
        entityCounts[entity] = '?';
      }
    }

    return {
      props: {
        entityCounts,
      },
    };
  }
}
