import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import api from "../../services/api";

// --- Data Types ---
interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Graded";
  submissionDate?: string;
  grade?: string;
}

// --- Real API ---
const fetchAssignments = async (): Promise<Assignment[]> => {
  const stored = localStorage.getItem("eduSyncUser");
  if (!stored) throw new Error("Not logged in");
  const { id: studentId, token } = JSON.parse(stored);

  const { data } = await api.get<
    Array<{
      title: string;
      description: string;
      dueDate: string;
      courseTitle: string;
    }>
  >(`/api/assignment/mine/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.map((a, idx) => ({
    id: `${idx}`,
    title: a.title,
    course: a.courseTitle,
    dueDate: new Date(a.dueDate).toLocaleDateString(),
    status: "Pending",
  }));
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filtered, setFiltered]       = useState<Assignment[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchTerm, setSearchTerm]   = useState<string>("");
  const [loading, setLoading]         = useState<boolean>(true);
  const [selected, setSelected]       = useState<Assignment | null>(null);

  useEffect(() => {
    fetchAssignments()
      .then((data) => {
        setAssignments(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let data = assignments;
    if (filterStatus !== "All") {
      data = data.filter((a) => a.status === filterStatus);
    }
    if (searchTerm) {
      data = data.filter(
        (a) =>
          a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFiltered(data);
  }, [assignments, filterStatus, searchTerm]);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading assignments...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 bg-blue-50 space-y-6">
        <h1 className="text-2xl font-bold text-blue-900">Assignments</h1>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex space-x-2">
            {["All", "Pending", "Submitted", "Graded"].map((st) => (
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
          
        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => {
            const borderColor =
              a.status === "Submitted"
                ? "border-green-500"
                : a.status === "Graded"
                ? "border-purple-500"
                : "border-blue-500";
            const statusColor =
              a.status === "Submitted"
                ? "text-green-600"
                : a.status === "Graded"
                ? "text-purple-600"
                : "text-blue-800";
            return (
              <div
                key={a.id}
                className={`bg-white rounded-2xl shadow p-4 border-l-4 ${borderColor} flex flex-col justify-between`}
              >
                <div>
                  <p className="font-semibold text-blue-800">{a.title}</p>
                  <p className="text-sm text-gray-500 mt-1">Course: {a.course}</p>
                  <p className="text-sm text-gray-500">Due: {a.dueDate}</p>
                  <p className="mt-2 text-sm">
                    Status:{" "}
                    <span className={`font-medium ${statusColor}`}>
                      {a.status}
                    </span>
                  </p>
                  {a.status !== "Pending" && a.submissionDate && (
                    <p className="text-xs text-gray-600">
                      Submitted: {a.submissionDate}
                    </p>
                  )}
                  {a.status === "Graded" && a.grade && (
                    <p className="text-sm text-green-700 font-semibold">
                      Grade: {a.grade}
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setSelected(a)}
                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm"
                  >
                    {a.status === "Pending"
                      ? "Submit"
                      : a.status === "Graded"
                      ? "View Grade"
                      : "View Submission"}
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
                {selected.status === "Graded"
                  ? "Grade Details"
                  : "Submission Details"}
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Title:</span> {selected.title}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Course:</span> {selected.course}
              </p>
              {selected.status === "Graded" && selected.grade ? (
                <p className="mb-4 text-green-700 font-semibold">
                  Grade: {selected.grade}
                </p>
              ) : selected.submissionDate ? (
                <p className="mb-4">
                  Submission Date: {selected.submissionDate}
                </p>
              ) : null}
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
