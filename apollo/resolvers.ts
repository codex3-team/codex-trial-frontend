import { IResolvers } from "apollo-server-micro";
import { v4 as uuidv4 } from "uuid";
import faker from "faker";

interface Car {
  id: string;
  make: string;
  model: string;
  year: string;
}

function sampleCar() {
  return {
    id: uuidv4(),
    make: faker.lorem.word(),
    model: faker.lorem.words(2),
    year: String(faker.date.past().getFullYear()),
  };
}

const cars = new Array(10).fill(null).map(sampleCar);

interface Args {
  limit: number;
  offset: number;
}

const resolvers: IResolvers = {
  Query: {
    cars(parent, args: Args): Car[] {
      return cars.slice(args.offset, args.offset + args.limit);
    },
  },
};

export default resolvers;
