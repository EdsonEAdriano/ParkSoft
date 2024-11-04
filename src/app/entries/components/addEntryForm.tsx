import React, { useState, useEffect } from "react";
import "./AddEntryForm.css";
import axios from "axios";

interface Entry {
  vehicleTypeID: string;
  brand: string;
  model: string;
  plate: string;
  color: string;
  entryDate: string;
}

interface VehicleType {
  id: number;
  text: string;
}

interface AddEntryFormProps {
  onEntryAdded: () => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onEntryAdded }) => {
  const [entryDate, setEntryDate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("");
  const [vehicleTypeID, setVehicleTypeID] = useState("");

  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:MM para datetime-local
    setEntryDate(formattedDate);

    axios
      .get("http://localhost:3000/api/vehicleTypes")
      .then((response) => {
        setVehicleTypes(response.data.vehicleTypes);
      })
      .catch((error) => {
        console.error("Erro ao fazer a requisição:", error);
      });
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntryDate(e.target.value); // Atualiza o estado com o valor do input
  };

  const addEntry = async () => {
    const newEntry: Entry = {
      vehicleTypeID,
      brand,
      model,
      plate,
      color,
      entryDate: entryDate,
    };

    try {
      await axios.post("/api/entries", newEntry);
      onEntryAdded();
    } catch (error) {
      console.error("Erro ao adicionar entrada:", error);
    }
  };

  return (
    <div className="container">
      <div className="icon-container">
        <span className="icon">P</span>
      </div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addEntry();
        }}
      >
        <label className="label">Tipo do Veículo</label>
        <select
          className="input"
          value={vehicleTypeID}
          onChange={(e) => setVehicleTypeID(e.target.value)}
        >
          {vehicleTypes.map((vehicleType: VehicleType) => (
            <option key={vehicleType.id} value={vehicleType.id}>
              {vehicleType.text}
            </option>
          ))}
        </select>

        <label className="label">Marca do Veículo</label>
        <input
          className="input"
          type="text"
          placeholder="Marca do Veículo"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <label className="label">Modelo do Veículo</label>
        <input
          className="input"
          type="text"
          placeholder="Modelo do Veículo"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

        <div className="row">
          <div className="col">
            <label className="label">Placa do Veículo</label>
            <input
              className="input"
              type="text"
              placeholder="Placa do Veículo"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
            />
          </div>
          <div className="col">
            <label className="label">Cor do Veículo</label>
            <input
              className="input"
              type="text"
              placeholder="Cor do Veículo"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label className="label">Data de Entrada</label>
            <div className="date-input-container">
              <input
                className="input"
                type="datetime-local"
                value={entryDate}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>

        <button type="button" className="button" onClick={addEntry}>
          Cadastrar Entrada
        </button>
      </form>
    </div>
  );
};

export default AddEntryForm;
