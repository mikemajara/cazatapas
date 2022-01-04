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
  if (req.method === "POST") {
    await handlePOST(session.user.email, req, res);
  } else {
    res
      .status(405)
      .end(
        `The HTTP ${req.method} method is not supported at this route.`,
      );
  }
}

// POST /api/dishes/rate/:id?
async function handlePOST(email, req, res) {
  const id = parseInt(req.query.id);
  const { comment } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  logger.debug(`comment.ts:user.id`, user.id);
  logger.debug(`comment.ts:dishId`, id);
  const dish = await prisma.dish.update({
    where: { id },
    data: {
      comments: {
        upsert: {
          where: { userId_dishId: { userId: user.id, dishId: id } },
          create: { userId: user.id, text: comment },
          update: { userId: user.id, text: comment },
        },
      },
    },
    include: {
      ratings: { include: { user: true } },
      comments: { include: { user: true } },
    },
  });
  res.json(dish.comments.find((c) => c.userId === user.id));
}
