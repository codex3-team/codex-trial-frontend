import { FC, useCallback, useState } from "react";
import cc from "classcat";
import { gql, useMutation } from "@apollo/client";

import styles from "../styles/main.module.scss";

export const ADD_CAR = gql`
  mutation AddCar($make: String!, $model: String!, $year: String!) {
    addCar(make: $make, model: $model, year: $year) {
      id
      make
      model
      year
    }
  }
`;

interface AddCarProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const AddCar: FC<AddCarProps> = ({ open, onClose, refetch }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2020);

  const [updateCar] = useMutation(ADD_CAR);

  const handleAddCar = useCallback(
    async (e) => {
      e.preventDefault();
      await updateCar({ variables: { make, model, year: year.toString() } });
      refetch();
      onClose();
    },
    [make, model, year, updateCar, refetch, onClose]
  );

  return (
    <div className={cc([styles.backdrop, { [styles.open]: open }])}>
      <div className={styles.content}>
        <div className="">
          <form onSubmit={handleAddCar}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Make
                    </label>
                    <input
                      type="text"
                      value={make}
                      onChange={({ target: { value } }) => setMake(value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Model
                    </label>
                    <input
                      type="text"
                      value={model}
                      onChange={({ target: { value } }) => setModel(value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <input
                      type="number"
                      value={year}
                      onChange={({ target: { valueAsNumber } }) =>
                        setYear(valueAsNumber)
                      }
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  onClick={onClose}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
