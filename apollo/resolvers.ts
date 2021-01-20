import { IResolvers } from "apollo-server-micro";
import cars, { ICar, newCar } from "./cars";

interface QueryArgs {
  limit: number;
  offset: number;
}

interface MutationArgs {
  make: string;
  model: string;
  year: string;
}

const resolvers: IResolvers = {
  Query: {
    cars(parent, args: QueryArgs): ICar[] {
      return cars.slice(args.offset, args.offset + args.limit);
    },
  },
  Mutation: {
    addCar(parent, args: MutationArgs): ICar[] {
      cars.unshift(newCar(args));
      return cars;
    },
  },
};

export default resolvers;
