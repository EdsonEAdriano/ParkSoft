"use client"; 

import React, { useState } from 'react';
import './dashboard.css'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import useEntries from '../../hooks/useEntries';
import { darken } from 'polished';

interface Entry {
  id: number;
  plate: string;
  color: string;
  status: string;
  status_description: string;
  entry_date: string;
  exit_date?: string;
  duration?: string;
}

interface ParkingStatus {
  total_spaces: number;
  available_spaces: number;
  busy_spaces: number;
  today_entries: number;
  total_receipt: number;
  last_30_days_entries: number;
  last_12_months_entries: number;
}

// Registrando os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [filtro, setFiltro] = useState('todos');
  const [periodo, setPeriodo] = useState<string>('30dias');
  const { loading, error } = useEntries();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [parkingStatus, setparkingStatus] = useState<ParkingStatus>();
  const [dadosGrafico, setDadosGrafico] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'Entradas',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  const filtrarHistorico = () => {
    if (filtro === 'todos') return entries;
    if (filtro === 'abertos') return entries.filter(registro => registro.status === 'P');
    if (filtro === 'fechados') return entries.filter(registro => registro.status === 'C');
    return [];
  };

  const atualizarDadosGrafico = (periodoSelecionado: string) => {
    if (periodoSelecionado === '30dias') {
      setDadosGrafico({
        labels: ['Últimos 30 dias'],
        datasets: [
          {
            label: 'Entradas',
            data: [parkingStatus.last_30_days_entries || 0],  
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    } else if (periodoSelecionado === '12meses') {
      setDadosGrafico({
        labels: ['Últimos 12 meses'],
        datasets: [
          {
            label: 'Entradas',
            data: [parkingStatus.last_12_months_entries || 0],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    }
  };

  const fetchEntries = async () => {
    const response = await fetch('/api/dashboard/entries'); // Chamada à API
    const data = await response.json();

    if (response.ok) {
      setEntries(data.entries); // Atualizando o estado com as entradas
    } else {
      console.error(data.error); // Tratamento de erro
    }
  };

  const fetchParkingStatus = async () => {
    const response = await fetch('/api/dashboard/parking');
    const data = await response.json();

    if (response.ok) {
      setparkingStatus(data.parking_status[0]); // Atualizando o estado com as entradas
    } else {
      console.error(data.error); // Tratamento de erro
    }
  };

  React.useEffect(() => {
    fetchEntries(); // Buscando entradas ao montar o componente
    fetchParkingStatus();   
    if (parkingStatus) {
      atualizarDadosGrafico(periodo);
    }
  }, [periodo, parkingStatus]);



  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {loading && <p>Carregando entradas...</p>}
      {error && <p>{error}</p>}
      <section className="estatisticas-vagas">
        <div className="estatistica-bloco">
          <p>Total de Vagas</p>
          <h3>{parkingStatus?.total_spaces}</h3>
        </div>
        <div className="estatistica-bloco">
          <p>Vagas Ocupadas</p>
          <h3>{parkingStatus?.busy_spaces}</h3>
        </div>
        <div className="estatistica-bloco">
          <p>Vagas Disponíveis</p>
          <h3>{parkingStatus?.available_spaces}</h3>
        </div>
        <div className="estatistica-bloco">
          <p>Total de Entradas do Dia</p>
          <h3>{parkingStatus?.today_entries}</h3>
        </div>
      </section>
      <section>
        <h2>Histórico de Entrada e Saída</h2>
        <div className="filtro-container">
          <button onClick={() => setFiltro('todos')}>Todos</button>
          <button onClick={() => setFiltro('abertos')}>Abertos</button>
          <button onClick={() => setFiltro('fechados')}>Fechados</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Cor</th>
              <th>Status</th>
              <th>Entrada</th>
              <th>Saída</th>
              <th>Permanência</th>
            </tr>
          </thead>
          <tbody>
            {filtrarHistorico().map((registro: Entry) => (
              <tr key={registro.id}>
                <td>{registro.plate}</td>
                <td style={{ backgroundColor: darken(-0.2, registro.color)  }}></td>
                <td>{registro.status_description}</td>
                <td>{registro.entry_date}</td>
                <td>{registro.exit_date}</td> 
                <td>{registro.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Relatório Financeiro</h2>
        <p>Receita Total: R$ {parkingStatus?.total_receipt.toFixed(2)}</p>

        {/* Filtro de Período */}
        <div>
          <label>
            <input
              type="radio"
              value="30dias"
              checked={periodo === '30dias'}
              onChange={() => {
                setPeriodo('30dias');
                atualizarDadosGrafico('30dias');
              }}
            />
            Últimos 30 dias
          </label>
          <label>
            <input
              type="radio"
              value="12meses"
              checked={periodo === '12meses'}
              onChange={() => {
                setPeriodo('12meses');
                atualizarDadosGrafico('12meses');
              }}
            />
            Últimos 12 meses
          </label>
        </div>

        {/* Gráfico de Colunas */}
        <Bar data={dadosGrafico} />
      </section>
    </div>
  );
};

export default Dashboard;

