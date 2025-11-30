'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { Leaf, Tractor } from 'lucide-react';

export default function RoleSelectionPage() {
  const [role, setRole] = useState<'farmer' | 'agent'>();
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, setUserRole } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError('Please select a role.');
      return;
    }
    if (user) {
      setUserRole(role);
      router.push('/dashboard');
    } else {
      setError('No user session found. Please log in again.');
      router.push('/login');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Choose Your Role</CardTitle>
          <CardDescription>
            Are you a farmer or a collection agent?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <RadioGroup
              value={role}
              onValueChange={(value) => setRole(value as 'farmer' | 'agent')}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="farmer"
                  id="farmer"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="farmer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Leaf className="mb-3 h-6 w-6" />
                  Farmer
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="agent"
                  id="agent"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="agent"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Tractor className="mb-3 h-6 w-6" />
                  Agent
                </Label>
              </div>
            </RadioGroup>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
