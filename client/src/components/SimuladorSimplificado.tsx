import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSimuladorParams } from "@/contexts/SimuladorContext";
import { useLocation } from "wouter";

interface ResultadoSimulacao {
  creditoInicial: number;
  prazoMeses: number;
  parcelaMeia: number;
  parcelaInteira: number;
}

export default function SimuladorSimplificado() {
  const [, setLocation] = useLocation();
  const { params } = useSimuladorParams();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pais, setPais] = useState("Brasil");
  const [tipoDeBeM, setTipoDeBeM] = useState("IMÓVEL");
  const [creditoInicial, setCreditoInicial] = useState(500000);
  const [resultado, setResultado] = useState<ResultadoSimulacao | null>(null);
  const [mostrandoResultado, setMostrandoResultado] = useState(false);

  const getPrazoByCredito = (credito: number, tipo: string): number => {
    const faixas = {
      IMÓVEL: [
        { min: 1500000, max: 2000000, prazo: 240 },
        { min: 500000, max: 1400000, prazo: 220 },
        { min: 200000, max: 750000, prazo: 200 },
        { min: 100000, max: 180000, prazo: 180 },
      ],
      VEÍCULO: [
        { min: 400000, max: 800000, prazo: 140 },
        { min: 100000, max: 300000, prazo: 120 },
        { min: 34000, max: 90000, prazo: 100 },
      ],
      INVESTIMENTO: [
        { min: 100000, max: 500000, prazo: 180 },
        { min: 50000, max: 100000, prazo: 120 },
        { min: 10000, max: 50000, prazo: 100 },
      ],
    };

    const faixasDoTipo = faixas[tipo as keyof typeof faixas] || faixas.IMÓVEL;
    const faixa = faixasDoTipo.find((f) => credito >= f.min && credito <= f.max);
    return faixa?.prazo || 180;
  };

  const calcularSimulacao = async () => {
    if (!nome.trim() || !telefone.trim()) {
      alert("Por favor, preencha nome e telefone");
      return;
    }

    const prazo = getPrazoByCredito(creditoInicial, tipoDeBeM);
    
    // Selecionar taxa baseada no tipo de bem (valores fixos)
    let taxaAplicavel = 23; // Imóvel
    if (tipoDeBeM === "VEÍCULO") taxaAplicavel = 16; // Veículo
    if (tipoDeBeM === "INVESTIMENTO") taxaAplicavel = 20; // Investimento

    // Fórmula simplificada: (Crédito × (1 + Taxa%)) / Prazo
    const creditoComTaxas = creditoInicial * (1 + taxaAplicavel / 100);
    const parcelaInteira = creditoComTaxas / prazo;
    const parcelaMeia = parcelaInteira / 2;

    const novoResultado = {
      creditoInicial,
      prazoMeses: prazo,
      parcelaMeia: Math.round(parcelaMeia * 100) / 100,
      parcelaInteira: Math.round(parcelaInteira * 100) / 100,
    };

    setResultado(novoResultado);
    
    // Salvar lead automaticamente (sem avisar)
    try {
      const leadData = {
        nome,
        telefone,
        pais,
        tipoDeBeM,
        creditoInicial,
        prazoMeses: prazo,
        parcelaMeia: novoResultado.parcelaMeia,
        parcelaInteira: novoResultado.parcelaInteira,
        dataSimulacao: new Date().toISOString(),
      };

      await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
    }

    setMostrandoResultado(true);
  };

  const enviarLead = async () => {
    try {
      const leadData = {
        nome,
        telefone,
        pais,
        tipoDeBeM,
        creditoInicial,
        prazoMeses: resultado?.prazoMeses || 0,
        parcelaMeia: resultado?.parcelaMeia || 0,
        parcelaInteira: resultado?.parcelaInteira || 0,
        dataSimulacao: new Date().toISOString(),
      };

      // Enviar para a API do Manus
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        console.error("Erro ao enviar lead");
      }
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
    }
  };

  const irParaPresentacao = async () => {
    // Enviar dados do lead
    await enviarLead();

    // Armazenar dados da simulação para usar na apresentação
    const dadosSimulacao = {
      nome,
      telefone,
      pais,
      tipoDeBeM,
      valorCredito: creditoInicial,
      prazo: resultado?.prazoMeses || 0,
      nParcelasPagas: 0,
    };
    localStorage.setItem("simulacao_dados", JSON.stringify(dadosSimulacao));
    setLocation("/simulador");
  };

  if (mostrandoResultado && resultado) {
    return (
      <div className="space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            Sua Simulação
          </h2>
          <p className="text-red-100">Parabéns, {nome}! Aqui está sua proposta</p>
        </div>

        {/* RESULTADO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card de Crédito e Prazo */}
          <Card className="p-8 border-0 shadow-lg">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">CRÉDITO</p>
                <p className="text-3xl font-bold text-slate-900">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(resultado.creditoInicial)}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">PRAZO TOTAL</p>
                <p className="text-3xl font-bold text-slate-900">{resultado.prazoMeses} meses</p>
              </div>
            </div>
          </Card>

          {/* Card de Parcelas */}
          <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-red-600 font-semibold mb-1">MEIA-PARCELA</p>
                <p className="text-3xl font-bold text-red-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(resultado.parcelaMeia)}
                </p>
              </div>
              <div>
                <p className="text-sm text-red-600 font-semibold mb-1">PARCELA INTEGRAL</p>
                <p className="text-3xl font-bold text-red-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(resultado.parcelaInteira)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* BOTÕES */}
        <div className="flex gap-4">
          <Button
            onClick={() => setMostrandoResultado(false)}
            variant="outline"
            className="flex-1 py-6 text-lg font-semibold"
          >
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-8 border-0 shadow-2xl max-w-md mx-auto">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            Simule seu Consórcio
          </h3>
          <p className="text-slate-600">Preencha os dados abaixo para começar</p>
        </div>

        {/* FORMULÁRIO */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nome</label>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone</label>
            <Input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">País</label>
            <Input
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              placeholder="Brasil"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Bem</label>
            <select
              value={tipoDeBeM}
              onChange={(e) => setTipoDeBeM(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="IMÓVEL">Imóvel</option>
              <option value="VEÍCULO">Veículo</option>
              <option value="INVESTIMENTO">Investimento</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Crédito: R$ {new Intl.NumberFormat("pt-BR").format(creditoInicial)}
            </label>
            <input
              type="range"
              min="10000"
              max="2000000"
              step="10000"
              value={creditoInicial}
              onChange={(e) => setCreditoInicial(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>R$ 10.000</span>
              <span>R$ 2.000.000</span>
            </div>
          </div>
        </div>

        {/* BOTÃO */}
        <Button
          onClick={calcularSimulacao}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold rounded-lg"
        >
          Simular Agora
        </Button>
      </div>
    </Card>
  );
}
