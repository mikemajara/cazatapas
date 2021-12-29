import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@rateplate.io",
    password:
      "2bd806c97f0e00af1a1fc3328fa763a9269723c8db8fac4f93af71db186d6e90",
  },
  {
    name: "Bob",
    email: "bob@rateplate.io",
    password:
      "2bd806c97f0e00af1a1fc3328fa763a9269723c8db8fac4f93af71db186d6e90",
  },
  {
    name: "Conal",
    email: "conal@rateplate.io",
    password:
      "2bd806c97f0e00af1a1fc3328fa763a9269723c8db8fac4f93af71db186d6e90",
  },
];

const tagData: Prisma.TagCreateInput[] = [
  { id: "soy", name: "soy" },
  { id: "fish", name: "fish" },
  { id: "mustard", name: "mustard" },
  { id: "mollusks", name: "mollusks" },
  { id: "dairy", name: "dairy" },
  { id: "eggs", name: "eggs" },
  { id: "sesame", name: "sesame" },
  { id: "gluten", name: "gluten" },
  { id: "nuts", name: "nuts" },
  { id: "dioxide", name: "sulfur dioxide" },
  { id: "crustaceans", name: "crustaceans" },
  { id: "peanuts", name: "peanuts" },
  { id: "celery", name: "celery" },
  { id: "lupins", name: "lupins" },
];

const restaurantData: Prisma.RestaurantCreateInput[] = [
  {
    name: "La Tapeoteca",
    images: {
      create: {
        name: "la-tapeopteca",
        fileName: "/restaurants/la-tapeoteca.png",
      },
    },
  },
  {
    name: "Los Zagales",
    images: {
      create: {
        name: "los-zagales",
        fileName: "/restaurants/los-zagales.png",
      },
    },
  },
];

const dishData: Prisma.DishCreateInput[] = [
  {
    name: "Marinera negra con gulas al ajillo",
    price: 2.2,
    restaurant: { connect: { name: "La Tapeoteca" } },
    images: {
      create: {
        name: "marinera-negra.jpg",
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
        name: "croqueta-jamon.jpg",
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
        name: "pincho-moruno-atun.jpg",
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
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  for (const u of tagData) {
    const tag = await prisma.tag.create({
      data: u,
    });
    console.log(`Created tag with id: ${tag.id}`);
  }

  for (const u of restaurantData) {
    const restaurant = await prisma.restaurant.create({
      data: u,
    });
    console.log(`Created restaurant with id: ${restaurant.id}`);
  }

  for (const u of dishData) {
    const dish = await prisma.dish.create({
      data: u,
    });
    console.log(`Created dish with id: ${dish.id}`);
  }

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
