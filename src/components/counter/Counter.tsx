import classNames from "classnames";
import sharedStyles from "../../assets/styles/Shared.module.css";
import styles from "./Counter.module.css";

interface ICounterProps {
  value: number;
  digits?: number | undefined;
}

export default function Counter({ value, digits = 3 }: ICounterProps) {
  return (
    <div className={classNames(styles.container, sharedStyles.inset)}>
      {String(value)
        .replace("-", "")
        .padStart(digits, "0")
        .split("")
        .map((v, index) => {
          let _v = v;
          if (value < 0 && index === 0) {
            _v = "-";
          }
          return (
            <span
              key={index}
              className={classNames(styles.unit, styles["value" + _v])}
            >
              {_v}
            </span>
          );
        })}
    </div>
  );
}
