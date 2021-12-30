import React, { useEffect, useState } from "react";
import { Dish } from "@prisma/client";
import { useQuery } from "react-query";
import ky from "ky";
import { RestaurantInclude } from "prisma/model";

export const useAllRestaurants = () => {
  const [result, setResult] = useState<RestaurantInclude[]>([]);
  const { data, isLoading, error } = useQuery<RestaurantInclude[]>(
    "/api/dishes",
    () => ky.get("/api/restaurants").json(),
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
    },
  );
  return { data: result, isLoading, error };
};
