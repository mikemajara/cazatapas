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
    logger.debug(`[...id].tsx:${id}:req.query`, req.query);
    await handleGET(id, req, res);
  } else if (req.method === "POST") {
    logger.debug(`[...id].tsx:${id}:req.query`, req.query);
    await handlePOST(id, req, res);
  } else if (req.method === "DELETE") {
    await handleDELETE(id, req, res);
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
  id,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (id) {
    const dishId = parseInt(id);
    const dish = await prisma.dish.findUnique({
      where: { id: dishId },
      include: {
        ...defaultInclude,
        restaurant: true,
        ratings: true,
        comments: { include: { user: true } },
      },
    });
    res.json(dish);
  } else {
    const {
      search,
      orderBy,
      sortOrder,
      pageSize = "0",
      pageNumber = "0",
    } = req.query;
    const pSize = parseInt(pageSize as string);
    const pNumber = parseInt(pageNumber as string);

    const dishes = await prisma.dish.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search as string,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
      orderBy: orderBy
        ? { [orderBy as string]: sortOrder }
        : undefined,
      skip: pSize && pNumber ? pSize * (pNumber - 1) : undefined,
      take: pSize ? pSize : undefined,
      include: { ...defaultInclude, restaurant: true },
    });
    res.json(dishes);
  }
}

// POST /api/dishes/:id?
async function handlePOST(id, req, res) {
  if (id) {
    const dishId = parseInt(id);
    const dish = await prisma.dish.update({
      where: { id: dishId },
      data: { ...req.body },
      include: defaultInclude,
    });
    res.json(dish);
  } else {
    const dish = await prisma.dish.create({
      data: { ...req.body },
      include: defaultInclude,
    });
    res.json(dish);
  }
}

// DELETE /api/dishes/:id
async function handleDELETE(id, req, res) {
  const dish = await prisma.dish.delete({
    where: { id },
    include: defaultInclude,
  });
  res.json(dish);
}
