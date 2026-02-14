import { useState } from "react";
import { AcademyLayout } from "@/components/academy/AcademyLayout";
import { useAcademyExperts } from "@/hooks/useAcademyData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, ChevronDown, ChevronUp } from "lucide-react";

function ExpertCard({ expert }: { expert: any }) {
  const [expanded, setExpanded] = useState(false);
  const initials = expert.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2);

  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:scale-[1.01]">
      {/* Photo */}
      {expert.photo_url ? (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={expert.photo_url}
            alt={expert.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-muted">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-3xl font-bold bg-accent text-accent-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      <div className="p-5 space-y-3">
        {/* Name & Role */}
        <div>
          <h3 className="text-lg font-semibold text-foreground">{expert.name}</h3>
          {expert.role && <p className="text-sm text-foreground/50">{expert.role}</p>}
          {expert.email && (
            <a href={`mailto:${expert.email}`} className="text-xs text-accent hover:underline">
              {expert.email}
            </a>
          )}
        </div>

        {/* LinkedIn */}
        {expert.linkedin_url && (
          <a
            href={expert.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground/40 hover:text-accent transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        )}

        {/* Bio */}
        {expert.bio && (
          <div>
            <p className="text-xs font-semibold text-foreground/60 mb-1">Acerca de mí</p>
            <p className={`text-sm text-foreground/50 leading-relaxed ${!expanded ? "line-clamp-3" : ""}`}>
              {expert.bio}
            </p>
            {expert.bio.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-accent font-medium mt-1 flex items-center gap-1 hover:underline"
              >
                {expanded ? <>Ver menos <ChevronUp className="h-3 w-3" /></> : <>Ver más <ChevronDown className="h-3 w-3" /></>}
              </button>
            )}
          </div>
        )}

        {/* Specialties */}
        {expert.specialties?.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-foreground/60 mb-1.5">Especialidades</p>
            <div className="flex flex-wrap gap-1.5">
              {expert.specialties.map((s: string) => (
                <span key={s} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-muted text-accent border border-border">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Industries */}
        {expert.industries?.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-foreground/60 mb-1.5">Industrias</p>
            <div className="flex flex-wrap gap-1.5">
              {expert.industries.map((i: string) => (
                <span key={i} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-secondary text-foreground/70 border border-border">
                  {i}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {expert.languages?.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-foreground/60 mb-1.5">Idiomas</p>
            <div className="flex flex-wrap gap-1.5">
              {expert.languages.map((l: string) => (
                <span key={l} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-secondary text-foreground/70 border border-border">
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AcademyExperts() {
  const { data: experts } = useAcademyExperts();

  return (
    <AcademyLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Expertos</h1>
          <p className="text-foreground/50 text-sm mt-1">
            Aprende con expertos que construyen estas rutas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts?.map((expert: any) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
          {(!experts || experts.length === 0) && (
            <div className="col-span-full text-center py-16 text-foreground/30 text-sm">
              Próximamente conocerás a nuestros expertos.
            </div>
          )}
        </div>
      </div>
    </AcademyLayout>
  );
}
