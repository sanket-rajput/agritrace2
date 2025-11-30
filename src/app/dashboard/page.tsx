'use client';
import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';
import FarmerDashboard from '@/components/dashboard/farmer-dashboard';
import AgentDashboard from '@/components/dashboard/agent-dashboard';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    redirect('/login');
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'agent':
        return <AgentDashboard />;
      default:
        redirect('/role-selection');
        return null;
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset className="flex min-h-svh flex-col">
        <Header />
        <main className="flex-grow p-4 md:p-6 lg:p-8">{renderDashboard()}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
