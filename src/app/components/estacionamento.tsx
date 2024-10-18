import React, { useState } from "react";
import "./Estacionamento.css";

const Estacionamento: React.FC = () => {
  // Definindo o tamanho inicial do estacionamento
  const [linhas, setLinhas] = useState<number>(5);
  const [colunas, setColunas] = useState<number>(10);

  // Inicializar o estacionamento com vagas vazias ('-')
  const inicializarEstacionamento = (linhas: number, colunas: number): string[][] => {
    const matriz: string[][] = Array.from({ length: linhas }, () => Array(colunas).fill("-"));
    matriz[0][0] = "E"; // Marcar a entrada inicial
    return matriz;
  };

  const [estacionamento, setEstacionamento] = useState<string[][]>(inicializarEstacionamento(linhas, colunas));
  const [entrada, setEntrada] = useState<{ linha: number; coluna: number }>({ linha: 0, coluna: 0 });
  const [selectedSpaces, setSelectedSpaces] = useState<{ linha: number; coluna: number }[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false); // Estado de arraste

  const handleMouseDown = (linha: number, coluna: number) => {
    setIsDragging(true);
    setSelectedSpaces([{ linha, coluna }]); // Inicia a seleção com a célula clicada
  };

  const handleMouseEnter = (linha: number, coluna: number) => {
    if (isDragging) {
      setSelectedSpaces((prev) => [...prev, { linha, coluna }]); // Adiciona novas células à seleção ao arrastar
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const inserirCaminho = () => {
    const novoEstacionamento = [...estacionamento];

    selectedSpaces.forEach(({ linha, coluna }) => {
      if (novoEstacionamento[linha][coluna] === "-") {
        novoEstacionamento[linha][coluna] = "*"; // Insere o caminho
      }
    });

    setEstacionamento(novoEstacionamento);
    setSelectedSpaces([]); // Limpa a seleção após inserir o caminho
  };

  const ocuparVaga = () => {
    const novoEstacionamento = [...estacionamento];

    selectedSpaces.forEach(({ linha, coluna }) => {
      // Remover o caminho, se houver
      if (novoEstacionamento[linha][coluna] === "*") {
        novoEstacionamento[linha][coluna] = "-";
      }

      // Ocupar a vaga
      novoEstacionamento[linha][coluna] = "O";
    });

    setEstacionamento(novoEstacionamento);
    setSelectedSpaces([]); // Limpa a seleção após ocupar as vagas
  };

  const liberarVaga = () => {
    const novoEstacionamento = [...estacionamento];
    selectedSpaces.forEach(({ linha, coluna }) => {
      novoEstacionamento[linha][coluna] = "-"; // Libera as vagas selecionadas
    });
    setEstacionamento(novoEstacionamento);
    setSelectedSpaces([]); // Limpa a seleção após liberar as vagas
  };

  const handleAction = (action: "setEntrada" | "ocupar" | "liberar" | "caminho") => {
    if (selectedSpaces.length > 0) {
      if (action === "setEntrada") {
        const { linha, coluna } = selectedSpaces[0]; // Apenas a primeira célula será a entrada
        const novoEstacionamento = inicializarEstacionamento(linhas, colunas);
        novoEstacionamento[linha][coluna] = "E"; // Atualiza entrada
        setEntrada({ linha, coluna });
        setEstacionamento(novoEstacionamento);
      } else if (action === "ocupar") {
        ocuparVaga();
      } else if (action === "liberar") {
        liberarVaga();
      } else if (action === "caminho") {
        inserirCaminho();
      }
    }
  };

  const handleResizeEstacionamento = () => {
    // Quando o estacionamento é ampliado, inicializamos com o novo tamanho
    const novoEstacionamento = inicializarEstacionamento(linhas, colunas);
    setEstacionamento(novoEstacionamento);
    setEntrada({ linha: 0, coluna: 0 }); // Resetando a entrada para a posição inicial
    setSelectedSpaces([]); // Limpar qualquer seleção
  };

  return (
    <div onMouseUp={handleMouseUp}>
      <h1>Estacionamento</h1>
      
      <div className="controles">
        <label>
          Linhas:
          <input
            type="number"
            value={linhas}
            onChange={(e) => setLinhas(Number(e.target.value))}
            min={1}
          />
        </label>
        <label>
          Colunas:
          <input
            type="number"
            value={colunas}
            onChange={(e) => setColunas(Number(e.target.value))}
            min={1}
          />
        </label>
        <button onClick={handleResizeEstacionamento}>Ampliar Estacionamento</button>
      </div>

      <div className="grid-container">
        {estacionamento.map((linha, i) =>
          linha.map((vaga, j) => (
            <div
              key={`${i}-${j}`}
              className={`grid-item ${vaga === "O" ? "ocupada" : ""} ${selectedSpaces.some(space => space.linha === i && space.coluna === j) ? "selected" : ""}`}
              onMouseDown={() => handleMouseDown(i, j)}
              onMouseEnter={() => handleMouseEnter(i, j)}
            >
              {vaga}
            </div>
          ))
        )}
      </div>

      <div className="controles">
        <h2>Entrada Atual: {`(${entrada.linha}, ${entrada.coluna})`}</h2>
        <button onClick={() => handleAction("setEntrada")}>Definir Entrada</button>
        <button onClick={() => handleAction("ocupar")}>Ocupar Vaga</button>
        <button onClick={() => handleAction("liberar")}>Liberar Vaga</button>
        <button onClick={() => handleAction("caminho")}>Inserir Caminho</button>
      </div>
    </div>
  );
};

export default Estacionamento;
