import React, { useState, useEffect } from "react";
import "./SetExitEntry.css";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import ColorPick from "./colorPick";
import AddressSelector from "./addressSelector";

interface Entry {
  id: number;
  vehicleTypeID: string;
  brand: string;
  model: string;
  plate: string;
  color: string;
  parkingLocation: string;
  entryDate: string;
  exitDate: string;
  price: number;
}

interface SendEntry {
  id: number;
  exitDate: string;
  price: number;
}

interface VehicleType {
  id: number;
  text: string;
}

interface SetEntryFormProps {
  initialEntry: Entry;
  onEntryAdded: () => void;
}

const SetExitEntry: React.FC<SetEntryFormProps> = ({ initialEntry, onEntryAdded }) => {
  const [entryDate, setEntryDate] = useState();
  const [exitDate, setExitDate] = useState();
  const [id, setID] = useState(0);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [price, setPrice] = useState(0);
  const [parkingLocation, setParkingLocation] = useState("");
  const [vehicleTypeID, setVehicleTypeID] = useState("");

  const [vehicleTypes, setVehicleTypes] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setDate = (exitDate: Date) => {
    const entryDate = new Date(initialEntry.entry_date);

    entryDate.setHours(entryDate.getHours() - 3);

    setEntryDate(entryDate.toISOString().slice(0, 16));

    console.log(exitDate  )

    exitDate.setHours(exitDate.getHours() - 3);

    setExitDate(exitDate.toISOString().slice(0, 16));

    const differenceMinutes = (exitDate - entryDate) / (1000 * 60);

    console.log(differenceMinutes)

    setPrice(() => {
      let calculatedPrice;
    
      // Se os minutos forem até 15, o valor é 0
      if (differenceMinutes <= 15) {
        calculatedPrice = 0;
      } else if (differenceMinutes <= 60) {
        // Para minutos até 60, aumenta de 10 em 10 a cada 30 minutos
        calculatedPrice = Math.floor((differenceMinutes / 30)) * 10;
      } else {
        // Após 60 minutos, aumenta de 20 em 20 a cada 30 minutos
        calculatedPrice = Math.floor((differenceMinutes / 30)) * 20;
      }
    
      // Garante que o valor não seja menor que 0
      return Math.max(0, calculatedPrice);
    });
}

  useEffect(() => {
    if (initialEntry) {
      setID(initialEntry.id);
      setVehicleTypeID(initialEntry.vehicle_type);
      setBrand(initialEntry.brand);
      setModel(initialEntry.model);
      setPlate(initialEntry.plate);
      setColor(initialEntry.color);
      setParkingLocation(initialEntry.parking_location);

      

      setDate(new Date());
      
    }
  }, [initialEntry]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/vehicleTypes",
        );
        setVehicleTypes(response.data.vehicleTypes);

        if (!initialEntry) {
          setVehicleTypeID(response.data.vehicleTypes[0]?.id.toString());
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);




  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExitDate(e.target.value);
    setDate(new Date(e.target.value));
  };

  



  const setExitEntry = async () => {
    setIsSubmitting(true);

    const entry: SendEntry = {
      id,
      exitDate,
      price
    };

    try {
      await axios.put("/api/entries/exit", entry);
      onEntryAdded();
    } catch (error) {
      console.error("Erro ao adicionar entrada:", error);
    } finally {
      setIsSubmitting(false);
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
          setExitEntry();
        }}
      >
        <label className="label">Tipo do Veículo</label>
        <select
          className="input"
          value={vehicleTypeID}
          onChange={(e) => setVehicleTypeID(e.target.value)}
          disabled
        >
          {vehicleTypes.map((vehicleType: VehicleType) => (
            <option key={vehicleType.id} value={vehicleType.id.toString()}>
              {vehicleType.text}
            </option>
          ))}
        </select>

        <label className="label">Marca do Veículo</label>
        <input
          className="input"
          type="text"
          placeholder="Marca do Veículo"
          value={brand || ""}
          disabled
        />

        <label className="label">Modelo do Veículo</label>
        <input
          className="input"
          type="text"
          placeholder="Modelo do Veículo"
          value={model || ""}
          disabled
        />

        <div className="row">
          <div className="col">
            <label className="label">Placa do Veículo</label>
            <input
              className="input"
              type="text"
              placeholder="Placa do Veículo"
              value={plate || ""}
              disabled
            />
          </div>

          <ColorPick value={color} isDisable={true} />
        </div>

        <div className="row">
          <div className="col">
            <div className="inputContainer">
              <label className="label">Vaga</label>
            </div>
            <AddressSelector value={parkingLocation} isDisable={true} />
          </div>

          <div className="col">
            <label className="label">Data de Entrada</label>
            <div className="date-input-container">
              <input
                className="input"
                type="datetime-local"
                value={entryDate || new Date().toISOString().slice(0, 16)}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label className="label">Data de Saída</label>
            <div className="date-input-container">
              <input
                className="input"
                type="datetime-local"
                value={exitDate}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div className="col">
            <label className="label">Preço</label>
            <input
              className="input"
              type="text"
              placeholder="Preço"
              value={`R$ ${price.toFixed(2)}`}
              disabled
              onChange={(e) => setPrice(Number(e.target.value.replace('R$ ', '').replace(',', '.')))}
            />
          </div>
        </div>
        <button
          type="submit"
          className="button"
          disabled={isSubmitting}
        >
          Registrar Saída
        </button>
      </form>
    </div>
  );
};

export default SetExitEntry;
