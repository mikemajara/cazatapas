import React, { useEffect, useState } from "react";
import { Dish } from "@prisma/client";
import { useQuery } from "react-query";
import ky from "ky";

export const useAllDishes = () => {
  const [result, setResult] = useState<Dish[]>([]);
  const { data, isLoading, error } = useQuery<Dish[]>(
    "/api/dishes",
    () => ky.get("/api/dishes").json(),
    { onSuccess: (data) => setResult(data) },
  );
  return { data: result, isLoading, error };
};
