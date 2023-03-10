import { ReactNode } from "react";
import classNames from "classnames";
import { CELL_SIZE } from "../../constants/Constants";
import sharedStyles from "../../assets/styles/Shared.module.css";
import styles from "./Board.module.css";

interface IBoardProps {
  rows: number;
  columns: number;
  disable?: boolean;
  children: ReactNode;
}

export default function Board({
  rows,
  columns,
  children,
  disable = false,
}: IBoardProps) {
  return (
    <div
      className={classNames(sharedStyles.inset, { [styles.disable]: disable })}
    >
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${columns}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${rows}, ${CELL_SIZE}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
