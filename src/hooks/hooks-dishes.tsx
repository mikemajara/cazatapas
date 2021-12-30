import React, { useEffect, useState } from "react";
import { Dish, Restaurant } from "@prisma/client";
import { useQuery } from "react-query";
import ky from "ky";
import { DishInclude, RestaurantInclude } from "prisma/model";

export const useAllDishes = () => {
  const [result, setResult] = useState<DishInclude[]>([]);
  const { data, isLoading, error } = useQuery<DishInclude[]>(
    "/api/dishes",
    () => ky.get("/api/dishes").json(),
    { onSuccess: (data) => setResult(data) },
  );
  return { data: result, isLoading, error };
};

export const useRestaurantDishes = (id) => {
  const [result, setResult] = useState<DishInclude[]>([]);
  const { data, isLoading, error } = useQuery<RestaurantInclude>(
    `/api/restaurants/${id}`,
    () => ky.get(`/api/restaurants/${id}`).json(),
    {
      onSuccess: (data) => setResult(data.dishes),
    },
  );
  return { data: result, isLoading, error };
};
