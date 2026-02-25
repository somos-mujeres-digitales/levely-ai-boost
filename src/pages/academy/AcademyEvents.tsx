import { useState } from "react";
import { AcademyLayout } from "@/components/academy/AcademyLayout";
import { useAcademyEvents, useRegisterForEvent, useUserEventRegistrations } from "@/hooks/useAcademyData";
import { Calendar, Clock, Users, Video, Mic, Globe, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const eventTypeConfig: Record<string, { label: string; icon: any; color: string }> = {
  masterclass: { label: "Masterclass", icon: Mic, color: "text-amber-500" },
  workshop: { label: "Workshop", icon: Video, color: "text-blue-500" },
  webinar: { label: "Webinar", icon: Globe, color: "text-emerald-500" },
  networking: { label: "Networking", icon: Users, color: "text-purple-500" },
};

const filters = [
  { value: "all", label: "Todos" },
  { value: "masterclass", label: "Masterclass" },
  { value: "workshop", label: "Workshop" },
  { value: "webinar", label: "Webinar" },
  { value: "networking", label: "Networking" },
];

export default function AcademyEvents() {
  const [filter, setFilter] = useState("all");
  const { data: events, isLoading } = useAcademyEvents(filter);
  const { data: registrations } = useUserEventRegistrations();
  const registerMutation = useRegisterForEvent();
  const { user } = useAuth();

  const isRegistered = (eventId: string) =>
    registrations?.some((r: any) => r.event_id === eventId);

  const handleRegister = (eventId: string) => {
    if (!user) {
      toast.error("Inicia sesión para registrarte");
      return;
    }
    registerMutation.mutate(eventId, {
      onSuccess: () => toast.success("¡Registrado! Te enviaremos el enlace."),
    });
  };

  return (
    <AcademyLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Eventos</h1>
          <p className="text-foreground/50 text-sm mt-1">
            Masterclasses, workshops y networking en vivo con expertos.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                filter === f.value
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-foreground/60 border border-border hover:text-foreground/80"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-foreground/30">Cargando eventos...</div>
        ) : !events?.length ? (
          <div className="text-center py-20 text-foreground/30">No hay eventos próximos.</div>
        ) : (
          <div className="space-y-4">
            {events.map((event: any) => {
              const config = eventTypeConfig[event.event_type] || eventTypeConfig.webinar;
              const EventIcon = config.icon;
              const eventDate = new Date(event.event_date);
              const isPast = eventDate < new Date();
              const registered = isRegistered(event.id);

              return (
                <div
                  key={event.id}
                  className={`rounded-2xl p-6 border border-border bg-card transition-all duration-300 hover:scale-[1.005] ${
                    isPast ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    {/* Date block */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-muted flex flex-col items-center justify-center">
                      <span className="text-xs font-semibold uppercase text-foreground/40">
                        {format(eventDate, "MMM", { locale: es })}
                      </span>
                      <span className="text-xl font-bold text-foreground">
                        {format(eventDate, "dd")}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <EventIcon className={`h-4 w-4 ${config.color}`} />
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/40">
                          {config.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{event.title}</h3>
                      <p className="text-sm text-foreground/40 line-clamp-1">{event.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-foreground/40">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {format(eventDate, "HH:mm")} · {event.duration_minutes} min
                        </span>
                        {event.speaker_name && (
                          <span>con {event.speaker_name}</span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex-shrink-0">
                      {isPast ? (
                        event.is_recorded && event.recording_url ? (
                          <Button variant="outline" size="sm" asChild>
                            <a href={event.recording_url} target="_blank" rel="noreferrer">
                              Ver grabación
                            </a>
                          </Button>
                        ) : (
                          <span className="text-xs text-foreground/30">Finalizado</span>
                        )
                      ) : registered ? (
                        <Button variant="outline" size="sm" disabled>
                          ✓ Registrado
                        </Button>
                      ) : (
                        <Button
                          variant="accent"
                          size="sm"
                          onClick={() => handleRegister(event.id)}
                          disabled={registerMutation.isPending}
                        >
                          Reservar lugar <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AcademyLayout>
  );
}
