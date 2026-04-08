import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSimuladorParams } from "@/contexts/SimuladorContext";
import { useLocation } from "wouter";
import { ChevronLeft, Save, RotateCcw } from "lucide-react";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { params, updateParams, resetParams } = useSimuladorParams();
  const [formData, setFormData] = useState(params);
  const [salvo, setSalvo] = useState(false);

  const handleChange = (field: keyof typeof params, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSalvo(false);
  };

  const handleSave = () => {
    updateParams(formData);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Tem certeza que deseja resetar todos os parâmetros para os valores padrão?")) {
      resetParams();
      setFormData(params);
      setSalvo(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setLocation("/")}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-slate-900" style={{ fontFamily: "Playfair Display, serif" }}>
              Painel Administrativo
            </h1>
            <p className="text-slate-600">Configure os parâmetros do simulador</p>
          </div>
        </div>

        {/* MENSAGEM DE SUCESSO */}
        {salvo && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✓ Parâmetros salvos com sucesso!
          </div>
        )}

        {/* CARDS DE PARÂMETROS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* INCC */}
          <Card className="p-6 border-0 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  INCC - Índice Nacional de Custo da Construção (%)
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.inccPercentual}
                    onChange={(e) => handleChange("inccPercentual", parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-red-600 min-w-fit">{formData.inccPercentual}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Reajuste anual aplicado ao crédito contemplado
              </p>
            </div>
          </Card>

          {/* TAXA IMOBILIÁRIO */}
          <Card className="p-6 border-0 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Taxa - Imóvel (%)
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.taxaImobiliario}
                    onChange={(e) => handleChange("taxaImobiliario", parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-red-600 min-w-fit">{formData.taxaImobiliario}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Taxa aplicada ao crédito para simulações de imóvel
              </p>
            </div>
          </Card>

          {/* TAXA VEÍCULO */}
          <Card className="p-6 border-0 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Taxa - Veículo (%)
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.taxaVeiculo}
                    onChange={(e) => handleChange("taxaVeiculo", parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-red-600 min-w-fit">{formData.taxaVeiculo}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Taxa aplicada ao crédito para simulações de veículo
              </p>
            </div>
          </Card>

          {/* TAXA INVESTIMENTO */}
          <Card className="p-6 border-0 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Taxa - Investimento (%)
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.taxaInvestimento}
                    onChange={(e) => handleChange("taxaInvestimento", parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-red-600 min-w-fit">{formData.taxaInvestimento}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Taxa aplicada ao crédito para simulações de investimento
              </p>
            </div>
          </Card>

          {/* VENDA PERCENTUAL */}
          <Card className="p-6 border-0 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Venda de Cota (%)
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.vendaPercentual}
                    onChange={(e) => handleChange("vendaPercentual", parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-red-600 min-w-fit">{formData.vendaPercentual}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Percentual de ganho na venda de cota contemplada
              </p>
            </div>
          </Card>

          {/* RENTABILIDADE ANUAL */}
          <Card className="p-6 border-0 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Rentabilidade Anual (%)
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.rentabilidadeAnual}
                    onChange={(e) => handleChange("rentabilidadeAnual", parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-red-600 min-w-fit">{formData.rentabilidadeAnual}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Rentabilidade esperada para aplicações de crédito
              </p>
            </div>
          </Card>
        </div>

        {/* BOTÕES DE AÇÃO */}
        <div className="flex gap-4 justify-end">
          <Button
            onClick={handleReset}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw size={16} />
            Resetar Padrões
          </Button>
          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white gap-2 px-8 py-6 text-lg font-semibold"
          >
            <Save size={16} />
            Salvar Parâmetros
          </Button>
        </div>

        {/* INFORMAÇÕES */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">ℹ️ Informações Importantes</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Os parâmetros configurados aqui afetam todas as simulações dos clientes</li>
            <li>• As alterações são salvas automaticamente no navegador</li>
            <li>• O simulador simplificado usa estes parâmetros para calcular as parcelas</li>
            <li>• A apresentação completa mostra detalhes de alavancagem baseado nestes dados</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
