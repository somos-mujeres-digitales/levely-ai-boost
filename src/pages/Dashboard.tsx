import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EmployabilityCard } from "@/components/dashboard/EmployabilityCard";
import { GrowthAreasCard } from "@/components/dashboard/GrowthAreasCard";
import { TopMatchesCard } from "@/components/dashboard/TopMatchesCard";
import { ResourcesCard } from "@/components/dashboard/ResourcesCard";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Row: Employability + Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EmployabilityCard />
          </div>
          <div>
            <ResourcesCard />
          </div>
        </div>

        {/* Bottom Row: Growth Areas + Top Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GrowthAreasCard />
          <TopMatchesCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
