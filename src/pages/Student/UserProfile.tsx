// src/pages/student/Profile.tsx

import {
  Pencil,
  UploadCloud,
  Lock,
  Link as LinkIcon,
  Award,
  List,
} from "lucide-react";

export default function Profile() {
  // Mock user data
  const user = {
    name: "Jane Doe",
    role: "Computer Science Student",
    email: "jane.doe@example.com",
    phone: "+20 100 123 4567",
    joined: "September 2023",
    institution: "Cairo University",
    totalCourses: 12,
    gpa: 3.85,
    status: "Excellent",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
  };

  // Recent activities
  const recentActivities = [
    { icon: List, text: "Submitted “Essay on AI” – April 10" },
    { icon: List, text: "Completed “React Basics” Quiz – March 28" },
    { icon: List, text: "Enrolled in “Advanced CSS” – March 20" },
  ];

  // Security settings options
  const securityOptions = [{ label: "Change Password", icon: Lock }];

  // Social links
  const socialLinks = [
    { label: "LinkedIn", url: "#", icon: LinkIcon },
    { label: "GitHub", url: "#", icon: LinkIcon },
  ];

  // Achievements
  const achievements = [
    { label: "Quiz Master", icon: Award, color: "bg-yellow-200" },
    { label: "10 Courses", icon: Award, color: "bg-green-200" },
  ];

  return (
    <div className="p-6 bg-blue-50 min-h-screen text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">My Profile</h1>
      </div>

      {/* Basic Info */}
      <section className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500 mb-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={`${user.name} avatar`}
              className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
            />
            <button
              aria-label="Change avatar"
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
            >
              <UploadCloud className="w-5 h-5 text-blue-600" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold text-blue-800">
                  {user.name}
                </p>
                <p className="text-gray-500">{user.role}</p>
              </div>
              <button
                aria-label="Edit profile"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition"
              >
                <Pencil className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-blue-800 font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-blue-800 font-medium">{user.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="text-blue-800 font-medium">{user.joined}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: "Institution", value: user.institution },
          { label: "Total Courses", value: user.totalCourses },
          { label: "GPA", value: user.gpa.toFixed(2) },
          { label: "Status", value: user.status },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl shadow p-4 border-l-4 border-blue-500"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-semibold text-blue-800">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Recent Activity */}
      <section className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-lg font-bold text-blue-800 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-2 text-gray-700">
          {recentActivities.map((act, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <act.icon className="w-5 h-5 text-blue-500" />
              <span>{act.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Security & Social */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-blue-800 mb-4">
            Security Settings
          </h2>
          <ul className="space-y-3 text-gray-700">
            {securityOptions.map((opt, i) => (
              <li
                key={i}
                className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition"
              >
                <opt.icon className="w-5 h-5" />
                <span>{opt.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-blue-800 mb-4">
            Social & Links
          </h2>
          <ul className="space-y-3 text-gray-700">
            {socialLinks.map((link, i) => (
              <li key={i} className="flex items-center space-x-2">
                <link.icon className="w-5 h-5 text-blue-500" />
                <a href={link.url} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-bold text-blue-800 mb-4">Achievements</h2>
        <div className="flex flex-wrap gap-2">
          {achievements.map((ach, i) => (
            <div
              key={i}
              className={`${ach.color} px-3 py-1 rounded-full text-xs flex items-center space-x-1`}
            >
              <ach.icon className="w-4 h-4" />
              <span>{ach.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
