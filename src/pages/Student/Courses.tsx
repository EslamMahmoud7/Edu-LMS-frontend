import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import api from "../../services/api"

interface Course {
  code: string;
  title: string;
  credits: number;
  instructor: string;
  prerequisites?: string[];

  instructorEmail: string;
  resourceLink: string;
  progress: number;
  nextDeadline: string;
  level: string;
}

interface LevelData {
  level: string;
  courses: Course[];
}

const fetchMyCourses = async (): Promise<LevelData[]> => {
  try {
    // 1) pull user object from localStorage
    const stored = localStorage.getItem("eduSyncUser");
    if (!stored) throw new Error("Not logged in");
    const { id: studentId, token } = JSON.parse(stored);

    // 2) call the new endpoint with the route param
    const { data: raw } = await api.get<
      Array<{
        code: string;
        title: string;
        credits: number;
        instructorName: string;
        instructorEmail: string;
        resourceLink: string;
        progress: number;
        nextDeadline: string;
        level: number;
      }>
    >(`/api/course/mine/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 3) map into your front-end interface
    const list: Course[] = raw.map((c) => ({
      code: c.code,
      title: c.title,
      credits: c.credits,
      instructor: c.instructorName,
      instructorEmail: c.instructorEmail,
      resourceLink: c.resourceLink,
      progress: c.progress,
      nextDeadline: c.nextDeadline,
      level: String(c.level),
    }));

    // 4) group by level
    const map: Record<string, Course[]> = {};
    list.forEach((c) => {
      if (!map[c.level]) map[c.level] = [];
      map[c.level].push(c);
    });

    return Object.entries(map).map(([level, courses]) => ({
      level,
      courses,
    }));
  } catch (err) {
    console.error("Error loading courses:", err);
    return [];
  }
};

export default function CoursesPage() {
  const [levels, setLevels] = useState<LevelData[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses()
      .then((data) => {
        setLevels(data);
        if (data.length) setSelectedLevel(data[0].level);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading your courses…</p>;
  if (!levels.length) return <p>You’re not enrolled in any courses.</p>;

  const currentLevel =
    levels.find((l) => l.level === selectedLevel) || levels[0];
  const filtered = currentLevel.courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const daysUntil = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 bg-blue-50 space-y-6">
        <h1 className="text-2xl font-bold text-blue-900">Courses</h1>

        {/* Level Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {levels.map((lvl) => (
            <button
              key={lvl.level}
              onClick={() => setSelectedLevel(lvl.level)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm transition ${
                selectedLevel === lvl.level
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              {lvl.level}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center bg-white border border-gray-300 rounded px-3 py-2 max-w-md">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2 w-full bg-transparent outline-none text-sm"
          />
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => {
            const days = daysUntil(course.nextDeadline);
            return (
              <div
                key={course.code}
                className="bg-white rounded-2xl shadow p-4 border-l-4 border-blue-500 flex flex-col justify-between"
              >
                <div>
                  <p className="font-semibold text-blue-800">
                    {course.code}: {course.title}
                  </p>
                  {course.prerequisites?.length && (
                    <p className="text-xs text-gray-500 mt-1">
                      Prerequisites: {course.prerequisites.join(", ")}
                    </p>
                  )}
                  <p className="text-sm text-gray-700 mt-2">
                    Instructor:{" "}
                    <a
                      href={`mailto:${course.instructorEmail}`}
                      className="text-blue-600 hover:underline"
                    >
                      {course.instructor}
                    </a>
                  </p>
                  <p className="text-sm text-gray-700">
                    Credits: {course.credits}
                  </p>

                  {/* Progress Tracker */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">Progress</p>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-2 bg-blue-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {course.progress}% complete
                    </p>
                  </div>

                  {/* Upcoming Deadline */}
                  <p className="mt-3 text-sm">
                    Next deadline:{" "}
                    <span
                      className={days <= 1 ? "text-red-600" : "text-gray-800"}
                    >
                      {new Date(course.nextDeadline).toLocaleDateString()} (
                      {days}d)
                    </span>
                  </p>
                </div>

                {/* Resources */}
                {/* <div className="mt-4 flex items-center gap-1 text-sm">
                  <LinkIcon className="w-4 h-4 text-gray-500" />
                  <a
                    href={course.resourceLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Resources
                  </a>
                </div> */}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
