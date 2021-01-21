import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";

import { GET_CARS } from "../pages/index";
import { initializeApollo } from "../apollo/client";
import { createCar } from "../apollo/cars";

import AddCar, { ADD_CAR } from "../components/AddCar";

const car = createCar();

const mocks = [
  {
    request: {
      query: GET_CARS,
      variables: {
        offset: 0,
        limit: 1,
      },
    },
    result: {
      data: {
        cars: [],
      },
    },
  },
  {
    request: {
      query: ADD_CAR,
      variables: { make: car.make, model: car.model, year: car.year },
    },
    result: {
      data: {
        car,
      },
    },
  },
  {
    request: {
      query: GET_CARS,
      variables: {
        offset: 0,
        limit: 1,
      },
    },
    result: {
      data: {
        cars: [car],
      },
    },
  },
  {
    request: {
      query: ADD_CAR,
      variables: { make: "", model: "", year: "2020" },
    },
    result: {
      data: {
        car,
      },
    },
  },
];

test("renders cards", async () => {
  const onClose = jest.fn();
  const refetch = jest.fn();

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AddCar open onClose={onClose} refetch={refetch} />
    </MockedProvider>
  );
  const addButton = getByText(/add/i);
  addButton.click();

  await waitFor(() => {
    expect(onClose).toHaveBeenCalled();
    expect(refetch).toHaveBeenCalled();
  });
});
