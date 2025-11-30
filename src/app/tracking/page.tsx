'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WasteReportsTable } from '@/components/tracking/waste-reports-table';
import { wasteReports } from '@/lib/data';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';

export default function TrackingPage() {
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
              Waste Tracking
            </h1>
            <Card>
              <CardHeader>
                <CardTitle>All Waste Reports</CardTitle>
                <CardDescription>
                  Live status of all your agricultural waste collections.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WasteReportsTable reports={wasteReports} />
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
