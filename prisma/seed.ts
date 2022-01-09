import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const INCLUDE_ENTITIES = {
  users: false,
  tags: true,
  dishes: false,
  restaurants: false,
};

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@rateplate.io",
    username: "alice",
    password:
      "2bd806c97f0e00af1a1fc3328fa763a9269723c8db8fac4f93af71db186d6e90",
  },
  {
    name: "Bob",
    email: "bob@rateplate.io",
    username: "bob",
    password:
      "2bd806c97f0e00af1a1fc3328fa763a9269723c8db8fac4f93af71db186d6e90",
  },
  {
    name: "Conal",
    email: "conal@rateplate.io",
    username: "conal",
    password:
      "2bd806c97f0e00af1a1fc3328fa763a9269723c8db8fac4f93af71db186d6e90",
  },
];

const tagData: Prisma.TagCreateInput[] = [
  { id: "soy", name: "soy", color: "green.400" },
  { id: "fish", name: "fish", color: "blue.200" },
  { id: "mustard", name: "mustard", color: "yellow.500" },
  { id: "mollusks", name: "mollusks", color: "gray.400" },
  { id: "dairy", name: "dairy", color: "gray.50" },
  { id: "eggs", name: "eggs", color: "gray.100" },
  { id: "sesame", name: "sesame", color: "yellow.400" },
  { id: "gluten", name: "gluten", color: "orange.200" },
  { id: "nuts", name: "nuts", color: "orange.800" },
  { id: "dioxide", name: "sulfur dioxide", color: "teal.100" },
  { id: "crustaceans", name: "crustaceans", color: "red.300" },
  { id: "peanuts", name: "peanuts", color: "orange.600" },
  { id: "celery", name: "celery", color: "green.500" },
  { id: "lupins", name: "lupins", color: "yellow.600" },
];

const restaurantData: Prisma.RestaurantCreateInput[] = [
  {
    name: "La Tapeoteca",
    images: {
      create: {
        fileName: "la-tapeoteca.png",
      },
    },
    location: "Murcia",
  },
  {
    name: "Los Zagales",
    images: {
      create: {
        fileName: "los-zagales.png",
      },
    },
    location: "Murcia",
  },
];

const dishData: Prisma.DishCreateInput[] = [
  {
    name: "Marinera negra con gulas al ajillo",
    price: 2.2,
    restaurant: { connect: { name: "La Tapeoteca" } },
    images: {
      create: {
        fileName: "marinera-negra.jpg",
      },
    },
    tags: {
      connect: [
        { id: "soy" },
        { id: "fish" },
        { id: "lupins" },
        { id: "nuts" },
        { id: "dioxide" },
      ],
    },
    ratings: {
      create: [
        {
          user: { connect: { email: "alice@rateplate.io" } },
          value: 3,
        },
        {
          user: { connect: { email: "bob@rateplate.io" } },
          value: 4,
        },
        {
          user: { connect: { email: "conal@rateplate.io" } },
          value: 2,
        },
      ],
    },
    comments: {
      create: [
        {
          user: { connect: { email: "alice@rateplate.io" } },
          text: "Cillum ad sunt do voluptate, minim deserunt nostrud amet velit.",
        },
      ],
    },
  },
  {
    name: "Croqueta cremosa de jamón ibérico",
    price: 2.2,
    restaurant: { connect: { name: "La Tapeoteca" } },
    images: {
      create: {
        fileName: "croqueta-jamon.jpg",
      },
    },
    tags: {
      connect: [
        { id: "dairy" },
        { id: "lupins" },
        { id: "gluten" },
        { id: "dioxide" },
      ],
    },
  },
  {
    name: "Pincho moruno de atún",
    price: 4.5,
    restaurant: { connect: { name: "La Tapeoteca" } },
    images: {
      create: {
        fileName: "pincho-moruno-atun.jpg",
      },
    },
    tags: {
      connect: [
        { id: "fish" },
        { id: "mustard" },
        { id: "gluten" },
        { id: "nuts" },
      ],
    },
  },
  {
    name: "Empanadilla fea de pato, peras y pasas",
    price: 3.5,
    restaurant: { connect: { name: "La Tapeoteca" } },
    tags: {
      connect: [{ id: "dioxide" }, { id: "gluten" }, { id: "nuts" }],
    },
  },
  {
    name: "Patata asada",
    price: 0.6,
    restaurant: { connect: { name: "Los Zagales" } },
  },
  {
    name: "Caballito",
    price: 0.6,
    restaurant: { connect: { name: "Los Zagales" } },
    tags: {
      connect: [{ id: "gluten" }],
    },
  },
  {
    name: "Lomo plancha con queso curado",
    price: 3.8,
    restaurant: { connect: { name: "Los Zagales" } },
    tags: {
      connect: [{ id: "dairy" }],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  INCLUDE_ENTITIES.users &&
    (await prisma.user.createMany({ data: userData }));

  INCLUDE_ENTITIES.tags &&
    (await prisma.tag.createMany({ data: tagData }));

  INCLUDE_ENTITIES.restaurants &&
    (await prisma.restaurant.createMany({ data: restaurantData }));

  INCLUDE_ENTITIES.dishes &&
    (await prisma.dish.createMany({ data: dishData }));

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
