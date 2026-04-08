import { useState } from "react";
import { ChevronLeft, Download, Share2, TrendingUp, Home as HomeIcon, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

interface ApresentacaoProps {
  formData: {
    nome: string;
    tipoDeBeM: string;
    valorCredito: number;
    prazo: number;
    nParcelasPagas: number;
    pais: string;
  };
  results: SimulationResults;
  onBack: () => void;
}

export default function ApresentacaoAlavancagem({
  formData,
  results,
  onBack,
}: ApresentacaoProps) {
  const [activeTab, setActiveTab] = useState<"alavancagem" | "aquisicao" | "investimento">("alavancagem");

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getTipoLabel = (tipo: string) => {
    return tipo === "IMÓVEL" ? "Imóvel" : tipo === "VEÍCULO" ? "Veículo" : "Investimento";
  };

  // Calcular percentuais de alavancagem
  const percentualAlavancagem = ((results.creditoContemplado - formData.valorCredito) / formData.valorCredito) * 100;
  const percentualLocacao = (results.locacaoAnual / formData.valorCredito) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={24} className="text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "Playfair Display, serif" }}>
                Proposta de Alavancagem
              </h1>
              <p className="text-sm text-slate-600">{formData.nome} • {formData.pais}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 size={16} />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download size={16} />
              Baixar
            </Button>
          </div>
        </div>

        {/* ABAS */}
        <div className="max-w-7xl mx-auto px-4 flex gap-1 border-t border-slate-200">
          {[
            { id: "alavancagem", label: "Alavancagem Financeira", icon: TrendingUp },
            { id: "aquisicao", label: "Aquisição de Bens", icon: HomeIcon },
            { id: "investimento", label: "Investimento Aplicado", icon: DollarSign },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`px-4 py-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
                activeTab === id
                  ? "border-red-600 text-red-600 bg-red-50"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "alavancagem" && (
          <div className="space-y-8">
            {/* HERO SECTION */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-red-100 text-sm font-semibold mb-2">CRÉDITO INICIAL</p>
                  <p className="text-4xl font-bold">{formatCurrency(formData.valorCredito)}</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp size={48} className="mx-auto mb-2 opacity-80" />
                    <p className="text-sm font-semibold">ALAVANCAGEM</p>
                  </div>
                </div>
                <div>
                  <p className="text-red-100 text-sm font-semibold mb-2">CRÉDITO CONTEMPLADO</p>
                  <p className="text-4xl font-bold">{formatCurrency(results.creditoContemplado)}</p>
                  <p className="text-red-100 text-sm mt-2">+{percentualAlavancagem.toFixed(1)}%</p>
                </div>
              </div>
            </div>

            {/* GRID DE DADOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CARD 1 - RESUMO */}
              <Card className="p-6 border-l-4 border-red-600">
                <h3 className="text-lg font-bold text-slate-900 mb-6">RESUMO DA SIMULAÇÃO</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="text-slate-600">Tipo de Bem</span>
                    <span className="font-semibold text-slate-900">{getTipoLabel(formData.tipoDeBeM)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="text-slate-600">Prazo (meses)</span>
                    <span className="font-semibold text-slate-900">{formData.prazo}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="text-slate-600">Parcelas Pagas</span>
                    <span className="font-semibold text-slate-900">{formData.nParcelasPagas}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Meia Parcela</span>
                    <span className="font-semibold text-red-600 text-lg">{formatCurrency(results.meiaParcela)}</span>
                  </div>
                </div>
              </Card>

              {/* CARD 2 - ALAVANCAGEM */}
              <Card className="p-6 border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-white">
                <h3 className="text-lg font-bold text-slate-900 mb-6">POTENCIAL DE ALAVANCAGEM</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-slate-600 mb-1">Ganho de Crédito</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {formatCurrency(results.creditoContemplado - formData.valorCredito)}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      {percentualAlavancagem.toFixed(1)}% de aumento
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-slate-600 mb-1">Saldo Devedor Atualizado</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatCurrency(results.saldoDevedorAtualizado)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* GRID INFERIOR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* LOCAÇÃO */}
              <Card className="p-6 border-l-4 border-green-600">
                <h3 className="text-sm font-bold text-slate-600 mb-4 uppercase">Renda Mensal (Locação)</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">{formatCurrency(results.locacaoMensal)}</p>
                <p className="text-xs text-slate-600 mb-4">
                  {percentualLocacao.toFixed(2)}% ao ano
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-600">Renda Anual</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(results.locacaoAnual)}</p>
                </div>
              </Card>

              {/* INVESTIMENTO */}
              <Card className="p-6 border-l-4 border-purple-600">
                <h3 className="text-sm font-bold text-slate-600 mb-4 uppercase">Rentabilidade (Aplicação)</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">{formatCurrency(results.rentabilidadeMensal)}</p>
                <p className="text-xs text-slate-600 mb-4">Mensal</p>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-600">Anual</p>
                  <p className="text-xl font-bold text-purple-600">{formatCurrency(results.aplicacaoAnual)}</p>
                </div>
              </Card>

              {/* VENDA DE COTA */}
              <Card className="p-6 border-l-4 border-amber-600">
                <h3 className="text-sm font-bold text-slate-600 mb-4 uppercase">Venda de Cota</h3>
                <p className="text-3xl font-bold text-amber-600 mb-2">{formatCurrency(results.vendaCota)}</p>
                <p className="text-xs text-slate-600 mb-4">Valor da cota</p>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-600">Lucro Potencial</p>
                  <p className="text-xl font-bold text-amber-600">{formatCurrency(results.lucro)}</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "aquisicao" && (
          <div className="space-y-8">
            <Card className="p-8 border-l-4 border-red-600">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">CENÁRIO: AQUISIÇÃO DE BENS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <p className="text-sm text-slate-600 font-semibold mb-2">Crédito Contemplado</p>
                    <p className="text-3xl font-bold text-slate-900">{formatCurrency(results.creditoContemplado)}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <p className="text-sm text-slate-600 font-semibold mb-2">Saldo Devedor Atualizado</p>
                    <p className="text-3xl font-bold text-slate-900">{formatCurrency(results.saldoDevedorAtualizado)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <p className="text-sm text-slate-600 font-semibold mb-2">Parcela Pós Contemplação</p>
                    <p className="text-3xl font-bold text-red-600">{formatCurrency(results.parcelaPosContemplacao)}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <p className="text-sm text-slate-600 font-semibold mb-2">Locação Mensal</p>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(results.locacaoMensal)}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "investimento" && (
          <div className="space-y-8">
            <Card className="p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">CENÁRIO: CRÉDITO CONTEMPLADO APLICADO</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-600 font-semibold mb-2">Rentabilidade Mensal</p>
                  <p className="text-4xl font-bold text-blue-600 mb-4">{formatCurrency(results.rentabilidadeMensal)}</p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-xs text-slate-600">Aplicação Anual</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.aplicacaoAnual)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <p className="text-sm text-slate-600 font-semibold mb-2">Crédito Disponível</p>
                    <p className="text-3xl font-bold text-slate-900">{formatCurrency(results.creditoContemplado)}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <p className="text-sm text-slate-600 font-semibold mb-2">Potencial Anual</p>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(results.aplicacaoAnual)}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
