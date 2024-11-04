import React from "react";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          <IoClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;