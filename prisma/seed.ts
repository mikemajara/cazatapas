import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@ofertas.io",
    password:
      "2bd806c97f0e00af1a1fc3328fa763a9269723c8db8fac4f93af71db186d6e90",
  },
];
const productData: Prisma.ProductCreateInput[] = [
  {
    raw_name:
      "Auriculares gaming inal\u00e1mbricos EPOS GSP 370 7.1 a 149\u20ac en PcComponentes",
    raw_price: "149\u20ac",
    raw_discount: "-25%",
  },
  {
    raw_name:
      "Rebajas de Enero hasta 75% de descuento en PlayStation Store",
    raw_price: null,
    raw_discount: null,
  },
  {
    raw_name:
      "Ofertas diarias en McDonald\u00b4s con el Calendario de Adviento",
    raw_price: "1,50\u20ac",
    raw_discount: null,
  },
  {
    raw_name:
      "Memoria RAM Crucial Ballistix 8GB RGB a 33,99\u20ac en Amazon",
    raw_price: "55,99\u20ac",
    raw_discount: null,
  },
  {
    raw_name:
      "Auriculares Trust GXT488 Forze con licencia oficial a 19,95\u20ac en GAME",
    raw_price: "19,95\u20ac",
    raw_discount: "-50%",
  },
  {
    raw_name:
      "Teclado gaming mec\u00e1nico Razer BlackWidow V3 Tenkeyless a 69,99\u20ac en Amazon",
    raw_price: "69,99\u20ac",
    raw_discount: "-30%",
  },
  {
    raw_name: "Top ofertas del d\u00eda en AliExpress",
    raw_price: null,
    raw_discount: null,
  },
  {
    raw_name:
      "Altavoz Tronsmart MEGA PRO 60W por 63,99\u20ac en Aliexpress",
    raw_price: "63,99\u20ac",
    raw_discount: "-29%",
  },
  {
    raw_name:
      "Tablet Teclast T40 Plus en oferta a solo 168,25\u20ac por Wisecart",
    raw_price: "168,25\u20ac",
    raw_discount: "-22%",
  },
  {
    raw_name: "Kugoo Kirin G1 por 669,99\u20ac en Kugoo Spain",
    raw_price: "669,99\u20ac",
    raw_discount: "-16%",
  },
  {
    raw_name: "Xiaomi 11 Lite 5G 8/128GB a 279\u20ac en eBay",
    raw_price: "279\u20ac",
    raw_discount: "-24%",
  },
  {
    raw_name:
      "Rat\u00f3n gaming inal\u00e1mbrico Logitech G502 Lightspeed por 94,99\u20ac en PcComponentes",
    raw_price: "94,99\u20ac",
    raw_discount: "-26%",
  },
  {
    raw_name:
      "Mesa de aprendizaje para ni\u00f1os Baby Einstein por 33,40\u20ac en AliExpress",
    raw_price: "33,40\u20ac",
    raw_discount: "-52%",
  },
  {
    raw_name:
      "RAM Corsair Vengeance RGB 32GB por 128,78\u20ac en Amazon",
    raw_price: "128,78\u20ac",
    raw_discount: "-34%",
  },
  {
    raw_name: "Ofertas de Navidad en PcComponentes",
    raw_price: null,
    raw_discount: null,
  },
  {
    raw_name: "Poco M3 Pro 5G por solo 167,20\u20ac en eBay",
    raw_price: "167,20\u20ac",
    raw_discount: "-24%",
  },
  {
    raw_name:
      "Realme C11 2021 en oferta por solo 81,07\u20ac por Wisecart",
    raw_price: "81,07\u20ac",
    raw_discount: "-26%",
  },
  {
    raw_name: "Xiaomi Redmi Note 10 5G a VA a 183,20\u20ac en eBay",
    raw_price: "183,20\u20ac",
    raw_discount: "-20%",
  },
  {
    raw_name: "Xiaomi Mi Band 6 por 26,62\u20ac en Wisecart",
    raw_price: "26,62\u20ac",
    raw_discount: "-24%",
  },
  {
    raw_name: "Juego WRC 10 a 24,95\u20ac en GAME",
    raw_price: "24,95\u20ac",
    raw_discount: "-50%",
  },
  {
    raw_name:
      "Nintendo Switch Lite Edici\u00f3n Dialga & Palkia a 189\u20ac en Amazon",
    raw_price: "189\u20ac",
    raw_discount: "-17%",
  },
  {
    raw_name:
      "Ordenador educativo para ni\u00f1os VTech Genio Little App a 40,41\u20ac en Amazon",
    raw_price: "40,41\u20ac",
    raw_discount: "-22%",
  },
  {
    raw_name:
      "Patinete el\u00e9ctrico Kugoo S1 Pro por solo 239,99\u20ac en Kugoo Spain",
    raw_price: "239,99\u20ac",
    raw_discount: "-35%",
  },
  {
    raw_name:
      "Realme 7 5G en oferta a solo 217,80\u20ac por Wisecart",
    raw_price: "217,80\u20ac",
    raw_discount: "-22%",
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

  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
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
