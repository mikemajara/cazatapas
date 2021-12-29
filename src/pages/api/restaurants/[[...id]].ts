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
  } else if (req.method === "POST") {
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

// GET /api/restaurants/:id?
async function handleGET(
  id,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const defaultInclude = {
    images: true,
  };
  if (id) {
    const restaurantId = parseInt(id);
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: { ...defaultInclude, dishes: true },
    });
    res.json(restaurant);
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

    const restaurants = await prisma.restaurant.findMany({
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
      include: defaultInclude,
    });
    res.json(restaurants);
  }
}

// POST /api/restaurants/:id?
async function handlePOST(id, req, res) {
  if (id) {
    const restaurantId = parseInt(id);
    const restaurant = await prisma.restaurant.update({
      where: { id: restaurantId },
      data: { ...req.body },
      include: { tags: true },
    });
    res.json(restaurant);
  } else {
    const restaurant = await prisma.restaurant.create({
      data: { ...req.body },
      include: { tags: true },
    });
    res.json(restaurant);
  }
}

// DELETE /api/restaurants/:id
async function handleDELETE(id, req, res) {
  const restaurant = await prisma.restaurant.delete({
    where: { id },
    include: { tags: true },
  });
  res.json(restaurant);
}
