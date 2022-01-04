import React, { useEffect, useState } from "react";
import { Dish, Restaurant } from "@prisma/client";
import { useMutation, useQuery } from "react-query";
import ky from "ky";
import { DishInclude, RestaurantInclude } from "prisma/model";
import { logger } from "@lib/logger";

export const useAllDishes = () => {
  const [result, setResult] = useState<DishInclude[]>([]);
  const { data, isLoading, error } = useQuery<DishInclude[]>(
    "/api/dishes",
    () => ky.get("/api/dishes").json(),
    { onSuccess: (data) => setResult(data) },
  );
  return { data: result, isLoading, error };
};

export const useDish = (id) => {
  const [result, setResult] = useState<DishInclude>();
  const { data, isLoading, error } = useQuery<DishInclude>(
    `/api/dishes/${id}`,
    () => ky.get(`/api/dishes/${id}`).json(),
    { onSuccess: (data) => setResult(data) },
  );
  return { data: result, isLoading, error };
};

export const useSaveRating = (dishId) => {
  return useMutation((json) => {
    return ky.post(`/api/dishes/rate/${dishId}`, { json });
  });
};

export const useSaveComment = (dishId, fn) => {
  logger.debug(`creating mutation with ${dishId}`);
  return useMutation(
    (json) => {
      return ky
        .post(`/api/dishes/comment?id=${dishId}`, {
          json: { comment: "hola" },
        })
        .json();
    },
    {
      onSuccess: fn,
    },
  );
};
