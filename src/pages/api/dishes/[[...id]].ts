import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/react";
import { logger } from "@lib/logger";
import base64 from "crypto-js/enc-base64";
import { getEmailAndApiKeyFromHeader } from "@lib/auth/api-key";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // authorization
  const session = await getSession({ req });
  if (!session) {
    const { user } = getEmailAndApiKeyFromHeader(req);
    if (!user) {
      res.status(401).end();
    }
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (
      user.email !== dbUser.email ||
      user.apiKey !== dbUser.apiKey
    ) {
      res.status(401).end();
    }
  }
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

// GET /api/products/:id?
async function handleGET(
  id,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (id) {
    const productId = parseInt(id);
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    res.json(product);
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

    const products = await prisma.product.findMany({
      where: search
        ? {
            OR: [{ raw_name: { contains: search as string } }],
          }
        : undefined,
      orderBy: orderBy
        ? { [orderBy as string]: sortOrder }
        : undefined,
      skip: pSize && pNumber ? pSize * (pNumber - 1) : undefined,
      take: pSize ? pSize : undefined,
    });
    res.json(products);
  }
}

// POST /api/products/:id?
async function handlePOST(id, req, res) {
  if (id) {
    const productId = parseInt(id);
    const product = await prisma.product.update({
      where: { id: productId },
      data: { ...req.body },
    });
    res.json(product);
  } else {
    const product = await prisma.product.create({
      data: { ...req.body },
    });
    res.json(product);
  }
}

// DELETE /api/products/:id
async function handleDELETE(id, req, res) {
  const product = await prisma.product.delete({
    where: { id },
  });
  res.json(product);
}
