import { FC } from "react";
import { GridChildComponentProps } from "react-window";
import Car from "../components/Car";

export const NUM_COLUMNS = 4;
export const WIDTH = 300;
export const HEIGHT = 380;
export const GUTTER_SIZE = 30;

interface CellProps extends GridChildComponentProps {}

const Cell: FC<CellProps> = ({ data, style, columnIndex, rowIndex }) => {
  const car = data[columnIndex * NUM_COLUMNS + rowIndex];

  return (
    <div
      style={{
        ...style,
        left: (Number(style.left) || 0) + GUTTER_SIZE,
        top: (Number(style.top) || 0) + GUTTER_SIZE,
        width: (Number(style.width) || 0) - GUTTER_SIZE,
        height: (Number(style.height) || 0) - GUTTER_SIZE,
      }}
    >
      <Car {...car} />
    </div>
  );
};

export default Cell;
