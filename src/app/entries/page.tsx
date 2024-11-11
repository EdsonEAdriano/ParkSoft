"use client";

import Entry from "./components/entry";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AddButton from "./components/addEntryButton";
import Modal from "./components/Modal";
import AddEntryForm from "./components/addEntryForm";

interface IEntry {
  id: number;
  vehicleTypeID: string;
  brand: string;
  model: string;
  plate: string;
  color: string;
  parking_location: string;
  status: string;
  entry_date: Date;
}

export default function Entries() {
  const [entries, setEntries] = useState<IEntry[]>([]); 
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialEntry, setInitialEntry] = useState<IEntry | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/entries")
      .then((response) => {
        setEntries(response.data.entries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao fazer a requisição:", error);
        setLoading(false);
      });
  }, []);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const handleEntryAdded = () => {
    setIsModalOpen(false);
    setLoading(true);
    axios
      .get("http://localhost:3000/api/entries")
      .then((response) => {
        setEntries(response.data.entries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao fazer a requisição:", error);
        setLoading(false);
      });
  };

  const handleEditEntry = (entry: IEntry) => {
    setIsModalOpen(true);
    setInitialEntry(entry);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Entradas</h1>
        <AddButton onClick={() => setIsModalOpen(true)} />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        entries.map((row) => (
          <div key={row.id}>
            <Entry
              date={String(new Date(row.entry_date).getDate())}
              month={months[new Date(row.entry_date).getMonth()]}
              model={row.model}
              brand={row.brand}
              location={row.parking_location ?? "Não definido"}
              time={
                new Date(row.entry_date).getHours() +
                ":" +
                String(new Date(row.entry_date).getMinutes()).padStart(2, "0")
              }
              licensePlate={row.plate}
              status={row.status}
              color={row.color}
              onEdit={() => handleEditEntry(row)}
            />
          </div>
        ))
      )}

      {isModalOpen && (
        <Modal onClose={() => {
          setIsModalOpen(false);
          setInitialEntry(null);
        }}>
          <AddEntryForm onEntryAdded={handleEntryAdded} initialEntry={initialEntry} />
        </Modal>
      )}
    </div>
  );
}
