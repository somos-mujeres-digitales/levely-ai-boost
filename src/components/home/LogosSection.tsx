const partnerLogos = [
  { name: "Universidad de Lima", initials: "UL" },
  { name: "PUCP", initials: "PUCP" },
  { name: "ESAN", initials: "ESAN" },
  { name: "UTEC", initials: "UTEC" },
  { name: "Universidad del Pacífico", initials: "UP" },
  { name: "UPC", initials: "UPC" },
];

export function LogosSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container-levely">
        <p className="text-center text-sm font-medium text-muted-foreground mb-10">
          Instituciones que ya confían en Levely
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
          {partnerLogos.map((partner) => (
            <div
              key={partner.name}
              className="group flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-white border border-border flex items-center justify-center group-hover:border-blue/30 group-hover:shadow-md transition-all duration-300">
                <span className="text-lg font-bold text-muted-foreground group-hover:text-blue transition-colors">
                  {partner.initials}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
