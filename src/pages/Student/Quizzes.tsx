import { useState, useEffect } from "react";
import { Search } from "lucide-react";

// --- Data Types ---
interface Quiz {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: "Pending" | "Completed" | "Graded";
  submissionDate?: string;
  score?: number;
}

// --- Fake API ---
const fetchQuizzes = (): Promise<Quiz[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "React Fundamentals Quiz",
          course: "Web Development",
          dueDate: "2025-05-02",
          status: "Pending",
        },
        {
          id: 2,
          title: "Data Structures Quiz",
          course: "Data Structures",
          dueDate: "2025-04-28",
          status: "Completed",
          submissionDate: "2025-04-27",
        },
        {
          id: 3,
          title: "Calculus II Quiz",
          course: "Calculus II",
          dueDate: "2025-04-20",
          status: "Graded",
          submissionDate: "2025-04-18",
          score: 88,
        },
      ]);
    }, 800);
  });

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filtered, setFiltered] = useState<Quiz[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<Quiz | null>(null);

  // Fetch data
  useEffect(() => {
    fetchQuizzes()
      .then((data) => {
        setQuizzes(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter & search
  useEffect(() => {
    let data = quizzes;
    if (filterStatus !== "All") {
      data = data.filter((q) => q.status === filterStatus);
    }
    if (searchTerm) {
      data = data.filter(
        (q) =>
          q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFiltered(data);
  }, [quizzes, filterStatus, searchTerm]);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading quizzes...</p>;
  }

  const daysUntil = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 bg-blue-50 space-y-6">
        <h1 className="text-2xl font-bold text-blue-900">Quizzes</h1>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex space-x-2">
            {["All", "Pending", "Completed", "Graded"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-full text-sm transition whitespace-nowrap ${
                  filterStatus === st
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          <div className="flex items-center bg-white border border-gray-300 rounded px-3 py-2 max-w-md">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-2 w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((q) => {
            const days = daysUntil(q.dueDate);
            const borderColor =
              q.status === "Completed"
                ? "border-green-500"
                : q.status === "Graded"
                ? "border-purple-500"
                : "border-blue-500";
            const statusColor =
              q.status === "Completed"
                ? "text-green-600"
                : q.status === "Graded"
                ? "text-purple-600"
                : "text-blue-800";
            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl shadow p-4 border-l-4 ${borderColor} flex flex-col justify-between`}
              >
                <div>
                  <p className="font-semibold text-blue-800">{q.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Course: {q.course}
                  </p>
                  <p className="text-sm text-gray-500">Due: {q.dueDate}</p>
                  <p className="mt-2 text-sm">
                    Status:{" "}
                    <span className={`font-medium ${statusColor}`}>
                      {q.status}
                    </span>
                  </p>
                  {q.status !== "Pending" && q.submissionDate && (
                    <p className="text-xs text-gray-600">
                      Submitted: {q.submissionDate}
                    </p>
                  )}
                  {q.status === "Graded" && q.score !== undefined && (
                    <p className="text-sm text-green-700 font-semibold mt-1">
                      Score: {q.score}%
                    </p>
                  )}
                  <p className="mt-3 text-sm">
                    Next attempt in:{" "}
                    <span
                      className={days <= 1 ? "text-red-600" : "text-gray-800"}
                    >
                      {days}d
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setSelected(q)}
                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm"
                  >
                    {q.status === "Pending"
                      ? "Take Quiz"
                      : q.status === "Graded"
                      ? "View Score"
                      : "Review"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md">
              <h2 className="text-xl font-bold text-blue-800 mb-4">
                {selected.status === "Graded" ? "Quiz Score" : "Quiz Details"}
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Title:</span> {selected.title}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Course:</span> {selected.course}
              </p>
              {selected.status === "Graded" && selected.score !== undefined ? (
                <p className="mb-4 text-green-700 font-semibold">
                  You scored {selected.score}% on this quiz.
                </p>
              ) : (
                <p className="mb-4 text-gray-700">
                  {selected.status === "Pending"
                    ? "Get ready to take this quiz!"
                    : `Submitted on ${selected.submissionDate}`}
                </p>
              )}
              <button
                onClick={() => setSelected(null)}
                className="mt-2 w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
