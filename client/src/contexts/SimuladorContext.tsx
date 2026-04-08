import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SimuladorParams {
  inccPercentual: number;
  taxaImobiliario: number;
  taxaVeiculo: number;
  taxaInvestimento: number;
  vendaPercentual: number;
  rentabilidadeAnual: number;
}

const defaultParams: SimuladorParams = {
  inccPercentual: 5,
  taxaImobiliario: 2.3,
  taxaVeiculo: 2.5,
  taxaInvestimento: 2.0,
  vendaPercentual: 20,
  rentabilidadeAnual: 8,
};

interface SimuladorContextType {
  params: SimuladorParams;
  updateParams: (newParams: Partial<SimuladorParams>) => void;
  resetParams: () => void;
}

const SimuladorContext = createContext<SimuladorContextType | undefined>(undefined);

export function SimuladorProvider({ children }: { children: React.ReactNode }) {
  const [params, setParams] = useState<SimuladorParams>(defaultParams);

  // Carregar parâmetros do localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem('simulador_params');
    if (stored) {
      try {
        setParams(JSON.parse(stored));
      } catch (e) {
        console.error('Erro ao carregar parâmetros:', e);
      }
    }
  }, []);

  const updateParams = (newParams: Partial<SimuladorParams>) => {
    const updated = { ...params, ...newParams };
    setParams(updated);
    localStorage.setItem('simulador_params', JSON.stringify(updated));
  };

  const resetParams = () => {
    setParams(defaultParams);
    localStorage.setItem('simulador_params', JSON.stringify(defaultParams));
  };

  return (
    <SimuladorContext.Provider value={{ params, updateParams, resetParams }}>
      {children}
    </SimuladorContext.Provider>
  );
}

export function useSimuladorParams() {
  const context = useContext(SimuladorContext);
  if (!context) {
    throw new Error('useSimuladorParams deve ser usado dentro de SimuladorProvider');
  }
  return context;
}
