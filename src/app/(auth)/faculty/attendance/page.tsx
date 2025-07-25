import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceForm } from "@/components/faculty/attendance-form";
import { courses } from "@/lib/mock-data";

export default function MarkAttendancePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold font-headline">Mark Attendance</h1>
                <p className="text-muted-foreground">Select a course, subject, and date to record attendance.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Attendance Sheet</CardTitle>
                    <CardDescription>Mark each student as Present, Absent, or Late.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AttendanceForm courses={courses} />
                </CardContent>
            </Card>
        </div>
    );
}
