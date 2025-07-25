'use client';

import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getAttendancePredictions } from '@/lib/actions';
import type { Course, Student } from '@/lib/types';
import { AlertCircle, BrainCircuit, Lightbulb, Loader2, Milestone } from 'lucide-react';

const initialState = {
  prediction: null,
  reason: null,
  recommendations: null,
  error: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
            ) : (
                <>
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    Generate Prediction
                </>
            )}
        </Button>
    )
}

export function PredictionsForm({ students, courses }: { students: Student[], courses: Course[] }) {
    const [state, formAction] = useFormState(getAttendancePredictions, initialState);
    const [selectedStudentId, setSelectedStudentId] = React.useState('');
    const [selectedCourseId, setSelectedCourseId] = React.useState('');

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Select Student</CardTitle>
                        <CardDescription>Choose a student and their course.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={formAction} className="space-y-4">
                            <Select name="studentId" required onValueChange={setSelectedStudentId} value={selectedStudentId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a student" />
                                </SelectTrigger>
                                <SelectContent>
                                    {students.map(student => (
                                        <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select name="courseId" required onValueChange={setSelectedCourseId} value={selectedCourseId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map(course => (
                                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <SubmitButton />
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                <div className="space-y-4">
                    {state.error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                    )}

                    {!state.prediction && !state.error && (
                         <div className="flex h-full min-h-64 items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <BrainCircuit className="h-10 w-10" />
                                <p className="font-semibold">Prediction results will appear here.</p>
                                <p className="text-sm">Select a student and course to begin.</p>
                            </div>
                         </div>
                    )}
                    
                    {state.prediction && (
                        <>
                         <Card>
                            <CardHeader className='flex-row items-center gap-3 space-y-0'>
                                <Milestone className="h-6 w-6" />
                                <CardTitle>Prediction</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-semibold">{state.prediction}</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className='flex-row items-center gap-3 space-y-0'>
                                <BrainCircuit className="h-6 w-6" />
                                <CardTitle>Reasoning</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{state.reason}</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className='flex-row items-center gap-3 space-y-0'>
                                <Lightbulb className="h-6 w-6" />
                                <CardTitle>Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{state.recommendations}</p>
                            </CardContent>
                        </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
