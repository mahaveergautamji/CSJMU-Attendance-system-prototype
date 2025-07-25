'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating attendance predictions for students.
 *
 * - attendancePredictions - A function that generates attendance predictions for students.
 * - AttendancePredictionsInput - The input type for the attendancePredictions function.
 * - AttendancePredictionsOutput - The return type for the attendancePredictions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AttendancePredictionsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  courseId: z.string().describe('The ID of the course.'),
  attendanceRecords: z.string().describe('Attendance records for the student in JSON format.'),
});
export type AttendancePredictionsInput = z.infer<typeof AttendancePredictionsInputSchema>;

const AttendancePredictionsOutputSchema = z.object({
  prediction: z.string().describe('AI-generated prediction of the student\'s future attendance.'),
  reason: z.string().describe('Explanation of the prediction, including factors and data used.'),
  recommendations: z.string().describe('Recommendations for faculty to support the student.'),
});
export type AttendancePredictionsOutput = z.infer<typeof AttendancePredictionsOutputSchema>;

export async function attendancePredictions(input: AttendancePredictionsInput): Promise<AttendancePredictionsOutput> {
  return attendancePredictionsFlow(input);
}

const attendancePredictionsPrompt = ai.definePrompt({
  name: 'attendancePredictionsPrompt',
  input: {schema: AttendancePredictionsInputSchema},
  output: {schema: AttendancePredictionsOutputSchema},
  prompt: `You are an AI assistant that predicts student attendance based on past records.

  Analyze the provided attendance records for a student in a specific course and predict their future attendance.
  Provide a reason for your prediction, including the factors and data you used to arrive at the prediction.
  Also, suggest some actionable recommendations for faculty to support the student and improve their attendance.

  Student ID: {{{studentId}}}
  Course ID: {{{courseId}}}
  Attendance Records: {{{attendanceRecords}}}

  Respond in a structured JSON format:
  {
    "prediction": "",
    "reason": "",
    "recommendations": ""
  }`,
});

const attendancePredictionsFlow = ai.defineFlow(
  {
    name: 'attendancePredictionsFlow',
    inputSchema: AttendancePredictionsInputSchema,
    outputSchema: AttendancePredictionsOutputSchema,
  },
  async input => {
    const {output} = await attendancePredictionsPrompt(input);
    return output!;
  }
);
