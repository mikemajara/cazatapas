import React, { useEffect, useState } from "react";
import { Dish } from "@prisma/client";
import { useQuery } from "react-query";
import ky from "ky";
import { RestaurantInclude } from "prisma/model";
import _ from "lodash";

interface Params {
  search?: string;
  orderBy?: string;
  sortOrder?: string;
  pageSize?: string;
  pageNumber?: string;
}

export const useAllRestaurants = (params: Params = {}) => {
  const paramString = !_.isEmpty(params)
    ? `?${_.map(params, (v, k) => `${k}=${v}`).join("&")}`
    : "";

  const [result, setResult] = useState<RestaurantInclude[]>([]);
  const { data, isLoading, error } = useQuery<RestaurantInclude[]>(
    `/api/dishes${paramString}`,
    () => ky.get(`/api/restaurants${paramString}`).json(),
    { onSuccess: (data) => setResult(data) },
  );
  return { data: result, isLoading, error };
};

export const useRestaurant = (id) => {
  const [result, setResult] = useState<RestaurantInclude>();
  const { data, isLoading, error } = useQuery<RestaurantInclude>(
    `/api/restaurants/${id}`,
    () => ky.get(`/api/restaurants/${id}`).json(),
    {
      onSuccess: (data) => setResult(data),
      enabled: !!id,
    },
  );
  return { data: result, isLoading, error };
};
