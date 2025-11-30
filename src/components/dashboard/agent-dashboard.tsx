import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RecyclingDashboardTable } from '@/components/recycling/recycling-dashboard-table';
import { wasteReports } from '@/lib/data';

export default function AgentDashboard() {
  const incomingWaste = wasteReports.filter(
    (r) => r.status !== 'Reported' && r.status !== 'Completed'
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        Agent Dashboard
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Incoming Waste</CardTitle>
          <CardDescription>
            Manage and track all active waste collections assigned to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecyclingDashboardTable reports={incomingWaste} />
        </CardContent>
      </Card>
    </div>
  );
}
