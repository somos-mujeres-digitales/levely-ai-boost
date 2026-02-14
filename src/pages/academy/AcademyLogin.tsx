import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Ingresa un email válido");
const passwordSchema = z.string().min(6, "La contraseña debe tener al menos 6 caracteres");
const nameSchema = z.string().min(2, "El nombre debe tener al menos 2 caracteres");

export default function AcademyLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) navigate("/academy");
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!emailSchema.safeParse(email).success) newErrors.email = "Email inválido";
    if (!passwordSchema.safeParse(password).success) newErrors.password = "Mínimo 6 caracteres";
    if (!isLogin && !nameSchema.safeParse(fullName).success) newErrors.name = "Mínimo 2 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({ title: "Error", description: error.message.includes("Invalid") ? "Credenciales incorrectas" : error.message, variant: "destructive" });
        } else {
          navigate("/academy");
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        } else {
          toast({ title: "¡Cuenta creada!", description: "Bienvenido a Levely Academy" });
          navigate("/academy");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "hsl(168 28% 12%)" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: "#CAF374" }}>
            <span className="text-xl font-black" style={{ color: "hsl(168 28% 12%)" }}>L</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Levely Academy</h1>
          <p className="text-white/40 text-sm mt-2">
            {isLogin ? "Inicia sesión para continuar" : "Crea tu cuenta"}
          </p>
        </div>

        {/* Form */}
        <div
          className="rounded-2xl p-8"
          style={{ background: "hsl(168 22% 16%)", border: "1px solid hsl(168 15% 22%)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">Nombre completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                  <Input
                    type="text"
                    placeholder="Tu nombre"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 bg-transparent border-white/10 text-white placeholder:text-white/20"
                  />
                </div>
                {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-white/60 text-xs">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-transparent border-white/10 text-white placeholder:text-white/20"
                />
              </div>
              {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-white/60 text-xs">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-transparent border-white/10 text-white placeholder:text-white/20"
                />
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-semibold"
              style={{ background: "#CAF374", color: "hsl(168 28% 12%)" }}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Iniciar sesión" : "Crear cuenta"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
              <span className="font-semibold" style={{ color: "#CAF374" }}>
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
