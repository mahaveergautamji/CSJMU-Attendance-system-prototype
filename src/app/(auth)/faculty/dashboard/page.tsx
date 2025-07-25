import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, CalendarCheck, Users } from 'lucide-react';
import { courses, students } from '@/lib/mock-data';

export default function FacultyDashboard() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold font-headline">Welcome, Dr. Sharma!</h1>
        <p className="text-muted-foreground">Here's a summary of your activities today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Total Students
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Across all assigned courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Assigned Courses
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
         <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-primary">
              Today's Attendance
               <CalendarCheck className="h-5 w-5 text-primary" />
            </CardTitle>
             <CardDescription>2/2 courses submitted</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm font-medium">All attendance for today has been recorded. Well done!</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Navigate to your most frequent tasks with a single click.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <CalendarCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold">Mark Attendance</h3>
                </div>
                <p className="text-sm text-muted-foreground">Record daily attendance for your courses.</p>
                <Button asChild className="mt-2 self-start">
                    <Link href="/faculty/attendance">
                    Go to Attendance <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <BrainCircuit className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold">AI Predictions</h3>
                </div>
                <p className="text-sm text-muted-foreground">Identify at-risk students with AI-powered insights.</p>
                <Button asChild className="mt-2 self-start" variant="secondary">
                    <Link href="/faculty/predictions">
                    View Predictions <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
