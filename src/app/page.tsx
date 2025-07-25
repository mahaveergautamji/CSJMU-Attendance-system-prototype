import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UniversityIcon } from '@/components/icons';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UniversityIcon className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl">CSJMU Attendance</CardTitle>
            <CardDescription>Welcome! Please select your role to login.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/faculty/dashboard">
                Login as Faculty
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full">
              <Link href="/student/dashboard">
                Login as Student
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Chhatrapati Shahu Ji Maharaj University
        </p>
      </div>
    </main>
  );
}
