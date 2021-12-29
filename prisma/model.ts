import { Prisma } from "@prisma/client";

export type DishInclude = Prisma.DishGetPayload<{
  include: { ratings: true; tags: true; images: true };
}>;

export type RestaurantInclude = Prisma.RestaurantGetPayload<{
  include: { dishes: { include: { ratings: true } }; images: true };
}>;

export * from "@prisma/client";
