import { Upload, Sparkles, Rocket } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/20 pointer-events-none" />
      
      <div className="container-levely relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="headline-lg">Cómo funciona Levely</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tu camino hacia la empleabilidad, paso a paso
          </p>
        </div>

        {/* Vertical Flow with Cards */}
        <div className="relative max-w-4xl mx-auto">
          {/* Curved connecting line - SVG */}
          <svg
            className="absolute left-1/2 top-0 h-full w-32 -translate-x-1/2 hidden lg:block"
            viewBox="0 0 100 800"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M50 0 C50 100, 20 150, 20 200 C20 250, 80 300, 80 350 C80 400, 20 450, 20 500 C20 550, 80 600, 80 650 C80 700, 50 750, 50 800"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="opacity-40"
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(222, 91%, 67%)" />
                <stop offset="50%" stopColor="hsl(192, 27%, 14%)" />
                <stop offset="100%" stopColor="hsl(222, 91%, 67%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Step 1 */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-24">
            <div className="lg:w-1/2 text-center lg:text-right order-2 lg:order-1">
              <span className="inline-block text-sm font-bold text-blue mb-2">Paso 01</span>
              <h3 className="text-2xl font-bold mb-3">Crea tu perfil y sube tu CV</h3>
              <p className="text-muted-foreground">
                Comienza tu viaje subiendo tu currículum actual
              </p>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              {/* Floating Card - CV Upload UI */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue/20 to-transparent rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-2xl shadow-lg border border-border/50 p-6 max-w-sm mx-auto lg:ml-0">
                  {/* Mini CV Upload Interface */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Subir CV</p>
                      <p className="text-xs text-muted-foreground">PDF, DOCX</p>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center bg-secondary/30">
                    <div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-blue" />
                    </div>
                    <p className="text-sm font-medium">Arrastra tu archivo aquí</p>
                    <p className="text-xs text-muted-foreground mt-1">o haz click para seleccionar</p>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <div className="flex-1 h-2 rounded-full bg-blue/20" />
                    <div className="flex-1 h-2 rounded-full bg-border" />
                    <div className="flex-1 h-2 rounded-full bg-border" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-24">
            <div className="lg:w-1/2">
              {/* Floating Card - Recommendations UI */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-bl from-blue/20 to-transparent rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-2xl shadow-lg border border-border/50 p-6 max-w-sm mx-auto lg:mr-0 lg:ml-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Oportunidades para ti</p>
                      <p className="text-xs text-muted-foreground">Basadas en tu perfil</p>
                    </div>
                  </div>
                  
                  {/* Opportunity Cards */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Practicante Marketing</span>
                        <span className="text-[10px] font-bold text-white bg-blue px-2 py-0.5 rounded-full">Perfect Match</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Empresa Tech • Lima</p>
                    </div>
                    
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Beca Santander</span>
                        <span className="text-[10px] font-bold text-accent-foreground bg-accent px-2 py-0.5 rounded-full">Recommended</span>
                      </div>
                      <p className="text-xs text-muted-foreground">100% cubierto • España</p>
                    </div>
                    
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Jr. Data Analyst</span>
                        <span className="text-[10px] font-bold text-lime-foreground bg-lime px-2 py-0.5 rounded-full">High Potential</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Startup FinTech • Remoto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 text-center lg:text-left">
              <span className="inline-block text-sm font-bold text-blue mb-2">Paso 02</span>
              <h3 className="text-2xl font-bold mb-3">Obtén insights y oportunidades con IA</h3>
              <p className="text-muted-foreground">
                Recibe recomendaciones personalizadas de trabajos, prácticas y becas
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-1/2 text-center lg:text-right order-2 lg:order-1">
              <span className="inline-block text-sm font-bold text-blue mb-2">Paso 03</span>
              <h3 className="text-2xl font-bold mb-3">Prepárate y acelera tu carrera</h3>
              <p className="text-muted-foreground">
                Practica entrevistas con IA y recibe feedback de mentores
              </p>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              {/* Floating Card - Interview & Feedback UI */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue/20 to-transparent rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-2xl shadow-lg border border-border/50 p-6 max-w-sm mx-auto lg:ml-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Preparación</p>
                      <p className="text-xs text-muted-foreground">Entrevistas y mentorías</p>
                    </div>
                  </div>
                  
                  {/* Interview Simulator Mini */}
                  <div className="p-4 rounded-xl bg-accent text-accent-foreground mb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-xs">🤖</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium">Simulador IA</p>
                        <div className="flex gap-1 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse delay-100" />
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse delay-200" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs opacity-90">"¿Cuáles son tus fortalezas?"</p>
                  </div>
                  
                  {/* Mentor Feedback Card */}
                  <div className="p-3 rounded-xl bg-secondary/50 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-blue/20 flex items-center justify-center text-xs">👤</div>
                      <span className="text-xs font-medium">Feedback de Mentor</span>
                    </div>
                    <p className="text-xs text-muted-foreground">"Excelente estructura en tu respuesta. Mejora ejemplos concretos."</p>
                    <div className="flex gap-1 mt-2">
                      {[1,2,3,4,5].map(i => (
                        <span key={i} className={`text-xs ${i <= 4 ? 'text-yellow-500' : 'text-border'}`}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
