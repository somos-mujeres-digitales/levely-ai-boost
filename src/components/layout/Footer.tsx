import { Link } from "react-router-dom";

const footerLinks = {
  Producto: [
    { name: "CV Builder", href: "/cv-builder" },
    { name: "Career Accelerator", href: "/career-accelerator" },
    { name: "Resources", href: "/resources" },
  ],
  Empresa: [
    { name: "Partners", href: "/partners" },
    { name: "Empresas", href: "/empresas" },
  ],
  Legal: [
    { name: "Términos", href: "#" },
    { name: "Privacidad", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-levely section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight">
                Levely
              </span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 max-w-xs">
              Optimiza tu perfil profesional y accede a oportunidades alineadas con tu potencial.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="text-sm text-primary-foreground/50 text-center">
            © {new Date().getFullYear()} Levely. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
