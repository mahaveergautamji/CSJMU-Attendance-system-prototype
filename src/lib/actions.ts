'use server';

import { attendancePredictions } from '@/ai/flows/attendance-predictions';
import { attendanceRecords, courses, students } from './mock-data';
import type { AttendanceRecord } from './types';

export async function getAttendancePredictions(formData: FormData) {
  try {
    const studentId = formData.get('studentId') as string;
    const courseId = formData.get('courseId') as string;

    if (!studentId || !courseId) {
      throw new Error('Student ID and Course ID are required.');
    }

    const student = students.find((s) => s.id === studentId);
    if (!student) {
      throw new Error('Student not found.');
    }
    
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
        throw new Error('Course not found');
    }

    const studentAttendance = attendanceRecords.filter((record) => {
        return record.studentId === studentId && course.subjects.some(s => s.id === record.subjectId);
    });

    if (studentAttendance.length === 0) {
      return {
        prediction: "Not enough data",
        reason: "There is no attendance history for this student in the selected course.",
        recommendations: "Please ensure attendance has been recorded for this student to generate a prediction.",
      }
    }
    
    const relevantRecords = studentAttendance.reduce((acc, record) => {
        if(!acc[record.subjectId]) {
            acc[record.subjectId] = [];
        }
        acc[record.subjectId].push({ date: record.date, status: record.status });
        return acc;
    }, {} as Record<string, {date: string, status: string}[]>);


    const result = await attendancePredictions({
      studentId,
      courseId,
      attendanceRecords: JSON.stringify(relevantRecords, null, 2),
    });

    return result;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { error: errorMessage };
  }
}
