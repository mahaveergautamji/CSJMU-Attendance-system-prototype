export interface Student {
  id: string;
  name: string;
  universityId: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
  department: string;
  subjects: Subject[];
  students: Student[];
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late';

export interface AttendanceRecord {
  studentId: string;
  subjectId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
}
