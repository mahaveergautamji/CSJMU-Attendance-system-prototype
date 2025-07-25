import type { Course, Student, Subject, AttendanceRecord, AttendanceStatus } from './types';

export const students: Student[] = [
  { id: 'S001', name: 'Aarav Sharma', universityId: 'CSJMU001' },
  { id: 'S002', name: 'Diya Patel', universityId: 'CSJMU002' },
  { id: 'S003', name: 'Vihaan Singh', universityId: 'CSJMU003' },
  { id: 'S004', name: 'Myra Gupta', universityId: 'CSJMU004' },
  { id: 'S005', name: 'Arjun Kumar', universityId: 'CSJMU005' },
  { id: 'S006', name: 'Saanvi Reddy', universityId: 'CSJMU006' },
  { id: 'S007', name: 'Advik Mishra', universityId: 'CSJMU007' },
  { id: 'S008', name: 'Anika Roy', universityId: 'CSJMU008' },
];

export const subjects: Subject[] = [
  { id: 'SUB01', name: 'Data Structures' },
  { id: 'SUB02', name: 'Algorithms' },
  { id: 'SUB03', name: 'Database Management' },
  { id: 'SUB04', name: 'Operating Systems' },
  { id: 'SUB05', name: 'Financial Accounting' },
  { id: 'SUB06', name: 'Business Law' },
  { id: 'SUB07', name: 'Microeconomics' },
  { id: 'SUB08', name: 'Macroeconomics' },
];

export const courses: Course[] = [
  {
    id: 'C01',
    name: 'B.Tech Computer Science',
    department: 'Computer Science',
    subjects: [subjects[0], subjects[1], subjects[2], subjects[3]],
    students: [students[0], students[1], students[2], students[3]],
  },
  {
    id: 'C02',
    name: 'B.Com',
    department: 'Commerce',
    subjects: [subjects[4], subjects[5], subjects[6], subjects[7]],
    students: [students[4], students[5], students[6], students[7]],
  },
];

const generateAttendanceRecord = (): AttendanceRecord[] => {
    const records: AttendanceRecord[] = [];
    const today = new Date();
    const statuses: AttendanceStatus[] = ['Present', 'Present', 'Present', 'Present', 'Absent', 'Late'];
    
    courses.forEach(course => {
        course.students.forEach(student => {
            course.subjects.forEach(subject => {
                for (let i = 0; i < 30; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() - i);
                    
                    // Skip weekends
                    if (date.getDay() === 0 || date.getDay() === 6) continue;

                    const status = statuses[Math.floor(Math.random() * statuses.length)];
                    records.push({
                        studentId: student.id,
                        subjectId: subject.id,
                        date: date.toISOString().split('T')[0],
                        status: status,
                    });
                }
            });
        });
    });

    return records;
}


export const attendanceRecords: AttendanceRecord[] = generateAttendanceRecord();
