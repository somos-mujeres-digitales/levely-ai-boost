import { GraduationCap, Briefcase, Heart, ArrowUpRight } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Estudiantes",
    description: "Prepárate para tu primera experiencia profesional con un perfil optimizado desde el inicio.",
    color: "blue",
    stat: "+500",
    statLabel: "estudiantes activos",
  },
  {
    icon: Briefcase,
    title: "Jóvenes profesionales",
    description: "Da el siguiente paso en tu carrera con herramientas que te ayudan a destacar.",
    color: "lime",
    stat: "85%",
    statLabel: "consiguen entrevistas",
  },
  {
    icon: Heart,
    title: "Mujeres en tech",
    description: "Apoyamos tu crecimiento profesional con recursos y oportunidades diseñadas para ti.",
    color: "coral",
    stat: "+200",
    statLabel: "mujeres empoderadas",
  },
];

export function TargetAudience() {
  return (
    <section className="section-padding bg-background">
      <div className="container-levely">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="headline-lg">¿Para quién es Levely?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Diseñado para personas que quieren impulsar su carrera profesional
          </p>
        </div>

        {/* Innovative Audience cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="group relative bg-card rounded-3xl border border-border p-8 overflow-hidden hover:border-blue/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                audience.color === 'blue' ? 'from-blue/5 to-blue/10' :
                audience.color === 'lime' ? 'from-lime/5 to-lime/10' :
                'from-coral/5 to-coral/10'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Icon with floating animation */}
              <div className={`relative w-16 h-16 rounded-2xl ${
                audience.color === 'blue' ? 'bg-blue/10' :
                audience.color === 'lime' ? 'bg-lime/20' :
                'bg-coral/10'
              } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <audience.icon className={`w-8 h-8 ${
                  audience.color === 'blue' ? 'text-blue' :
                  audience.color === 'lime' ? 'text-lime-foreground' :
                  'text-coral'
                }`} />
              </div>
              
              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-card-foreground">{audience.title}</h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-muted-foreground mb-6">{audience.description}</p>
                
                {/* Stats badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  audience.color === 'blue' ? 'bg-blue/10 text-blue' :
                  audience.color === 'lime' ? 'bg-lime/30 text-lime-foreground' :
                  'bg-coral/10 text-coral'
                }`}>
                  <span className="text-lg font-bold">{audience.stat}</span>
                  <span className="text-sm opacity-80">{audience.statLabel}</span>
                </div>
              </div>
              
              {/* Decorative corner */}
              <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full ${
                audience.color === 'blue' ? 'bg-blue/5' :
                audience.color === 'lime' ? 'bg-lime/10' :
                'bg-coral/5'
              } group-hover:scale-150 transition-transform duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
