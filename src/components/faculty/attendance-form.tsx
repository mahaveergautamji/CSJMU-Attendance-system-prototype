'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { Course, Student, Subject, AttendanceStatus } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Card } from '../ui/card';

type AttendanceState = Record<string, AttendanceStatus>;

export function AttendanceForm({ courses }: { courses: Course[] }) {
  const { toast } = useToast();
  const [selectedCourseId, setSelectedCourseId] = React.useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string | null>(null);
  const [date, setDate] = React.useState<Date>(new Date());
  const [attendance, setAttendance] = React.useState<AttendanceState>({});

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const subjects = selectedCourse?.subjects || [];
  const students = selectedCourse?.students || [];

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    setSelectedSubjectId(null);
    setAttendance({});
  };

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    // Initialize attendance for the new subject
    const course = courses.find(c => c.id === selectedCourseId);
    if(course) {
        const initialAttendance = course.students.reduce((acc, student) => {
            acc[student.id] = 'Present';
            return acc;
        }, {} as AttendanceState);
        setAttendance(initialAttendance);
    }
  };

  const handleAttendanceChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    console.log({
      courseId: selectedCourseId,
      subjectId: selectedSubjectId,
      date: format(date, 'yyyy-MM-dd'),
      records: attendance,
    });
    toast({
      title: 'Attendance Submitted',
      description: `Attendance for ${selectedCourse?.name} has been successfully recorded.`,
      action: <CheckCircle className="text-green-500" />,
    });
  };
  
  const isFormReady = selectedCourseId && selectedSubjectId && date;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Select onValueChange={handleCourseChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleSubjectChange} disabled={!selectedCourseId} value={selectedSubjectId ?? ''}>
          <SelectTrigger>
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={(d) => setDate(d || new Date())} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {isFormReady ? (
        <Card className="overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.universityId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell className="text-right">
                    <RadioGroup
                      value={attendance[student.id] || 'Present'}
                      onValueChange={(value) => handleAttendanceChange(student.id, value as AttendanceStatus)}
                      className="flex justify-end gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Present" id={`${student.id}-present`} />
                        <Label htmlFor={`${student.id}-present`}>Present</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Absent" id={`${student.id}-absent`} />
                        <Label htmlFor={`${student.id}-absent`}>Absent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Late" id={`${student.id}-late`} />
                        <Label htmlFor={`${student.id}-late`}>Late</Label>
                      </div>
                    </RadioGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12 text-center text-muted-foreground">
            <p>Please select a course, subject, and date to view the student list.</p>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!isFormReady || students.length === 0}>
          Submit Attendance
        </Button>
      </div>
    </div>
  );
}
