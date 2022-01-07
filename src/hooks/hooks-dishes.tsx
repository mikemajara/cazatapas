import React, { useEffect, useState } from "react";
import { Dish, Rating, Restaurant } from "@prisma/client";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import ky from "ky";
import { DishInclude, RestaurantInclude } from "prisma/model";
import { Comment } from "@prisma/client";
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
    { onSuccess: (data) => setResult(data), enabled: !!id },
  );
  return { data: result, isLoading, error };
};

export const useDishComment = (dishId) => {
  const [result, setResult] = useState<Comment>();
  const { data, isLoading, error } = useQuery<Comment>(
    `/api/comments?dishId=${dishId}`,
    () => ky.get(`/api/comments?dishId=${dishId}`).json(),
    {
      onSuccess: (data) => setResult(data),
      refetchOnWindowFocus: false,
      enabled: !!dishId,
      retry: (failureCount, error) => {
        if (error.response.status === 401 || failureCount > 3)
          return false;
        return true;
      },
    },
  );
  return { data: result, isLoading, error };
};

export const useDishRating = (dishId) => {
  const [result, setResult] = useState<Rating>();
  const { data, isLoading, error } = useQuery<Rating>(
    `/api/ratings?dishId=${dishId}`,
    () => ky.get(`/api/ratings?dishId=${dishId}`).json(),
    {
      onSuccess: (data) => setResult(data),
      enabled: !!dishId,
    },
  );
  return { data: result, isLoading, error };
};

export const useSaveComment = (dishId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (json) => {
      return ky.post(`/api/dishes/comment?id=${dishId}`, {
        json,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          `/api/comments?dishId=${dishId}`,
          {
            exact: true,
            refetchInactive: false,
          },
        );
      },
    },
  );
};

export const useSaveRating = (dishId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (json) => {
      logger.debug("hooks-dishes.tsx:useSaveRating:json", json);
      return ky.post(`/api/dishes/rate?dishId=${dishId}`, {
        json,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          `/api/ratings?dishId=${dishId}`,
          {
            exact: true,
            refetchInactive: false,
          },
        );
      },
    },
  );
};
