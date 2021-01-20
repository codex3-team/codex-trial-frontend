import Head from "next/head";
import { FC } from "react";
import { gql, useQuery } from "@apollo/client";

import { initializeApollo } from "../apollo/client";
import { Car } from "../apollo/cars";

import Card from "../components/Card";

const NUM_OF_CARS = 10000;

interface CarsData {
  cars: Car[];
}

export const GET_CARS = gql`
  query GetCars($offset: Int, $limit: Int) {
    cars(offset: $offset, limit: $limit) {
      id
      make
      model
      year
    }
  }
`;

interface QueryVariables {
  offset: number;
  limit: number;
}

interface Props {
  offset?: number;
  limit: number;
}

const Index: FC<Props> = ({ offset = 0, limit }) => {
  const { loading, error, data } = useQuery<CarsData, QueryVariables>(
    GET_CARS,
    {
      variables: {
        offset,
        limit,
      },
    }
  );

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div
      data-testid="cards-container"
      className="my-20 mx-auto w-9/12 grid grid-cols-cards gap-10"
    >
      {data?.cars.map(({ id, make, model, year }) => (
        <Card key={id} make={make} model={model} year={year} />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_CARS,
    variables: {
      offset: 0,
      limit: NUM_OF_CARS,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      limit: NUM_OF_CARS,
    },
  };
}

export default Index;
