import { useState, useEffect } from "react";
import {
  Pencil,
  UploadCloud,
  Lock,
  Link as LinkIcon,
  Award,
  List,
} from "lucide-react";
import api from "../../services/api";

interface ProfileDTO {
  id: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  joinedDate: string;
  institution: string;
  totalCourses: number;
  gpa: number;
  status: string;
  avatarUrl?: string;
  achievements: string[];
  recentActivity: string[];
  socialLinks: string[];
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem("eduSyncUser");
        if (!stored) throw new Error("Not logged in");
        const { id: userId, token } = JSON.parse(stored);

        const { data } = await api.get<ProfileDTO>(`/api/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data || err.message || "Failed to load profile");
      }
    })();
  }, []);

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }
  if (!profile) {
    return <p className="p-6 text-gray-600">Loading profile…</p>;
  }
  if(profile.role == "0") profile.role = "Student"; 

  return (
    <div className="p-6 bg-blue-50 min-h-screen text-gray-900">
      {/* Basic Info */}
      <section className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500 mb-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          <div className="relative">
            <img
              src={profile.avatarUrl || "/fallback-avatar.png"}
              alt={`${profile.fullName} avatar`}
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
                  {profile.fullName}
                </p>
                <p className="text-gray-500">{profile.role}</p>
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
                <p className="text-blue-800 font-medium">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-blue-800 font-medium">{profile.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="text-blue-800 font-medium">{profile.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: "Institution", value: profile.institution },
          { label: "Total Courses", value: profile.totalCourses },
          { label: "GPA", value: profile.gpa.toFixed(2) },
          { label: "Status", value: profile.status },
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
          {profile.recentActivity.map((text, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <List className="w-5 h-5 text-blue-500" />
              <span>{text}</span>
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
            <li className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition">
              <Lock className="w-5 h-5" />
              <span>Change Password</span>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-blue-800 mb-4">
            Social & Links
          </h2>
          <ul className="space-y-3 text-gray-700">
            {profile.socialLinks.map((url, i) => (
              <li key={i} className="flex items-center space-x-2">
                <LinkIcon className="w-5 h-5 text-blue-500" />
                <a href={url} className="hover:underline">
                  {url}
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
          {profile.achievements.map((label, i) => (
            <div
              key={i}
              className="bg-yellow-200 px-3 py-1 rounded-full text-xs flex items-center space-x-1"
            >
              <Award className="w-4 h-4" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
