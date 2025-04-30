import {
  Users,
  BookOpen,
  FileText,
  Megaphone,
  Calendar,
  NotebookPen,
  Laptop2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const overviewData = [
    {
      title: "Total Students",
      value: 1240,
      icon: <Users className="text-blue-600 w-5 h-5" />,
      path: "/students",
    },
    {
      title: "Courses",
      value: 32,
      icon: <BookOpen className="text-blue-600 w-5 h-5" />,
      path: "/courses",
    },
    {
      title: "Assignments",
      value: 87,
      icon: <FileText className="text-blue-600 w-5 h-5" />,
      path: "/assignments",
    },
    {
      title: "Notices",
      value: 12,
      icon: <Megaphone className="text-blue-600 w-5 h-5" />,
      path: "/notices",
    },
  ];

  const barChartData = [
    { name: "Jan", students: 300 },
    { name: "Feb", students: 500 },
    { name: "Mar", students: 700 },
    { name: "Apr", students: 650 },
  ];

  return (
    <div className="p-6 space-y-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewData.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="cursor-pointer bg-white rounded-2xl shadow p-4 border-l-4 border-blue-500 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{item.title}</p>
              {item.icon}
            </div>
            <p className="text-2xl font-semibold text-blue-800">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-bold text-blue-800 mb-3">
          Student Enrollment (Last 4 Months)
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-bold text-blue-800 mb-3">
            Recent Activities
          </h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-center space-x-2">
              <NotebookPen className="w-4 h-4 text-blue-500" />
              <span>New assignment uploaded in "Mathematics"</span>
            </li>
            <li className="flex items-center space-x-2">
              <Megaphone className="w-4 h-4 text-blue-500" />
              <span>Admin posted a new notice</span>
            </li>
            <li className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span>30 new students enrolled</span>
            </li>
            <li className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Final exams scheduled next month</span>
            </li>
          </ul>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-bold text-blue-800 mb-3">
            Upcoming Tasks
          </h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Submit English essay - Due April 9</span>
            </li>
            <li className="flex items-center space-x-2">
              <NotebookPen className="w-4 h-4 text-blue-500" />
              <span>Chemistry Lab report - Due April 10</span>
            </li>
            <li className="flex items-center space-x-2">
              <Laptop2 className="w-4 h-4 text-blue-500" />
              <span>Programming Assignment - Due April 11</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
