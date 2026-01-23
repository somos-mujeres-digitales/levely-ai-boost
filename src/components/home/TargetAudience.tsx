import { GraduationCap, Briefcase, Heart } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Estudiantes",
    description: "Prepárate para tu primera experiencia profesional con un perfil optimizado desde el inicio.",
  },
  {
    icon: Briefcase,
    title: "Jóvenes profesionales",
    description: "Da el siguiente paso en tu carrera con herramientas que te ayudan a destacar.",
  },
  {
    icon: Heart,
    title: "Mujeres en tech y negocios",
    description: "Apoyamos tu crecimiento profesional con recursos y oportunidades diseñadas para ti.",
  },
];

export function TargetAudience() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-levely">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="headline-lg">¿Para quién es Levely?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Diseñado para personas que quieren impulsar su carrera profesional
          </p>
        </div>

        {/* Audience cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-blue/10 flex items-center justify-center mb-6 group-hover:bg-blue/20 transition-colors">
                <audience.icon className="w-10 h-10 text-blue" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{audience.title}</h3>
              <p className="text-muted-foreground">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
