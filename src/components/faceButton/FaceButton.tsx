import classNames from "classnames";
import styles from "./FaceButton.module.css";
import { FaceTypes } from "../../constants/Constants";

interface IFaceButtonProps {
  type: FaceTypes;
  onClick: () => void;
}

export default function FaceButton({ type, onClick }: IFaceButtonProps) {
  return (
    <div
      className={classNames(styles.container, styles[type])}
      onClick={onClick}
    />
  );
}
