import { AcademyLayout } from "@/components/academy/AcademyLayout";
import { useAcademyExperts } from "@/hooks/useAcademyData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {experts?.map((expert: any) => (
            <div
              key={expert.id}
              className="rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.02] bg-card border border-border"
            >
              <Avatar className="h-16 w-16 mx-auto mb-4">
                <AvatarFallback className="text-lg font-bold bg-accent text-accent-foreground">
                  {expert.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-base font-semibold text-foreground">{expert.name}</h3>
              <p className="text-xs text-foreground/40 mt-1">{expert.role}</p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-semibold bg-muted text-accent">
                {expert.specialty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AcademyLayout>
  );
}
