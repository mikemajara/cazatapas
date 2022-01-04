import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/react";
import { logger } from "@lib/logger";
import base64 from "crypto-js/enc-base64";
import {
  getEmailAndApiKeyFromHeader,
  isUserAuthorizedWithApiKey,
} from "@lib/auth/api-key";

import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
  const id = req.query.id;
  const rating = req.body.rating;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  const dish = await prisma.dish.update({
    where: { id },
    data: {
      ratings: {
        upsert: {
          where: { userId_dishId: { userId: user.id, dishId: id } },
          update: { userId: user.id, value: rating },
          create: { userId: user.id, value: rating },
        },
      },
    },
    include: { ratings: { include: { user: true } } },
  });
  res.json(dish);
}
