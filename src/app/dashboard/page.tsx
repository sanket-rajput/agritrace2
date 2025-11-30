'use client';
import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';
import FarmerDashboard from '@/components/dashboard/farmer-dashboard';
import AgentDashboard from '@/components/dashboard/agent-dashboard';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Skeleton className="h-8 w-1/2" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    redirect('/login');
    return null;
  }

  if (!user.role) {
    redirect('/role-selection');
    return null;
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
