"use client";

import Entry from "./components/entry";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AddButton from "./components/addEntryButton";
import Modal from "./components/Modal";
import AddEntryForm from "./components/addEntryForm";
import SetExitEntry from "./components/setExitEntry";
import "./page.css";

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
  exit_date: Date;
  price: number;
}

export default function Entries() {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const entriesPerPage = 4;
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);
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
    setIsModalExitOpen(false);
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

  const handleSetExitEntry = (entry: IEntry) => {
    setIsModalExitOpen(true);
    setInitialEntry(entry);
  };

  const filteredEntries = entries.filter(entry =>
    entry.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="entries-main">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Entradas</h1>
        <AddButton onClick={() => {
          setIsModalOpen(true);
          setInitialEntry(null);
        }} />
      </div>

      <input
        type="text"
        placeholder="Buscar entradas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        currentEntries.map((row) => (
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
              exit_time={
                new Date(row.exit_date).getHours() +
                ":" +
                String(new Date(row.exit_date).getMinutes()).padStart(2, "0")
              }
              price={row.price.toFixed(2)}
              licensePlate={row.plate}
              status={row.status}
              color={row.color}
              onSetExit={() => handleSetExitEntry(row)}
              onEdit={() => handleEditEntry(row)}
            />
          </div>
        ))
      )}

      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          &lt;
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => {
          setIsModalOpen(false);
          setIsModalExitOpen(false);
          setInitialEntry(null);
        }}>
          <AddEntryForm onEntryAdded={handleEntryAdded} initialEntry={initialEntry} />
        </Modal>
      )}

      {isModalExitOpen && (
        <Modal onClose={() => {
          setIsModalOpen(false);
          setIsModalExitOpen(false);
          setInitialEntry(null);
        }}>
          <SetExitEntry onEntryAdded={handleEntryAdded} initialEntry={initialEntry} />
        </Modal>
      )}
    </div>
  );
}
