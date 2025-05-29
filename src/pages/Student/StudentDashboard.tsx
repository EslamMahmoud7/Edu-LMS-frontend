// src/pages/Student/StudentDashboard.tsx

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  FileText,
  GraduationCap,
  Clock3,
  Award,
  NotebookPen,
  Megaphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// ------ DTO shapes from your back end ------
interface ClassDTO {
  time: string;
  subject: string;
  doctor: string;
}
interface AchievementDTO {
  title: string;
  description: string;
}
interface AssignmentDTO {
  title: string;
  due: string; // ISO date string
}
interface AnnouncementDTO {
  title: string;
  date: string; // ISO date string
}

interface DashboardDTO {
  fullName: string;
  gpa: number;
  totalCourses: number;
  pendingAssignments: number;
  todaysClasses: ClassDTO[];
  achievements: AchievementDTO[];
  upcomingAssignments: AssignmentDTO[];
  announcements: AnnouncementDTO[];
}

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [dash, setDash] = useState<DashboardDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const stored = localStorage.getItem("eduSyncUser");
        if (!stored) {
          throw new Error("You are not logged in.");
        }

        const { id: studentId, token } = JSON.parse(stored);
        if (!studentId || !token) {
          throw new Error("Missing user ID or token.");
        }

        // If your axios instance already has baseURL="/api", drop the "/api" here:
        const response = await api.get<DashboardDTO>(
          `/api/dashboard/${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setDash(response.data);
      } catch (err: any) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="p-6">Loading dashboard…</p>;
  }

  if (error) {
    return (
      <p className="p-6 text-red-500">
        {error}
      </p>
    );
  }

  if (!dash) {
    return <p className="p-6">No data available.</p>;
  }

  const d = dash;

  return (
    <div className="p-6 space-y-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-900">
        Welcome back, {d.fullName} 👋
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Current GPA",
            value: d.gpa.toFixed(2),
            icon: <GraduationCap className="text-blue-600 w-5 h-5" />,
          },
          {
            label: "Enrolled Courses",
            value: d.totalCourses,
            icon: <BookOpen className="text-blue-600 w-5 h-5" />,
          },
          {
            label: "Pending Assignments",
            value: d.pendingAssignments,
            icon: <FileText className="text-blue-600 w-5 h-5" />,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="cursor-default bg-white rounded-2xl shadow p-4 border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{stat.label}</p>
              {stat.icon}
            </div>
            <p className="text-2xl font-semibold text-blue-800">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Today's Classes */}
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
          {d.todaysClasses?.length ? (
            d.todaysClasses.map((cls, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Clock3 className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-blue-800">{cls.time}</span> –{" "}
                {cls.subject}{" "}
                <span className="italic text-gray-500">({cls.doctor})</span>
              </li>
            ))
          ) : (
            <li>No classes today.</li>
          )}
        </ul>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-bold text-blue-800 mb-3">My Achievements</h2>
        <ul className="space-y-3 text-gray-700 text-sm">
          {d.achievements?.length ? (
            d.achievements.map((ach, i) => (
              <li key={i} className="flex items-start gap-3">
                <Award className="w-5 h-5 text-yellow-500 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">{ach.title}</p>
                  <p className="text-gray-600 text-sm">{ach.description}</p>
                </div>
              </li>
            ))
          ) : (
            <li>No achievements yet.</li>
          )}
        </ul>
      </div>

      {/* Upcoming Assignments & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-bold text-blue-800 mb-3">
            Upcoming Assignments
          </h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            {d.upcomingAssignments?.length ? (
              d.upcomingAssignments.map((a, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <NotebookPen className="w-4 h-4 text-blue-500" />
                  <span>
                    {a.title} – due{" "}
                    {new Date(a.due).toLocaleDateString()}
                  </span>
                </li>
              ))
            ) : (
              <li>No upcoming assignments.</li>
            )}
          </ul>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-bold text-blue-800 mb-3">
            Announcements
          </h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            {d.announcements?.length ? (
              d.announcements.map((n, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <Megaphone className="w-4 h-4 text-blue-500" />
                  <span>
                    {n.title} –{" "}
                    {new Date(n.date).toLocaleDateString()}
                  </span>
                </li>
              ))
            ) : (
              <li>No announcements.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
