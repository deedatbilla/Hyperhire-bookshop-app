"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_module_1 = __importDefault(require("../repository/db.module"));
const faker_1 = require("@faker-js/faker");
function generateFakeStrings(count) {
    const fakeStrings = [];
    for (let i = 0; i < count; i++) {
        fakeStrings.push(faker_1.faker.lorem.word()); // You can replace this with any faker method for strings
    }
    return fakeStrings;
}
function createBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = [];
        for (var i = 0; i < 1000; i++) {
            data.push({
                title: faker_1.faker.commerce.productName(),
                writer: faker_1.faker.person.fullName(),
                price: Math.floor(Math.random() * 100) + 1,
                coverImage: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
                tags: generateFakeStrings(5),
            });
        }
        yield db_module_1.default.book.createMany({
            data,
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        createBooks();
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_module_1.default.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield db_module_1.default.$disconnect();
    process.exit(1);
}));
