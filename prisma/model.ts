import { Prisma } from "@prisma/client";

export type DishInclude = Prisma.DishGetPayload<{
  include: {
    ratings: true;
    tags: true;
    images: true;
    restaurant: true;
  };
}>;

export type RestaurantInclude = Prisma.RestaurantGetPayload<{
  include: {
    images: true;
    dishes: { include: { ratings: true; tags: true; images: true } };
  };
}>;

export * from "@prisma/client";
