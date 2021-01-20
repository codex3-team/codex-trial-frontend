import { IResolvers } from "apollo-server-micro";
import cars, { ICar } from "./cars";

interface Args {
  limit: number;
  offset: number;
}

const resolvers: IResolvers = {
  Query: {
    cars(parent, args: Args): ICar[] {
      return cars.slice(args.offset, args.offset + args.limit);
    },
  },
};

export default resolvers;
