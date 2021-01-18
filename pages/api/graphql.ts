import { ApolloServer, gql, IResolvers } from "apollo-server-micro";
import { v4 as uuidv4 } from "uuid";
import faker from "faker";

const typeDefs = gql`
  type Query {
    cars(limit: Int = 1, offset: Int = 0): [Car!]!
  }
  type Car {
    id: ID!
    make: String!
    model: String!
    year: String!
  }
`;

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

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
