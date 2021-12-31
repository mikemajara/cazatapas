import { Prisma } from "@prisma/client";

export type DishInclude = Prisma.DishGetPayload<{
  include: {
    ratings: true;
    tags: true;
    images: true;
    restaurant: true;
    comments: { include: { user: true } };
  };
}>;

export type RestaurantInclude = Prisma.RestaurantGetPayload<{
  include: {
    images: true;
    dishes: { include: { ratings: true; tags: true; images: true } };
  };
}>;

export * from "@prisma/client";
