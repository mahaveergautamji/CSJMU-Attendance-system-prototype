'use client';
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { AttendanceRecord, Course, Subject, AttendanceStatus } from '@/lib/types';

interface AttendanceViewProps {
  records: AttendanceRecord[];
  courses: Course[];
}

const getBadgeVariant = (status: AttendanceStatus) => {
  switch (status) {
    case 'Present':
      return 'default';
    case 'Absent':
      return 'destructive';
    case 'Late':
      return 'secondary';
    default:
      return 'outline';
  }
};

export function AttendanceView({ records, courses }: AttendanceViewProps) {
  const allSubjects = courses.flatMap(c => c.subjects);
  const [selectedSubjectId, setSelectedSubjectId] = React.useState('all');

  const getAttendancePercentage = (subjectId?: string) => {
    const relevantRecords = subjectId ? records.filter(r => r.subjectId === subjectId) : records;
    if (relevantRecords.length === 0) return 0;
    const presentCount = relevantRecords.filter(r => r.status === 'Present' || r.status === 'Late').length;
    return Math.round((presentCount / relevantRecords.length) * 100);
  };

  const overallPercentage = getAttendancePercentage();
  const subjectsWithLowAttendance = allSubjects.filter(s => getAttendancePercentage(s.id) < 75);

  const filteredRecords = selectedSubjectId === 'all'
    ? records
    : records.filter(r => r.subjectId === selectedSubjectId);
    
  const getSubjectName = (subjectId: string) => {
      return allSubjects.find(s => s.id === subjectId)?.name || 'Unknown';
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{overallPercentage}%</div>
            <Progress value={overallPercentage} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{records.length}</div>
            <p className="text-xs text-muted-foreground">Across all subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low Attendance Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            {subjectsWithLowAttendance.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {subjectsWithLowAttendance.map(s => (
                        <Badge key={s.id} variant="destructive">{s.name}</Badge>
                    ))}
                </div>
            ) : (
                <p className='text-sm text-muted-foreground'>Great job! No subjects with low attendance.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <CardTitle>Attendance History</CardTitle>
                    <p className="text-sm text-muted-foreground">View your attendance record for each subject.</p>
                </div>
                 <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Filter by subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {allSubjects.map(subject => (
                            <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
            <div className="overflow-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((record, index) => (
                    <TableRow key={`${record.date}-${record.subjectId}-${index}`}>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{getSubjectName(record.subjectId)}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={getBadgeVariant(record.status)}>{record.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
             {filteredRecords.length === 0 && (
                <div className="flex h-40 items-center justify-center text-center text-muted-foreground">
                    <p>No attendance records found for the selected subject.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
