import React from "react";
import { graphql } from "msw";
import { render } from "@testing-library/react";

import { createCar } from "../apollo/resolvers";

import Home from "../pages/index";

const CARS_NUMBER = 23;
const cars = new Array(CARS_NUMBER).fill(null).map(createCar);

graphql.query("GetCars", (req, res, ctx) => {
  return res(
    ctx.data({
      cars,
    })
  );
});

test("renders cards", () => {
  const { getByTestId, getAllByRole } = render(<Home />);
  const cardsContainer = getByTestId("cards-container");
  expect(cardsContainer).toBeInTheDocument();
  expect(cardsContainer.children.length).toBe(CARS_NUMBER);

  const carsTitle = getAllByRole("heading", { level: 1 });
  carsTitle.forEach((title, i) => {
    expect(title).toHaveTextContent(cars[i].make);
  });
});
