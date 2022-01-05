import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/react";
import { logger } from "@lib/logger";
import base64 from "crypto-js/enc-base64";
import {
  getEmailAndApiKeyFromHeader,
  isUserAuthorizedWithApiKey,
} from "@lib/auth/api-key";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // authorization
  const session = await getSession({ req });
  if (!session) {
    const isAuthorized = await isUserAuthorizedWithApiKey(req);
    if (!isAuthorized) {
      res.status(401).end();
    }
  }
  if (req.method === "GET") {
    await handleGET(session.user.email, req, res);
  } else {
    res
      .status(405)
      .end(
        `The HTTP ${req.method} method is not supported at this route.`,
      );
  }
}

const defaultInclude = {
  images: true,
  ratings: true,
  tags: true,
};

// GET /api/dishes/:id?
async function handleGET(
  email,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.dishId.toString();
  const dishId = parseInt(id);
  const user = await prisma.user.findUnique({
    where: { email },
  });
  const dish = await prisma.dish.findUnique({
    where: { id: 1 },
    include: {
      ratings: {
        where: { userId: user.id },
        include: { user: true },
      },
    },
  });
  res.json(dish.ratings.find((r) => r.userId === user.id));
}
