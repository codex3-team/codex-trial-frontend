import { v4 as uuidv4 } from "uuid";
import faker from "faker";

export interface ICar {
  id: string;
  make: string;
  model: string;
  year: string;
}

export function createCar() {
  return {
    id: uuidv4(),
    make: faker.lorem.word(),
    model: faker.lorem.words(2),
    year: String(faker.date.past().getFullYear()),
  };
}

const cars = new Array(20000).fill(null).map(createCar);

export default cars;
