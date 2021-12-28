import { NextApiRequest } from "next";
import atob from "atob";
import { logger } from "@lib/logger";

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
  return null;
};
