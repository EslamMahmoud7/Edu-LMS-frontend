import {
  BookOpen,
  Calendar,
  FileText,
  Megaphone,
  GraduationCap,
  NotebookPen,
  Clock3,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const todaysClasses = [
    { time: "9:00 AM", subject: "Web Development", doctor: "Dr. M. Osman" },
    { time: "11:00 AM", subject: "Algorithms", doctor: "Dr. A. Salem" },
  ];

  const achievements = [
    {
      title: "Quiz Master",
      description: "Completed 20+ quizzes with 90%+ score",
    },
    { title: "Active Learner", description: "Attended all classes last month" },
    { title: "GPA Excellence", description: "Maintained GPA above 3.8" },
  ];

  return (
    <div className="p-6 space-y-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-900">
        Welcome back, Student 👋
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="cursor-default bg-white rounded-2xl shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Current GPA</p>
            <GraduationCap className="text-blue-600 w-5 h-5" />
          </div>
          <p className="text-2xl font-semibold text-blue-800">3.8</p>
        </div>
        <div className="cursor-default bg-white rounded-2xl shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Enrolled Courses</p>
            <BookOpen className="text-blue-600 w-5 h-5" />
          </div>
          <p className="text-2xl font-semibold text-blue-800">5</p>
        </div>
        <div className="cursor-default bg-white rounded-2xl shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Pending Assignments</p>
            <FileText className="text-blue-600 w-5 h-5" />
          </div>
          <p className="text-2xl font-semibold text-blue-800">2</p>
        </div>
      </div>

      {/* Today's Classes Summary */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-blue-800">Today's Classes</h2>
          <button
            onClick={() => navigate("/schedule")}
            className="text-sm text-blue-600 hover:underline"
          >
            View Full Schedule →
          </button>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          {todaysClasses.map((cls, index) => (
            <li key={index} className="flex items-center gap-2">
              <Clock3 className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-blue-800">
                {cls.time}
              </span> - {cls.subject}{" "}
              <span className="italic text-gray-500">({cls.doctor})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Achievements Replacing Chart */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-bold text-blue-800 mb-3">
          My Achievements
        </h2>
        <ul className="space-y-3 text-gray-700 text-sm">
          {achievements.map((ach, i) => (
            <li key={i} className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-500 mt-1" />
              <div>
                <p className="font-medium text-blue-800">{ach.title}</p>
                <p className="text-gray-600 text-sm">{ach.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming Assignments & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-bold text-blue-800 mb-3">
            Upcoming Assignments
          </h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-center space-x-2">
              <NotebookPen className="w-4 h-4 text-blue-500" />
              <span>English Essay – Due April 9</span>
            </li>
            <li className="flex items-center space-x-2">
              <NotebookPen className="w-4 h-4 text-blue-500" />
              <span>History Report – Due April 12</span>
            </li>
          </ul>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-bold text-blue-800 mb-3">
            Announcements
          </h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-center space-x-2">
              <Megaphone className="w-4 h-4 text-blue-500" />
              <span>Midterm schedule released</span>
            </li>
            <li className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Sports Fest - April 15</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
