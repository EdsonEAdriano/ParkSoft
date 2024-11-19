"use client"; 

import React, { useState } from 'react';
import './dashboard.css'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import useEntries from '../../hooks/useEntries'; // Importando o hook
import Entry from '../entries/components/entry'; // Importando o componente Entry


// Registrando os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [totalVagas] = useState(20);
  const [vagasOcupadas, setVagasOcupadas] = useState(0);
  const [totalEntradasDoDia, setTotalEntradasDoDia] = useState(0);
  const [filtro, setFiltro] = useState('todos');
  const [periodo, setPeriodo] = useState<string>('30dias');
  const receitaTotal = 1000;
  const { entries, loading, error } = useEntries(); // Usando o hook
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

  const registrarEntrada = () => {
    setVagasOcupadas(prev => prev + 1);
    setTotalEntradasDoDia(prev => prev + 1);
  };

  const filtrarHistorico = () => {
    if (filtro === 'todos') return entries;
    if (filtro === 'abertos') return entries.filter(registro => !registro.status);
    if (filtro === 'fechados') return entries.filter(registro => registro.status);
    return [];
  };

  const atualizarDadosGrafico = (periodoSelecionado: string) => {
    if (periodoSelecionado === '30dias') {
      setDadosGrafico({
        labels: ['Últimos 30 dias'],
        datasets: [
          {
            label: 'Entradas',
            data: [3000],
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
            data: [15000],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    }
  };

  React.useEffect(() => {
    atualizarDadosGrafico(periodo);
  }, [periodo]);

  const entradasFiltradas = filtrarHistorico();

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {loading && <p>Carregando entradas...</p>}
      {error && <p>{error}</p>}
      <button onClick={registrarEntrada}>Registrar Entrada</button>
      <section className="estatisticas-vagas">
        <div className="estatistica-bloco">
          <p>Total de Vagas</p>
          <h3>{totalVagas}</h3>
        </div>
        <div className="estatistica-bloco">
          <p>Vagas Ocupadas</p>
          <h3>{vagasOcupadas}</h3>
        </div>
        <div className="estatistica-bloco">
          <p>Vagas Disponíveis</p>
          <h3>{totalVagas - vagasOcupadas}</h3>
        </div>
        <div className="estatistica-bloco">
          <p>Total de Entradas do Dia</p>
          <h3>{totalEntradasDoDia}</h3>
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
              <th>cor</th>
              <th>Entrada</th>
              <th>Saída</th>
              <th>Tempo de Permanência</th>
            </tr>
          </thead>
          <tbody>
            {entradasFiltradas.map((entry) => (
              <Entry
                key={entry.id}
                date={new Date(entry.entryDate).toLocaleDateString()}
                month={new Date(entry.entryDate).toLocaleString('default', { month: 'long' })}
                model={entry.model}
                brand={entry.brand}
                location={entry.parkingLocation}
                //time={/* Calcule o tempo aqui */}
                licensePlate={entry.plate}
                status={entry.status === 'P' ? 'Em aberto' : 'Saída registrada'}
                color={entry.color}
                onEdit={() => {/* Lógica para editar */}}
              />
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Relatório Financeiro</h2>
        <p>Receita Total: R$ {receitaTotal.toFixed(2)}</p>

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

