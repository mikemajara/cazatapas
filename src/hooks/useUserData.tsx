import React from "react";
import { useQuery } from "react-query";
import { isEmpty } from "lodash";
import { logger } from "@lib/logger";

export const useUserData = (id, onSuccess) => {
  const { data, isLoading, error } = useQuery(
    `user-${id}`,
    () => {
      return fetch(`/api/users/me`).then((res) => res.json());
    },
    {
      onSuccess,
    },
  );

  return { data, isLoading, error };
};
