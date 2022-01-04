import React from "react";
import { omit } from "lodash";
import { useRouter } from "next/router";
import { logger } from "@lib/logger";

export const useShallowRouteChange = (key) => {
  const router = useRouter();

  const setKey = (value, fn = () => {}) => {
    router.push(
      {
        pathname: router.basePath,
        query: {
          ...router.query,
          [key]: value,
        },
      },
      null,
      { shallow: true },
    );
    fn();
  };
  const unsetKey = (fn = () => {}) => {
    router.push(
      {
        pathname: router.basePath,
        query: {
          ...omit(router.query, key),
        },
      },
      null,
      { shallow: true },
    );
    fn();
  };

  return [setKey, unsetKey];
};
