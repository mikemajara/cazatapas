import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/react";
import { logger } from "@lib/logger";
import base64 from "crypto-js/enc-base64";
import {
  getEmailAndApiKeyFromHeader,
  isUserAuthorizedWithApiKey,
} from "@lib/auth/api-key";
import path from "path";
import nextConnect from "next-connect";
import S3 from "aws-sdk/clients/s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { pseudoRandomBytes } from "crypto";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3Client = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const getFileName = (req, file, cb) =>
  pseudoRandomBytes(16, function (err, raw) {
    cb(
      null,
      raw.toString("hex") +
        Date.now() +
        path.extname(file.originalname),
    );
  });

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "cazatapa/dishes",
    acl: "public-read",
    filename: getFileName,
    key: getFileName,
  }),
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post((req, res) => {
  // logger.debug("upload.ts: req.files", req.files);
  // logger.debug("upload.ts: req.body", req.body);
  res.status(200).json(req.file);
});

export default apiRoute;
