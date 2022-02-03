import styles from "./Popup.module.scss";
import { IPopup } from "./interface";
import { FC } from "react";

const Popup: FC<IPopup> = ({ children, trigger, setTrigger }) => {
  return trigger ? (
    <div className={`${styles.Popup}`}>
      <div className={`${styles.PopupInner}`}>
        <button
          type="button"
          className={`btn d-flex justify-content-center align-items-center ${styles.CloseBtn}`}
          onClick={setTrigger}
        >
          x{" "}
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Popup;
