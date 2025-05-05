import { useState, useEffect } from "react";
import { Award } from "lucide-react";
// import { useAuth } from "../../Context/useAuth";

// --- Data Types ---
interface CourseRecord {
  code: string;
  title: string;
  credits: number;
  grade: string;
  term: string;
  instructor: string;
}
interface CreditSummary {
  completed: number;
  remaining: number;
  core: number;
  elective: number;
}
interface Honor {
  label: string;
  color: string;
}
interface AcademicRecordsData {
  transcript: CourseRecord[];
  semesterGPA: number;
  cumulativeGPA: number;
  credits: CreditSummary;
  honors: Honor[];
  standing: string;
  advisorNotes: string;
}

// --- Fake API ---
const fetchAcademicRecords = (): Promise<AcademicRecordsData> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        transcript: [
          {
            code: "CS101",
            title: "Intro to CS",
            credits: 3,
            grade: "A",
            term: "Fall 2023",
            instructor: "Dr. A. Smith",
          },
          {
            code: "MATH201",
            title: "Calculus II",
            credits: 4,
            grade: "B+",
            term: "Fall 2023",
            instructor: "Dr. B. Jones",
          },
          {
            code: "ENG102",
            title: "English Literature",
            credits: 2,
            grade: "A-",
            term: "Fall 2023",
            instructor: "Dr. C. Lee",
          },
        ],
        semesterGPA: 3.85,
        cumulativeGPA: 3.78,
        credits: { completed: 60, remaining: 30, core: 45, elective: 15 },
        honors: [
          { label: "Dean's List", color: "bg-yellow-100" },
          { label: "Scholarship Recipient", color: "bg-green-100" },
        ],
        standing: "Good Standing",
        advisorNotes:
          "Great performance! Consider adding a minor in Data Science next semester.",
      });
    }, 1000);
  });

// --- Component ---
export default function AcademicRecordsPage() {
  const [data, setData] = useState<AcademicRecordsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const { user } = useAuth();

  useEffect(() => {
    fetchAcademicRecords()
      .then((res) => setData(res))
      .catch(() => setError("Failed to load records"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="p-6 text-gray-600">Loading academic records...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 bg-blue-50 space-y-6">
        <h1 className="text-2xl font-bold text-blue-900">Academic Records</h1>

        {/* GPA Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-500">Semester GPA</p>
            <p className="text-2xl font-semibold text-blue-800">
              {data!.semesterGPA.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-500">Cumulative GPA</p>
            <p className="text-2xl font-semibold text-blue-800">
              {data!.cumulativeGPA.toFixed(2)}
            </p>
          </div>
        </section>

        {/* Credit Summary */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Completed", value: data!.credits.completed },
            { label: "Remaining", value: data!.credits.remaining },
            { label: "Core Credits", value: data!.credits.core },
            { label: "Elective Credits", value: data!.credits.elective },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl shadow p-4 border-l-4 border-blue-500"
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-semibold text-blue-800">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* Transcript Table */}
        <section className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500 overflow-x-auto">
          <h2 className="text-lg font-bold text-blue-800 mb-4">Transcript</h2>
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-blue-100 text-blue-800 sticky top-0">
              <tr>
                <th className="border px-3 py-2">Course Code</th>
                <th className="border px-3 py-2">Title</th>
                <th className="border px-3 py-2">Credits</th>
                <th className="border px-3 py-2">Grade</th>
                <th className="border px-3 py-2">Term</th>
                <th className="border px-3 py-2">Instructor</th>
              </tr>
            </thead>
            <tbody>
              {data!.transcript.map((rec, i) => (
                <tr key={i} className="hover:bg-blue-50">
                  <td className="border px-3 py-2">{rec.code}</td>
                  <td className="border px-3 py-2">{rec.title}</td>
                  <td className="border px-3 py-2">{rec.credits}</td>
                  <td className="border px-3 py-2 font-semibold text-blue-800">
                    {rec.grade}
                  </td>
                  <td className="border px-3 py-2">{rec.term}</td>
                  <td className="border px-3 py-2 italic text-gray-600">
                    {rec.instructor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Honors & Standing */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
            <h2 className="text-lg font-bold text-blue-800 mb-3">
              Honors &amp; Distinctions
            </h2>
            <div className="flex flex-wrap gap-2">
              {data!.honors.map((h, i) => (
                <div
                  key={i}
                  className={`${h.color} px-3 py-1 rounded-full text-xs flex items-center gap-1`}
                >
                  <Award className="w-4 h-4 text-yellow-600" />
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
            <h2 className="text-lg font-bold text-blue-800 mb-3">
              Academic Standing
            </h2>
            <p className="text-blue-800 font-semibold">{data!.standing}</p>
          </div>
        </section>

        {/* Advisor Notes */}
        <section className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
          <h2 className="text-lg font-bold text-blue-800 mb-3">
            Advisor Comments
          </h2>
          <p className="text-gray-700">{data!.advisorNotes}</p>
        </section>

        {/* Export Buttons */}
        <section className="flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Download as PDF
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Export CSV
          </button>
        </section>
      </main>
    </div>
  );
}
