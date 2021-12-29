import React, { useEffect, useState } from "react";
import { Dish } from "@prisma/client";
import { useQuery } from "react-query";
import ky from "ky";
import { DishInclude } from "prisma/model";

export const useAllDishes = () => {
  const [result, setResult] = useState<DishInclude[]>([]);
  const { data, isLoading, error } = useQuery<DishInclude[]>(
    "/api/dishes",
    () => ky.get("/api/dishes").json(),
    { onSuccess: (data) => setResult(data) },
  );
  return { data: result, isLoading, error };
};
