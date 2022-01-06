import { NextApiRequest } from "next";
import atob from "atob";
import { logger } from "@lib/logger";
import prisma from "@lib/prisma";

export const getEmailAndApiKeyFromHeader = (req: NextApiRequest) => {
  const header = req.headers.authorization;
  if (header) {
    const [, encryptedApiKey] = header.split(" ");
    logger.debug(
      "api-key.tsx:getEmailAndApiKeyFromHeader:encryptedApiKey",
      encryptedApiKey,
    );
    const [email, apiKey] = atob(encryptedApiKey).split(":");
    return { user: { email, apiKey } };
  }
  return {};
};

export const isUserAuthorizedWithApiKey = async (
  req: NextApiRequest,
) => {
  const { user } = getEmailAndApiKeyFromHeader(req);
  if (!user) {
    return false;
  }
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });
  if (user.email !== dbUser.email || user.apiKey !== dbUser.apiKey) {
    return false;
  }
  return true;
};
