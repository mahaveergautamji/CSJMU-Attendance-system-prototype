import { PredictionsForm } from "@/components/faculty/predictions-form";
import { courses, students } from "@/lib/mock-data";

export default function PredictionsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold font-headline">AI Attendance Predictions</h1>
                <p className="text-muted-foreground">
                    Select a student and course to generate an AI-powered prediction of their future attendance and get recommendations.
                </p>
            </div>
            <PredictionsForm students={students} courses={courses} />
        </div>
    )
}
