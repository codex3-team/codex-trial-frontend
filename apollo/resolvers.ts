import { IResolvers } from "apollo-server-micro";
import cars, { Car } from "./cars";

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
