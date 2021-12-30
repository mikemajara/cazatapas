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
  // const session = await getSession({ req });
  // if (!session) {
  //   const isAuthorized = await isUserAuthorizedWithApiKey(req);
  //   if (!isAuthorized) {
  //     res.status(401).end();
  //   }
  // }
  if (req.method === "POST") {
    await handlePOST(req, res);
  } else {
    res
      .status(405)
      .end(
        `The HTTP ${req.method} method is not supported at this route.`,
      );
  }
}

// POST /api/restaurants/:id?
async function handlePOST(req, res) {
  const form = new formidable.IncomingForm({
    uploadDir: "public/images/dishes",
    keepExtensions: true,
  });
  return form.parse(req, (err, fields, files) => {
    if (err) {
      return err;
    }
    res.status(200).json({ files });
  });
}
