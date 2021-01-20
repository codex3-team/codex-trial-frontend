import Head from "next/head";
import Card from "../components/Card";
import { createCar } from "../apollo/resolvers";
import styles from "../styles/Card.module.scss";

const cars = new Array(10).fill(null).map(createCar);

const Home = () => {
  return (
    <div
      data-testid="cards-container"
      className="my-20 mx-auto w-9/12 grid grid-cols-cards gap-10"
    >
      {cars.map(({ id, make, model, year }) => (
        <Card key={id} make={make} model={model} year={year} />
      ))}
    </div>
  );
};

export default Home;
