import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { logger } from "@lib/logger";
import { getSession } from "next-auth/react";
import sha256 from "crypto-js/sha256";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    await handleGET(res, req);
  } else if (req.method === "PUT") {
    await handlePUT(res, req);
  } else {
    res.status(405).end(`HTTP ${req.method} method not supported`);
  }
}

// GET /api/user/:id
async function handleGET(res, req) {
  const session = await getSession({ req });
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      apiKey: true,
    },
  });
  await res.json(user);
}

// GET /api/user/:id
async function handlePUT(res, req) {
  const session = await getSession({ req });
  const savingUser = { ...req.body };
  if (savingUser.new_password) {
    delete savingUser.new_password;
    savingUser.password = sha256(savingUser.password).toString();
  }
  const user = await prisma.user.update({
    where: { email: session?.user?.email },
    data: savingUser,
  });
  await res.json(user);
}
