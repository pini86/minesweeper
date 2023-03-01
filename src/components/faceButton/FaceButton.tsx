import classNames from "classnames";
import styles from "./FaceButton.module.css";
import { FaceTypes } from "../../constants/Constants";

function getClass(type: FaceTypes): string {
  switch (type) {
    case FaceTypes.OHH:
      return styles.ohh;
    case FaceTypes.DED:
      return styles.ded;
    case FaceTypes.KOOL:
      return styles.kool;
    case FaceTypes.SMILE:
    default:
      return styles.smile;
  }
}

interface IFaceButtonProps {
  type: FaceTypes;
  onClick: () => void;
}

export default function FaceButton({ type, onClick }: IFaceButtonProps) {
  return (
    <div
      className={classNames(styles.container, getClass(type))}
      onClick={onClick}
    />
  );
}
