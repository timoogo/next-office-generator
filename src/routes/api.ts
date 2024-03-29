import type {NextApiRequest, NextApiResponse} from 'next';

function requestHandler(prisma: any) {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const entity = request.query.entity as string;

    if (request.method === 'POST') {
      console.log('data', JSON.parse(request.body));
      const result = await prisma[entity].create({
        data: {
          ...JSON.parse(request.body),
        },
      });

      response.status(200).json(result);
      return;
    }

    if (request.method === 'PUT') {
      const {id, ...data} = JSON.parse(request.body);

      const result = await prisma[entity].update({
        where: {id},
        data,
      });

      response.status(200).json(result);
      return;
    }

    if (request.method === 'DELETE') {
      const {id} = JSON.parse(request.body);

      const result = await prisma[entity].delete({
        where: {id},
      });

      response.status(200).json(result);
      return;
    }

    response.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  };
}

export function getApiHandler(prisma: any) {
  return function (request: NextApiRequest, response: NextApiResponse) {
    try {
      requestHandler(prisma)(request, response);
    } catch {
      response.status(500).json({error: 'Erreur lors de la mise à jour de l\'utilisateur'});
    }
  };
}
