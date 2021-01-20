import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";

import { GET_CARS } from "../pages/index";
import { initializeApollo } from "../apollo/client";
import { createCar } from "../apollo/cars";

import Home from "../pages/index";

const CARS_NUMBER = 23;
const cars = new Array(CARS_NUMBER).fill(null).map(createCar);

const mocks = [
  {
    request: {
      query: GET_CARS,
      variables: {
        offset: 0,
        limit: CARS_NUMBER,
      },
    },
    result: {
      data: {
        cars,
      },
    },
  },
];

test("renders cards", async () => {
  const client = initializeApollo();

  const { getByTestId, getAllByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home limit={CARS_NUMBER} />
    </MockedProvider>
  );
  await waitFor(() => {
    const cardsContainer = getByTestId("cards-container");

    expect(cardsContainer).toBeInTheDocument();
    expect(cardsContainer.children.length).toBe(CARS_NUMBER);

    const carsTitle = getAllByRole("heading", { level: 1 });
    carsTitle.forEach((title, i) => {
      expect(title).toHaveTextContent(cars[i].make);
    });
  });
});
