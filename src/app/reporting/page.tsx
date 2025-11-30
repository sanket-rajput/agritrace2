'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WasteReportForm } from '@/components/reporting/waste-report-form';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';

export default function ReportingPage() {
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
              Report Crop Waste
            </h1>
            <Card>
              <CardHeader>
                <CardTitle>New Waste Report</CardTitle>
                <CardDescription>
                  Fill out the form below to schedule a waste collection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WasteReportForm />
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
