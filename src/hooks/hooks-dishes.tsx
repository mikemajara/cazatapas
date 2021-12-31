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

export const useDish = (id) => {
  const [result, setResult] = useState<DishInclude>();
  const { data, isLoading, error } = useQuery<DishInclude>(
    `/api/dishes/${id}`,
    () => ky.get(`/api/dishes/${id}`).json(),
    { onSuccess: (data) => setResult(data) },
  );
  return { data: result, isLoading, error };
};
