import { Book } from "@prisma/client";
import prisma from "../repository/db.module";
import { faker } from "@faker-js/faker";

function generateFakeStrings(count) {
  const fakeStrings = [];

  for (let i = 0; i < count; i++) {
    fakeStrings.push(faker.lorem.word()); // You can replace this with any faker method for strings
  }

  return fakeStrings;
}
async function createBooks(): Promise<void> {
  const data = [];
  for (var i = 0; i < 1000; i++) {
    data.push({
      title: faker.commerce.productName(),
      writer: faker.person.fullName(),
      price: Math.floor(Math.random() * 100) + 1,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
      tags: generateFakeStrings(5),
    });
  }

  await prisma.book.createMany({
    data,
  });
}

async function main() {
  createBooks();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
