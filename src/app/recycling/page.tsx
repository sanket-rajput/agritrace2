'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RecyclingDashboardTable } from '@/components/recycling/recycling-dashboard-table';
import { wasteReports } from '@/lib/data';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';

export default function RecyclingPage() {
  const incomingWaste = wasteReports.filter(
    (r) => r.status !== 'Reported' && r.status !== 'Completed'
  );

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset className="flex min-h-svh flex-col">
        <Header />
        <main className="flex-grow p-4 md:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold tracking-tight">
              Assigned Collections
            </h1>
            <Card>
              <CardHeader>
                <CardTitle>Incoming Waste</CardTitle>
                <CardDescription>
                  Manage and track all active waste collections.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecyclingDashboardTable reports={incomingWaste} />
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
