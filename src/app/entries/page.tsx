"use client";

import Entry from './components/entry';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

interface IEntry {
  id: number;
  vehicle_text: string;
  plate: string;
  color: string;
  parking_location: string;
  status: string;
  entry_date: Date; 
}

export default function Entries() {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/entries')
      .then(response => {
        setEntries(response.data.entries);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao fazer a requisição:', error);
        setLoading(false);
      });
  }, []);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];


  return (
    <div>
      <h1>Entradas</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        entries.map((row) => (
          <div key={row.id}>
            <Entry
              date={String(new Date(row.entry_date).getDate())}
              month={months[new Date(row.entry_date).getMonth()]}
              model={row.vehicle_text}
              location={row.parking_location ?? 'Não definido'}
              time={new Date(row.entry_date).getHours() + ':' + String(new Date(row.entry_date).getMinutes()).padStart(2, '0')}
              licensePlate={row.plate}  
              status={row.status}
              color={row.color}
            />
          </div>
        ))
      )}
    </div>
  );
}
