import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Levely me ayudó a conseguir mi primera práctica en menos de 2 semanas. El análisis de CV fue increíble.",
    name: "María García",
    role: "Practicante de Marketing",
    company: "Startup Tech",
    avatar: "MG",
  },
  {
    quote: "Las recomendaciones de IA son muy precisas. Encontré una beca que ni sabía que existía y la gané.",
    name: "Carlos Rodríguez",
    role: "Estudiante de Ingeniería",
    company: "PUCP",
    avatar: "CR",
  },
  {
    quote: "El simulador de entrevistas me preparó perfectamente. Ahora trabajo en mi empresa soñada.",
    name: "Ana López",
    role: "Analista Jr.",
    company: "FinTech Company",
    avatar: "AL",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-levely">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="headline-lg">Lo que dicen nuestros usuarios</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Miles de jóvenes profesionales ya aceleraron su carrera con Levely
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 lg:p-8">
                {/* Quote */}
                <div className="mb-6">
                  <svg 
                    className="w-8 h-8 text-blue/30 mb-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-card-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
