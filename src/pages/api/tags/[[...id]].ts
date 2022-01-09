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
  // const session = await getSession({ req });
  // if (!session) {
  //   const isAuthorized = await isUserAuthorizedWithApiKey(req);
  //   if (!isAuthorized) {
  //     res.status(401).end();
  //   }
  // }
  const id = req.query.id;
  if (req.method === "GET") {
    await handleGET(id, req, res);
  } else {
    res
      .status(405)
      .end(
        `The HTTP ${req.method} method is not supported at this route.`,
      );
  }
}

// const defaultInclude = { dishes: true };

// GET /api/tags/:id?
async function handleGET(
  id,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (id) {
    const tagId = id;
    const tag = await prisma.tag.findUnique({
      where: { id: tagId },
      // include: { ...defaultInclude },
    });
    res.json(tag);
  } else {
    const { search } = req.query;
    const tags = await prisma.tag.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search as string,
                },
              },
            ],
          }
        : undefined,
      // include: { ...defaultInclude },
    });
    res.json(tags);
  }
}
