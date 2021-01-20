import Head from "next/head";
import { Fragment, FC, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { initializeApollo } from "../apollo/client";
import { ICar } from "../apollo/cars";

import Car from "../components/Car";
import AddCar from "../components/AddCar";

const NUM_OF_CARS = 10000;

interface CarsData {
  cars: ICar[];
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

interface Props {
  offset?: number;
  limit: number;
}

interface QueryVariables {
  offset: number;
  limit: number;
}

const Index: FC<Props> = ({ offset = 0, limit }) => {
  const [showNewCar, setShowNewCar] = useState(false);
  const { loading, error, data, refetch } = useQuery<CarsData, QueryVariables>(
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
    <Fragment>
      <div
        data-testid="cards-container"
        className="my-20 mx-auto w-9/12 grid grid-cols-cards gap-10"
      >
        {data?.cars.map(({ id, make, model, year }) => (
          <Car key={id} make={make} model={model} year={year} />
        ))}
      </div>
      <button
        onClick={() => setShowNewCar(true)}
        className="fixed bottom-20 right-20 rounded-full w-24 h-24 bg-blue-500 text-white flex justify-center items-center text-5xl font-medium"
      >
        +
      </button>
      <AddCar
        open={showNewCar}
        onClose={() => setShowNewCar(false)}
        refetch={refetch}
      />
    </Fragment>
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
