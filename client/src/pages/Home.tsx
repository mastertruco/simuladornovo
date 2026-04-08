import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Settings } from "lucide-react";
import { useLocation } from "wouter";
import SimuladorSimplificado from "@/components/SimuladorSimplificado";

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
            <div className="pt-8 flex gap-4 justify-center">
              <Button
                onClick={() => setLocation("/simulador")}
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <Play size={20} />
                Iniciar Simulação
                <ArrowRight size={20} />
              </Button>
              <Button
                onClick={() => setLocation("/admin")}
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full flex items-center gap-2"
              >
                <Settings size={20} />
                Admin
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

      {/* SEÇÃO SOBRE O GRUPO COM VÍDEO */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-lg">
            <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>Conheça Nossa História</h2>
            <p className="text-red-100 text-lg">Grupo Herval - 65 Anos de Tradição e Inovação</p>
          </div>

          {/* VÍDEO */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/e3MGD4a1FF0"
                title="Grupo Herval"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* SOBRE E COMPROMISSO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-red-600 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>Sobre Nós</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Fundado em 1959 em Dois Irmãos, o Grupo Herval é um conglomerado gaúcho que abrange mais de 25 marcas, abarcando indústria, atacado, varejo, e-commerce, serviços, construção e operações financeiras.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Com presença em todas as regiões do Brasil, somos reconhecidos por nossa tradição e qualidade. Em 2024, completamos 65 anos com a certeza de que todos os nossos clientes fizeram parte desse crescimento.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-700 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>Compromisso</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Juntos, seguimos evoluindo, com foco no aprimoramento constante e no máximo respeito ao meio ambiente, comprometidos em oferecer o nosso melhor tanto para o consumidor quanto para o planeta.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Há 65 anos produzimos desejos, criamos soluções e realizamos sonhos. Nosso compromisso é com a excelência nos mínimos detalhes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO VISÃO, MISSÃO E VALORES */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-4xl font-bold text-slate-900 text-center mb-12"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Nossos Pilares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-l-4 border-red-600 shadow-lg">
              <h3 className="text-xl font-bold text-red-600 mb-3">Visão</h3>
              <p className="text-slate-700 leading-relaxed">
                Reconhecimento nacional e internacional pelo modelo de gestão, crescimento, solidez e diversificação dos negócios com excelência nos processos, produtos e serviços.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border-l-4 border-slate-600 shadow-lg">
              <h3 className="text-xl font-bold text-slate-600 mb-3">Missão</h3>
              <p className="text-slate-700 leading-relaxed">
                Em harmonia com a comunidade e o meio ambiente, buscamos excelência nos mínimos detalhes em produtos e serviços para atender às necessidades dos clientes e superar expectativas.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border-l-4 border-slate-600 shadow-lg">
              <h3 className="text-xl font-bold text-slate-600 mb-3">Valores</h3>
              <ul className="text-slate-700 space-y-2">
                <li>• <strong>Clientes:</strong> Superar expectativas</li>
                <li>• <strong>Colaboradores:</strong> Respeito e cooperação</li>
                <li>• <strong>Comunidade:</strong> Harmonia e preservação</li>
                <li>• <strong>Crescimento:</strong> Evolução contínua</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE MARCAS */}
      <section className="py-20 px-4 bg-white">
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
