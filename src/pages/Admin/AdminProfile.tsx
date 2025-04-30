import {
  Pencil,
  UploadCloud,
  Lock,
  Link as LinkIcon,
  Award,
  ShieldCheck,
  List,
} from "lucide-react";

export default function AdminProfile() {
  const admin = {
    name: "Dr. Sarah Ahmed",
    role: "LMS Administrator",
    email: "sarah.ahmed@university.edu",
    phone: "+20 122 456 7890",
    joined: "June 2021",
    department: "IT & Systems",
    totalStudents: 540,
    totalCourses: 48,
    avatarUrl: "https://i.pravatar.cc/150?img=32",
  };

  const recentLogs = [
    { icon: List, text: 'Created new course: "Data Ethics" - April 15' },
    { icon: List, text: "Updated student records - April 14" },
    { icon: List, text: 'Added quiz to "Cybersecurity Basics" - April 10' },
  ];

  const actions = [
    { label: "Manage Users", icon: ShieldCheck },
    { label: "Update System Settings", icon: Lock },
  ];

  const socialLinks = [
    { label: "LinkedIn", url: "#", icon: LinkIcon },
    { label: "Admin Docs", url: "#", icon: LinkIcon },
  ];

  const recognitions = [
    { label: "Outstanding Admin", icon: Award, color: "bg-purple-200" },
    { label: "System Uptime Champion", icon: Award, color: "bg-pink-200" },
  ];

  return (
    <div className="p-6 bg-blue-50 min-h-screen text-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Admin Profile</h1>
      </div>

      <section className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500 mb-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={admin.avatarUrl}
              alt="Admin avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100">
              <UploadCloud className="w-5 h-5 text-blue-600" />
            </button>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-blue-800">
                  {admin.name}
                </h2>
                <p className="text-gray-500">{admin.role}</p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2">
                <Pencil className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-blue-800 font-medium">{admin.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-blue-800 font-medium">{admin.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="text-blue-800 font-medium">{admin.joined}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {[
          { label: "Department", value: admin.department },
          { label: "Total Students", value: admin.totalStudents },
          { label: "Courses Managed", value: admin.totalCourses },
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

      <section className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-lg font-bold text-blue-800 mb-4">Recent Logs</h2>
        <ul className="space-y-2 text-gray-700">
          {recentLogs.map((log, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <log.icon className="w-5 h-5 text-blue-500" />
              <span>{log.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-blue-800 mb-4">
            Admin Actions
          </h2>
          <ul className="space-y-2">
            {actions.map((action, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                <action.icon className="w-5 h-5" />
                <span>{action.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-blue-800 mb-4">Resources</h2>
          <ul className="space-y-2">
            {socialLinks.map((link, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <link.icon className="w-5 h-5 text-blue-500" />
                <a href={link.url} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-bold text-blue-800 mb-4">Recognitions</h2>
        <div className="flex flex-wrap gap-2">
          {recognitions.map((rec, i) => (
            <div
              key={i}
              className={`${rec.color} px-3 py-1 rounded-full text-xs flex items-center gap-1`}
            >
              <rec.icon className="w-4 h-4" />
              <span>{rec.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
