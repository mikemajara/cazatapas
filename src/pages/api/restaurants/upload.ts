import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/react";
import { logger } from "@lib/logger";
import base64 from "crypto-js/enc-base64";
import {
  getEmailAndApiKeyFromHeader,
  isUserAuthorizedWithApiKey,
} from "@lib/auth/api-key";
import S3 from "aws-sdk/clients/s3";
import { PassThrough } from "stream";
import formidable from "formidable";
import path from "path";

const DIRECTORY = "/restaurants";

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
    // logger.debug("upload.ts:handle:result", result);
  } else {
    res
      .status(405)
      .end(
        `The HTTP ${req.method} method is not supported at this route.`,
      );
  }
}

const s3Client = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const uploadStream = (file) => {
  const pass = new PassThrough();
  s3Client
    .upload(
      {
        Bucket: path.join(process.env.BUCKET_NAME, DIRECTORY),
        Key: file.newFilename,
        Body: pass,
      },
      (err, data) => {
        if (err) logger.error(err);
      },
    )
    .promise();
  return pass;
};

// POST /api/restaurants/:id?
async function handlePOST(req, res) {
  const form = formidable({
    uploadDir: DIRECTORY,
    keepExtensions: true,
    fileWriteStreamHandler: uploadStream,
  });
  await form.parse(req, (err, fields, files: File[]) => {
    if (err) return err;
    res.status(200).json({ files });
  });
}
