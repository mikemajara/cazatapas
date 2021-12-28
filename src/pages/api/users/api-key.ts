import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import sha256 from "crypto-js/sha256";
import { logger } from "@lib/logger";
import { getSession } from "next-auth/react";
import cryptoRandomString from "crypto-random-string";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    await handleGET(res, req);
  } else {
    res.status(405).end(`HTTP ${req.method} method not supported`);
  }
}

// GET /api/user/apiKey
async function handleGET(res, req) {
  const session = await getSession({ req });
  const apiKey = cryptoRandomString({ length: 20, type: "base64" });
  logger.debug("api-key.tsx:handleGet:apiKey", apiKey);
  await prisma.user.update({
    where: { email: session.user.email },
    data: { apiKey },
  });
  res.json({ apiKey });
}
