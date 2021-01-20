import { FC } from "react";

interface CarProps {
  make: string;
  model: string;
  year: string;
}

const Car: FC<CarProps> = ({ make, model, year }) => {
  return (
    <article className="h-80 w-60 p-9 box-content flex flex-col bg-white shadow transition-all duration-300 hover:shadow-2xl">
      <main>
        <h1 className="m-0 text-3xl font-medium text-gray-600">{make}</h1>
        <h2 className="mx-0 mb-0 mt-7 text-xl font-light text-gray-600">
          {model}
        </h2>
      </main>
      <hr className="mx-0 mb-0 mt-auto text-opacity-20 text-black" />
      <footer className="mt-7 font-sans text-base">
        <span>{year}</span>
      </footer>
    </article>
  );
};

export default Car;
