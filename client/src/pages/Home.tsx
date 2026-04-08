import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION COM CAPA */}
      <div className="relative h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('https://herval.com.br/wp-content/uploads/2025/01/organograma-2024-10.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="max-w-4xl text-center space-y-8">
            {/* Logo e Título */}
            <div className="space-y-4">
              <h1 
                className="text-6xl md:text-7xl font-bold text-white mb-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Grupo Herval
              </h1>
              <p className="text-2xl md:text-3xl text-red-500 font-semibold">
                65 Anos de História
              </p>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Somos 27 marcas presentes em todas as regiões do Brasil
              </p>
              <p className="text-lg text-white/70">
                Superando expectativas com excelência nos mínimos detalhes
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Button
                onClick={() => setLocation("/simulador")}
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <Play size={20} />
                Iniciar Simulação
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* SEÇÃO SOBRE */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 
                className="text-4xl font-bold text-slate-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Juntos para Crescer
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Fundado em 1959 em Dois Irmãos, o Grupo Herval é um conglomerado gaúcho que abrange mais de 25 marcas, abarcando indústria, atacado, varejo, e-commerce, serviços, construção e operações financeiras.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Com presença em todas as regiões do Brasil, somos reconhecidos por nossa tradição e qualidade. Em 2024, completamos 65 anos com a certeza de que todos os nossos clientes fizeram parte desse crescimento.
              </p>
              <Button
                onClick={() => setLocation("/simulador")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-base font-semibold rounded-lg"
              >
                Começar Simulação
              </Button>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="border-l-4 border-red-600 pl-6">
                  <h3 className="text-xl font-bold text-red-600 mb-2">Visão</h3>
                  <p className="text-slate-700">
                    Reconhecimento nacional e internacional pelo modelo de gestão, crescimento e solidez.
                  </p>
                </div>
                <div className="border-l-4 border-slate-400 pl-6">
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Missão</h3>
                  <p className="text-slate-700">
                    Excelência nos mínimos detalhes em produtos e serviços para superar expectativas.
                  </p>
                </div>
                <div className="border-l-4 border-slate-400 pl-6">
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Valores</h3>
                  <p className="text-slate-700">
                    Clientes, colaboradores, comunidade e crescimento contínuo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE MARCAS */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 
            className="text-4xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            27 Marcas, Uma Visão
          </h2>
          <p className="text-lg text-slate-600 mb-12">
            Conheça o portfólio diversificado do Grupo Herval
          </p>
          
          {/* Organograma Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://herval.com.br/wp-content/uploads/2025/01/organograma-2024-10.png"
              alt="Organograma Grupo Herval"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h2 
            className="text-4xl font-bold"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Pronto para Simular Seu Consórcio?
          </h2>
          <p className="text-xl text-red-100">
            Descubra o potencial de alavancagem financeira com nossos produtos
          </p>
          <Button
            onClick={() => setLocation("/simulador")}
            className="bg-white hover:bg-red-50 text-red-600 px-12 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Iniciar Simulação Agora
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400 mb-4">
            © 2024 Grupo Herval. Todos os direitos reservados.
          </p>
          <p className="text-slate-500 text-sm">
            Rodovia BR 116, Km 223,5 • Dois Irmãos, Rio Grande do Sul - Brasil
          </p>
        </div>
      </footer>
    </div>
  );
}
