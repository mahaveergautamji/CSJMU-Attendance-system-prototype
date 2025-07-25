import { AttendanceView } from "@/components/student/attendance-view";
import { attendanceRecords, courses, students } from "@/lib/mock-data";

export default function StudentDashboard() {
  const student = students[0]; // Mock: assuming the first student is logged in
  const studentCourses = courses.filter(course => 
    course.students.some(s => s.id === student.id)
  );

  const studentRecords = attendanceRecords.filter(record => record.studentId === student.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold font-headline">Welcome, {student.name}!</h1>
        <p className="text-muted-foreground">Here is your attendance summary and history.</p>
      </div>
      <AttendanceView 
        records={studentRecords}
        courses={studentCourses}
      />
    </div>
  );
}
