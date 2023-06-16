import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { campaignPlatformValidationSchema } from 'validationSchema/campaign-platforms';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.campaign_platform
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCampaignPlatformById();
    case 'PUT':
      return updateCampaignPlatformById();
    case 'DELETE':
      return deleteCampaignPlatformById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCampaignPlatformById() {
    const data = await prisma.campaign_platform.findFirst(convertQueryToPrismaUtil(req.query, 'campaign_platform'));
    return res.status(200).json(data);
  }

  async function updateCampaignPlatformById() {
    await campaignPlatformValidationSchema.validate(req.body);
    const data = await prisma.campaign_platform.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCampaignPlatformById() {
    const data = await prisma.campaign_platform.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
