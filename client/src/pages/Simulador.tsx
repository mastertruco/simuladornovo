import { useState, useEffect } from "react";
import { Home as HomeIcon, Car, TrendingUp, Phone, User, Globe, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ApresentacaoAlavancagem from "@/components/ApresentacaoAlavancagem";

/**
 * Simulador de Consórcio - Página Pública (sem login)
 * Design Premium inspirado em fintech elegante
 * Tipografia: Playfair Display (títulos), Montserrat (body)
 */

const prazoFaixasImovel = [
  { minCredito: 100000, maxCredito: 180000, prazo: 180 },
  { minCredito: 200000, maxCredito: 750000, prazo: 200 },
  { minCredito: 500000, maxCredito: 1400000, prazo: 220 },
  { minCredito: 1500000, maxCredito: 2000000, prazo: 240 },
];

const prazoFaixasVeiculo = [
  { minCredito: 34000, maxCredito: 90000, prazo: 100 },
  { minCredito: 100000, maxCredito: 300000, prazo: 120 },
  { minCredito: 400000, maxCredito: 800000, prazo: 140 },
];

const getPrazoByCredito = (credito: number, tipoDeBeM: string): number => {
  const faixas = tipoDeBeM === "VEÍCULO" ? prazoFaixasVeiculo : prazoFaixasImovel;
  const faixa = faixas.find((f) => credito >= f.minCredito && credito <= f.maxCredito);
  return faixa?.prazo || (tipoDeBeM === "VEÍCULO" ? 36 : 180);
};

const getTaxaByTipo = (tipoDeBeM: string): number => {
  return tipoDeBeM === "VEÍCULO" ? 16 : 23;
};

interface SimulationResults {
  creditoContemplado: number;
  taxasValor: number;
  saldoDevedorAtualizado: number;
  parcelaPosContemplacao: number;
  locacaoMensal: number;
  locacaoAnual: number;
  rentabilidadeMensal: number;
  aplicacaoAnual: number;
  vendaCota: number;
  lucro: number;
  parcelaInteira: number;
  meiaParcela: number;
  parcelasPagasAcumuladas: number;
}

const codigosPaises = [
  { codigo: "+55", pais: "Brasil", bandeira: "🇧🇷" },
  { codigo: "+1", pais: "EUA/Canadá", bandeira: "🇺🇸" },
  { codigo: "+44", pais: "Reino Unido", bandeira: "🇬🇧" },
  { codigo: "+351", pais: "Portugal", bandeira: "🇵🇹" },
  { codigo: "+34", pais: "Espanha", bandeira: "🇪🇸" },
  { codigo: "+33", pais: "França", bandeira: "🇫🇷" },
  { codigo: "+49", pais: "Alemanha", bandeira: "🇩🇪" },
  { codigo: "+39", pais: "Itália", bandeira: "🇮🇹" },
  { codigo: "+41", pais: "Suíça", bandeira: "🇨🇭" },
  { codigo: "+81", pais: "Japão", bandeira: "🇯🇵" },
  { codigo: "+61", pais: "Austrália", bandeira: "🇦🇺" },
  { codigo: "+971", pais: "Emirados Árabes", bandeira: "🇦🇪" },
  { codigo: "+972", pais: "Israel", bandeira: "🇮🇱" },
  { codigo: "+595", pais: "Paraguai", bandeira: "🇵🇾" },
  { codigo: "+598", pais: "Uruguai", bandeira: "🇺🇾" },
  { codigo: "+54", pais: "Argentina", bandeira: "🇦🇷" },
  { codigo: "+56", pais: "Chile", bandeira: "🇨🇱" },
  { codigo: "+57", pais: "Colômbia", bandeira: "🇨🇴" },
  { codigo: "+52", pais: "México", bandeira: "🇲🇽" },
];

export default function Simulador() {
  const [formData, setFormData] = useState({
    nome: "",
    tipoDeBeM: "IMÓVEL",
    valorCredito: 500000,
    prazo: 220,
    nParcelasPagas: 0,
    inccInpc: 5,
    vendaA: 20,
    locacaoA: 0.5,
    aplicacaoMensal: 0.8,
    taxasEFundo: 23,
    telefone: "",
    pais: "",
    codigoPais: "+55",
    modalidadeLance: "Sorteio",
    tipoParcela: "Meia",
    parcelasEmDia: "SIM",
  });

  const [results, setResults] = useState<SimulationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState<"credito" | "meia">("credito");
  const [leadSent, setLeadSent] = useState(false);
  const [errors, setErrors] = useState<{ nome?: string; telefone?: string }>({});
  const [showApresentacao, setShowApresentacao] = useState(false);

  // Atualizar prazo automaticamente quando valor do crédito ou tipo de bem mudar
  useEffect(() => {
    const novoPrazo = getPrazoByCredito(formData.valorCredito, formData.tipoDeBeM);
    setFormData(prev => ({
      ...prev,
      prazo: novoPrazo
    }));
  }, [formData.valorCredito, formData.tipoDeBeM]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const validateForm = (): boolean => {
    const newErrors: { nome?: string; telefone?: string } = {};
    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }
    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone WhatsApp é obrigatório";
    } else if (formData.telefone.replace(/\D/g, "").length < 8) {
      newErrors.telefone = "Telefone inválido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendLeadToCRM = async (simulationResults: SimulationResults) => {
    try {
      const fullPhone = `${formData.codigoPais}${formData.telefone}`;
      const tipoLabel = formData.tipoDeBeM === "IMÓVEL" ? "Imóvel" : formData.tipoDeBeM === "VEÍCULO" ? "Veículo" : "Investimento";
      const notesText = `Simulação: ${tipoLabel} | Crédito: ${formatCurrency(formData.valorCredito)} | Parcelas Pagas: ${formData.nParcelasPagas} | Crédito Contemplado: ${formatCurrency(simulationResults.creditoContemplado)} | Meia Parcela: ${formatCurrency(simulationResults.meiaParcela)} | Parcela Inteira: ${formatCurrency(simulationResults.parcelaInteira)} | País: ${formData.pais || "Não informado"}`;

      const response = await fetch("/api/public/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "conecta_simulador_2026",
        },
        body: JSON.stringify({
          name: formData.nome,
          phone: fullPhone,
          origin: "SIMULADOR",
          type: formData.tipoDeBeM === "VEÍCULO" ? "veiculo" : "imovel",
          value: Math.round(formData.valorCredito),
          notes: notesText,
          tipoSimulacao: tipoLabel,
          valorBem: Math.round(formData.valorCredito),
          parcelaIntegral: Math.round(simulationResults.parcelaInteira),
          meiaParcela: Math.round(simulationResults.meiaParcela),
          cidade: formData.pais || null,
        }),
      });

      if (response.ok) {
        setLeadSent(true);
      }
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
    }
  };

  const calculateSimulation = () => {
    if (!validateForm()) {
      toast.error("Preencha os campos obrigatórios para simular");
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      const inccDecimal = formData.inccInpc / 100;
      const taxasDinamicas = getTaxaByTipo(formData.tipoDeBeM);
      const taxasDecimal = taxasDinamicas / 100;
      const taxasValor = formData.valorCredito * taxasDecimal;
      const totalComTaxas = formData.valorCredito + taxasValor;
      const parcelaInteira = totalComTaxas / formData.prazo;
      const meiaParcela = parcelaInteira / 2;

      let creditoAcumulado = formData.valorCredito;
      let parcelasPagasAcumuladas = 0;
      let mesesProcessados = 0;

      while (mesesProcessados < formData.nParcelasPagas) {
        const anosCompletos_atual = Math.floor(mesesProcessados / 12);
        const mesesAteProximo12 = Math.min(12 - (mesesProcessados % 12), formData.nParcelasPagas - mesesProcessados);
        const reajuste = Math.pow(1 + inccDecimal, anosCompletos_atual);

        creditoAcumulado = formData.valorCredito * reajuste;
        parcelasPagasAcumuladas += meiaParcela * mesesAteProximo12 * reajuste;

        mesesProcessados += mesesAteProximo12;
      }

      const creditoContemplado = creditoAcumulado;
      const saldoDevedorComTaxas = creditoContemplado * (1 + taxasDecimal);
      const parcelasPagasComTaxas = parcelasPagasAcumuladas * (1 + taxasDecimal);
      const saldoDevedorAtualizado = saldoDevedorComTaxas - parcelasPagasComTaxas;
      const mesesRestantes = formData.prazo - formData.nParcelasPagas;
      const parcelaPosContemplacao = saldoDevedorAtualizado / mesesRestantes;

      const locacaoDecimal = formData.locacaoA / 100;
      const locacaoMensal = creditoContemplado * locacaoDecimal;
      const locacaoAnual = locacaoMensal * 12;

      const aplicacaoDecimal = formData.aplicacaoMensal / 100;
      const rentabilidadeMensal = creditoContemplado * aplicacaoDecimal;
      const aplicacaoAnual = rentabilidadeMensal * 12;

      const vendaDecimal = formData.vendaA / 100;
      const vendaCota = creditoContemplado * vendaDecimal;
      const lucro = vendaCota - parcelasPagasAcumuladas;

      const simulationResults: SimulationResults = {
        creditoContemplado,
        taxasValor,
        saldoDevedorAtualizado,
        parcelaPosContemplacao,
        locacaoMensal,
        locacaoAnual,
        rentabilidadeMensal,
        aplicacaoAnual,
        vendaCota,
        lucro,
        parcelaInteira,
        meiaParcela,
        parcelasPagasAcumuladas,
      };

      setResults(simulationResults);
      setIsCalculating(false);

      // Enviar lead automaticamente ao CRM
      sendLeadToCRM(simulationResults);
    }, 500);
  };

  const handleTipoDeBeM = (novoTipo: string) => {
    const novoPrazo = getPrazoByCredito(formData.valorCredito, novoTipo);
    const novasTaxas = getTaxaByTipo(novoTipo);
    setFormData({
      ...formData,
      tipoDeBeM: novoTipo,
      prazo: novoPrazo,
      taxasEFundo: novasTaxas,
    });
  };

  const handleValorCredito = (novoCredito: number) => {
    const novoPrazo = getPrazoByCredito(novoCredito, formData.tipoDeBeM);
    const novasTaxas = getTaxaByTipo(formData.tipoDeBeM);
    setFormData({
      ...formData,
      valorCredito: novoCredito,
      prazo: novoPrazo,
      taxasEFundo: novasTaxas,
    });
  };

  if (showApresentacao && results) {
    return (
      <ApresentacaoAlavancagem
        formData={formData}
        results={results}
        onBack={() => setShowApresentacao(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PAINEL LATERAL - FORMULÁRIO */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h1
                className="text-4xl font-bold text-slate-900 mb-1"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Qual será sua próxima conquista?
              </h1>
              <h2 className="text-2xl font-bold text-red-600 mb-6">Simule Agora!</h2>
              <div className="w-16 h-1 bg-red-600 rounded mb-8"></div>

              {/* SEUS DADOS */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-600 mb-4 uppercase tracking-wide flex items-center gap-2">
                  <User size={14} />
                  Seus Dados
                </h3>
                <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">
                      Nome <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => {
                        setFormData({ ...formData, nome: e.target.value });
                        if (errors.nome) setErrors({ ...errors, nome: undefined });
                      }}
                      className={`bg-white border-slate-300 text-slate-900 mt-2 ${errors.nome ? "border-red-500 ring-1 ring-red-500" : ""}`}
                      placeholder="Seu nome completo"
                    />
                    {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Phone size={12} />
                      Telefone WhatsApp <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2 mt-2">
                      <select
                        value={formData.codigoPais}
                        onChange={(e) => setFormData({ ...formData, codigoPais: e.target.value })}
                        className="bg-white border border-slate-300 rounded-lg px-2 py-2 text-sm min-w-[110px]"
                      >
                        {codigosPaises.map(({ codigo, pais, bandeira }) => (
                          <option key={codigo} value={codigo}>
                            {bandeira} {codigo}
                          </option>
                        ))}
                      </select>
                      <Input
                        type="tel"
                        value={formData.telefone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setFormData({ ...formData, telefone: value });
                          if (errors.telefone) setErrors({ ...errors, telefone: undefined });
                        }}
                        className={`flex-1 bg-white border-slate-300 text-slate-900 ${errors.telefone ? "border-red-500 ring-1 ring-red-500" : ""}`}
                        placeholder="11999999999"
                      />
                    </div>
                    {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Globe size={12} />
                      País
                    </Label>
                    <Input
                      type="text"
                      value={formData.pais}
                      onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                      className="bg-white border-slate-300 text-slate-900 mt-2"
                      placeholder="Brasil"
                    />
                  </div>
                </div>
              </div>

              {/* TIPO DE BEM */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-600 mb-4 uppercase tracking-wide">
                  Escolha qual opção ideal para você:
                </h3>
                <div className="flex gap-4 mb-6">
                  {[
                    { value: "IMÓVEL", label: "Imóveis", icon: HomeIcon },
                    { value: "VEÍCULO", label: "Veículos", icon: Car },
                    { value: "INVESTIMENTO", label: "Investimentos", icon: TrendingUp },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => handleTipoDeBeM(value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                        formData.tipoDeBeM === value
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Icon size={24} />
                      <span className="text-xs font-semibold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ABAS CRÉDITO / MEIA PARCELA */}
              <div className="mb-8">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setActiveTab("credito")}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                      activeTab === "credito"
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Crédito
                  </button>
                  <button
                    onClick={() => setActiveTab("meia")}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all border-2 ${
                      activeTab === "meia"
                        ? "border-red-600 text-red-600 bg-white"
                        : "border-slate-200 text-slate-600 bg-slate-50"
                    }`}
                  >
                    Meia Parcela
                  </button>
                </div>
              </div>

              {/* PARÂMETROS */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-600 mb-4 uppercase tracking-wide">
                  Parâmetros
                </h3>
                <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
                  {activeTab === "credito" ? (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-xs font-semibold text-slate-700">
                          Valor do crédito
                        </Label>
                        <span className="text-2xl font-bold text-red-600">
                          {formatCurrency(formData.valorCredito)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={formData.tipoDeBeM === "VEÍCULO" ? 45000 : 100000}
                        max="2000000"
                        step="10000"
                        value={formData.valorCredito}
                        onChange={(e) => handleValorCredito(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                      />
                      <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>{formatCurrency(formData.tipoDeBeM === "VEÍCULO" ? 45000 : 100000)}</span>
                        <span>R$ 2.000.000,00</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-xs font-semibold text-slate-700">
                          Meia Parcela
                        </Label>
                        <span className="text-2xl font-bold text-red-600">
                          {formatCurrency((formData.valorCredito * (1 + getTaxaByTipo(formData.tipoDeBeM) / 100)) / formData.prazo / 2)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={formData.tipoDeBeM === "VEÍCULO" ? 45000 : 100000}
                        max="2000000"
                        step="10000"
                        value={formData.valorCredito}
                        onChange={(e) => handleValorCredito(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                      />
                      <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>{formatCurrency(formData.tipoDeBeM === "VEÍCULO" ? 45000 : 100000)}</span>
                        <span>R$ 2.000.000,00</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Prazo (meses)</Label>
                    <Input
                      type="number"
                      value={formData.prazo}
                      disabled
                      className="bg-slate-100 border-slate-300 text-slate-900 mt-2 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Parcelas Pagas</Label>
                    <Input
                      type="number"
                      value={formData.nParcelasPagas}
                      onChange={(e) =>
                        setFormData({ ...formData, nParcelasPagas: parseInt(e.target.value) || 0 })
                      }
                      className="bg-white border-slate-300 text-slate-900 mt-2"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-slate-700">INCC/INPC (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.inccInpc}
                      onChange={(e) =>
                        setFormData({ ...formData, inccInpc: parseFloat(e.target.value) || 0 })
                      }
                      className="bg-white border-slate-300 text-slate-900 mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Venda A (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.vendaA}
                      onChange={(e) =>
                        setFormData({ ...formData, vendaA: parseFloat(e.target.value) || 0 })
                      }
                      className="bg-white border-slate-300 text-slate-900 mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Locação A (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.locacaoA}
                      onChange={(e) =>
                        setFormData({ ...formData, locacaoA: parseFloat(e.target.value) || 0 })
                      }
                      className="bg-white border-slate-300 text-slate-900 mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Aplicação Mensal (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.aplicacaoMensal}
                      onChange={(e) =>
                        setFormData({ ...formData, aplicacaoMensal: parseFloat(e.target.value) || 0 })
                      }
                      className="bg-white border-slate-300 text-slate-900 mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Taxas e Fundo (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.taxasEFundo}
                      disabled
                      className="bg-slate-100 border-slate-300 text-slate-900 mt-2 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={calculateSimulation}
                disabled={isCalculating}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all text-lg"
              >
                {isCalculating ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    Calculando...
                  </span>
                ) : (
                  "SIMULAR"
                )}
              </Button>
            </div>
          </div>

          {/* PAINEL DIREITO - RESULTADOS */}
          <div className="lg:col-span-2">
            {!results ? (
              <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                    <TrendingUp size={40} className="text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700" style={{ fontFamily: "Playfair Display, serif" }}>
                    Preencha seus dados e clique em "SIMULAR"
                  </h3>
                  <p className="text-slate-500 max-w-md">
                    Descubra o potencial do seu consórcio. Preencha seu nome e WhatsApp, ajuste os parâmetros e veja os resultados instantaneamente.
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-8 max-w-4xl">
                {/* BOTAO DE APRESENTACAO */}
                <div className="flex gap-3 mb-6">
                  <Button
                    onClick={() => setShowApresentacao(true)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all text-lg"
                  >
                    <TrendingUp className="mr-2" size={20} />
                    Ver Alavancagem Financeira
                  </Button>
                </div>

                {/* Lead enviado com sucesso */}
                {leadSent && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle className="text-green-600 shrink-0" size={24} />
                    <div>
                      <p className="text-green-800 font-semibold text-sm">Simulação registrada!</p>
                      <p className="text-green-600 text-xs">Em breve um consultor entrará em contato pelo seu WhatsApp.</p>
                    </div>
                  </div>
                )}

                <div>
                  <h2
                    className="text-4xl font-bold text-slate-900 mb-2"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Proposta Comercial
                  </h2>
                  <p className="text-slate-600">
                    Simulação para {formData.nome || "Cliente"} - {formData.pais || "País não informado"}
                  </p>
                </div>

                {/* RESUMO */}
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">RESUMO DO CONSÓRCIO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="border-l-4 border-blue-600 pl-4">
                        <p className="text-sm text-slate-600 font-medium">Tipo de Consórcio</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">
                          {formData.tipoDeBeM === "IMÓVEL" ? "Imóvel" : formData.tipoDeBeM === "VEÍCULO" ? "Veículo" : "Investimento"}
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-600 pl-4">
                        <p className="text-sm text-slate-600 font-medium">Valor do Crédito Contratado</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">
                          {formatCurrency(formData.valorCredito)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="border-l-4 border-blue-600 pl-4">
                        <p className="text-sm text-slate-600 font-medium">Meia Parcela (até contemplação)</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">
                          {formatCurrency(results.meiaParcela)}
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-600 pl-4">
                        <p className="text-sm text-slate-600 font-medium">Parcela Inteira (até contemplação)</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">
                          {formatCurrency(results.parcelaInteira)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* CENÁRIO 1 - AQUISIÇÃO DE BENS */}
                <Card className="border-l-4 border-red-600 p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">AQUISIÇÃO DE BENS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Crédito Contemplado</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatCurrency(results.creditoContemplado)}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Saldo Devedor Atualizado</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatCurrency(results.saldoDevedorAtualizado)}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Parcela Pós Contemplação</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatCurrency(results.parcelaPosContemplacao)}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Locação Mensal</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatCurrency(results.locacaoMensal)}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Locação Anual</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatCurrency(results.locacaoAnual)}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* CENÁRIO 2 - CRÉDITO CONTEMPLADO APLICADO */}
                <Card className="border-l-4 border-blue-600 p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">CRÉDITO CONTEMPLADO APLICADO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Rentabilidade Mensal</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatCurrency(results.rentabilidadeMensal)}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Aplicação Anual</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatCurrency(results.aplicacaoAnual)}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* CENÁRIO 3 - VENDA DE COTA CONTEMPLADA */}
                <Card className="border-l-4 border-green-600 p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">VENDA DE COTA CONTEMPLADA</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Total de Parcelas Pagas até Agora</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatCurrency(results.parcelasPagasAcumuladas)}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Venda da Cota</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatCurrency(results.vendaCota)}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg md:col-span-2">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Lucro</p>
                      <p className="text-3xl font-bold text-green-600">
                        {formatCurrency(results.lucro)}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
