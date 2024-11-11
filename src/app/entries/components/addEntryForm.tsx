import React, { useState, useEffect } from "react";
import "./AddEntryForm.css";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import ColorPick from "./colorPick";

interface Entry {
  id: number;
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
  initialEntry?: Entry;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onEntryAdded, initialEntry }) => {
  const [entryDate, setEntryDate] = useState(new Date().toISOString().slice(0, 16));
  const [id, setID] = useState(0);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("");
  const [vehicleTypeID, setVehicleTypeID] = useState("");

  const [vehicleTypes, setVehicleTypes] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialEntry) {
      setID(initialEntry.id);
      setVehicleTypeID(initialEntry.vehicle_type);
      setBrand(initialEntry.brand);
      setModel(initialEntry.model);
      setPlate(initialEntry.plate);
      setColor(initialEntry.color);
      setEntryDate(formatDate(initialEntry.entryDate));
    }
  }, [initialEntry]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/vehicleTypes");
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

  const formatDate = (date: string | undefined) => {
    return date ? date.slice(0, 16) : new Date().toISOString().slice(0, 16);
  };
  
  useEffect(() => {
    if (initialEntry) {
      setEntryDate(formatDate(initialEntry.entryDate));
    }
  }, [initialEntry]);
  

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntryDate(e.target.value);
  };

  const addEntry = async () => {
    if (!vehicleTypeID) {
      console.error("O tipo de veículo não pode estar vazio.");
      return;
    }

    setIsSubmitting(true);

    const newEntry: Entry = {
      id,
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async () => {
    setIsSubmitting(true);

    const editedEntry: Entry = {
      id,
      vehicleTypeID,
      brand,
      model,
      plate,
      color,
      entryDate: entryDate,
    };

    try {
      await axios.put('/api/entries', editedEntry);
      onEntryAdded(); 
    } catch (error) {
      console.error("Erro ao editar entrada:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      await axios.delete(`/api/entries`, { data: { id: initialEntry?.id } });
      onEntryAdded();   
    } catch (error) {
      console.error("Erro ao excluir entrada:", error);
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
          onChange={(e) => setBrand(e.target.value)}
        />

        <label className="label">Modelo do Veículo</label>
        <input
          className="input"
          type="text"
          placeholder="Modelo do Veículo"
          value={model || ""}
          onChange={(e) => setModel(e.target.value)}
        />

        <div className="row">
          <div className="col">
            <label className="label">Placa do Veículo</label>
            <input
              className="input"
              type="text"
              placeholder="Placa do Veículo"
              value={plate || ""}
              onChange={(e) => setPlate(e.target.value)}
            />
          </div>
          
          <ColorPick value={color} onChange={(value) => setColor(value)}/>
        </div>

        <div className="row">
          <div className="col">
            <label className="label">Data de Entrada</label>
            <div className="date-input-container">
              <input
                className="input"
                type="datetime-local"
                value={entryDate || new Date().toISOString().slice(0, 16)}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>

        
        {initialEntry ? (
          <>
            <button type="button" className="button" onClick={handleEdit} disabled={isSubmitting}>
              Editar Entrada
            </button>
            <button type="button" className="delete-button" onClick={handleDelete} disabled={isSubmitting}>
              Excluir
            </button>
          </>
        ) : (
          <button type="submit" className="button" onClick={addEntry} disabled={isSubmitting}>
            Cadastrar
          </button>
        )}
      </form>
    </div>
  );
};

export default AddEntryForm;
