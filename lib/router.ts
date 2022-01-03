import React from "react";
import { omit } from "lodash";
import { useRouter } from "next/router";

export const ShallowRouteChange = (key) => {
  const router = useRouter();

  const setKey = (value, fn = () => {}) => {
    router.push(
      {
        pathname: router.asPath,
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
        pathname: router.asPath,
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
