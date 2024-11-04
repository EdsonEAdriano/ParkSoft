import React from 'react';
import { IoMdAddCircle } from "react-icons/io";
import './addEntryButton.css';

const AddButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button className="add-button" onClick={onClick}>
        <IoMdAddCircle /> Registrar Entrada
    </button>
  );
};

export default AddButton;