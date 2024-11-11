"use client"; // Adicionando a diretiva para tornar o componente um Client Component

import React, { useState } from 'react';
import './dashboard.css'; // Importando o CSS
import { Bar } from 'react-chartjs-2'; // Importando o gráfico de barras
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrando os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  // Controle de Vagas
  const [totalVagas, setTotalVagas] = useState(100);
  const [vagasOcupadas, setVagasOcupadas] = useState(0);
  const [historico, setHistorico] = useState<{ placa: string; entrada: string; saida?: string }[]>([]);
  const [receitaTotal, setReceitaTotal] = useState(0);
  const [periodo, setPeriodo] = useState<'30dias' | '12meses'>('30dias'); // Estado para o filtro

  // Função para adicionar veículo ao estacionamento
  const adicionarVeiculo = (placa: string) => {
    const entrada = new Date().toLocaleString();
    setHistorico((prevHistorico) => [...prevHistorico, { placa, entrada }]);
    setVagasOcupadas(vagasOcupadas + 1);
  };

  // Função para registrar saída do veículo e calcular o valor
  const registrarSaida = (placa: string) => {
    const saida = new Date().toLocaleString();
    setHistorico((prevHistorico) =>
      prevHistorico.map((registro) =>
        registro.placa === placa && !registro.saida ? { ...registro, saida } : registro
      )
    );

    const tempoEstadia = 1; // Defina a lógica para calcular o tempo de estadia
    const tarifa = 5; // Defina a tarifa por hora ou fracionada
    const valor = tempoEstadia * tarifa;
    setReceitaTotal(receitaTotal + valor);
    setVagasOcupadas(vagasOcupadas - 1);
  };

  // Função para calcular entradas do mês ou dos últimos 30 dias
  const calcularEntradas = () => {
    const entradasPorPeriodo: number[] = periodo === '30dias' ? Array(30).fill(0) : Array(12).fill(0);
    const dataAtual = new Date();

    historico.forEach((registro) => {
      const dataEntrada = new Date(registro.entrada);
      if (periodo === '30dias' && dataEntrada >= new Date(dataAtual.setDate(dataAtual.getDate() - 30))) {
        const dia = dataEntrada.getDate() - 1; // Ajusta para índice 0
        entradasPorPeriodo[dia] += 1; // Incrementa o contador para o dia correspondente
      } else if (periodo === '12meses' && dataEntrada.getFullYear() === dataAtual.getFullYear()) {
        const mes = dataEntrada.getMonth(); // Mês atual (0-11)
        entradasPorPeriodo[mes] += 1; // Incrementa o contador para o mês correspondente
      }
    });

    return entradasPorPeriodo;
  };

  // Dados para o gráfico
  const dadosGrafico = {
    labels: periodo === '30dias' ? Array.from({ length: 30 }, (_, i) => `${i + 1}`) : Array.from({ length: 12 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Entradas',
        data: calcularEntradas(),
        backgroundColor: 'rgba(74, 144, 226, 0.6)', // Cor do gráfico
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Controle de Vagas */}
      <section>
        <h2>Controle de Vagas</h2>
        <p>Total de Vagas: {totalVagas}</p>
        <p>Vagas Ocupadas: {vagasOcupadas}</p>
        <p>Vagas Disponíveis: {totalVagas - vagasOcupadas}</p>
      </section>

      {/* Histórico de Entrada e Saída */}
      <section>
        <h2>Histórico de Entrada e Saída</h2>
        <ul>
          {historico.map((registro, index) => (
            <li key={index}>
              Placa: {registro.placa} | Entrada: {registro.entrada} | Saída: {registro.saida || 'Em Aberto'}
            </li>
          ))}
        </ul>
      </section>

      {/* Relatório Financeiro */}
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
              onChange={() => setPeriodo('30dias')}
            />
            Últimos 30 dias
          </label>
          <label>
            <input
              type="radio"
              value="12meses"
              checked={periodo === '12meses'}
              onChange={() => setPeriodo('12meses')}
            />
            Últimos 12 meses
          </label>
        </div>

        <Bar data={dadosGrafico} /> {/* Gráfico de colunas */}
      </section>
    </div>
  );
};

export default Dashboard;
