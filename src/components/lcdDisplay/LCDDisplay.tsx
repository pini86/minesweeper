import classNames from "classnames";
import sharedStyles from "../../assets/styles/Shared.module.css";
import styles from "./LCDDisplay.module.css";

interface LCDDisplayProps {
  value: number;
  digits?: number | undefined;
}

export default function LCDDisplay({ value, digits = 3 }: LCDDisplayProps) {
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
