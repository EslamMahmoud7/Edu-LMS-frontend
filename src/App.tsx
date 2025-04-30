import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layouts/Layout";

// Student Pages
import StudentDashboard from "./pages/Student/StudentDashboard";
import { AcademicRecords } from "./pages/Student/AcademicRecords";
import { Assignment } from "./pages/Student/Assignment";
import Schedule from "./pages/Student/Schedule";
import { Settings } from "./pages/Student/Settings";
import UserProfile from "./pages/Student/UserProfile";
import { Courses } from "./pages/Student/Courses";
import { Payment } from "./pages/Student/Payment";
import { Community } from "./pages/Student/Community";
import NotificationsPage from "./pages/NotficationsPage";

// Admin Pages
import { Quizzes } from "./pages/Admin/Quizzes";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { CoursesForm } from "./pages/Admin/CoursesForm";
import { AssignmentForm } from "./pages/Admin/AssignmentForm";
import { QuizForm } from "./pages/Admin/QuizForm";
import { Students } from "./pages/Admin/Students";
import { Payment as AdminPayment } from "./pages/Admin/Payment";
import { AcademicRecords as AdminRecords } from "./pages/Admin/AcademicRecords";
import { Settings as AdminSettings } from "./pages/Admin/Settings";
import { Community as AdminCommunity } from "./pages/Admin/Community";
import AdminProfile from "./pages/Admin/AdminProfile";
export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        {/* Shared layout for both student & admin */}
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Student routes */}
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="courses" element={<Courses />} />
          <Route path="assignments" element={<Assignment />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="academicRecords" element={<AcademicRecords />} />
          <Route path="payment" element={<Payment />} />
          <Route path="community" element={<Community />} />
          <Route
            path="notifications"
            element={<NotificationsPage role="student" />}
          />
          <Route path="settings" element={<Settings />} />

          {/* Admin routes (all prefixed with /admin) */}
          <Route path="admin">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="courses" element={<CoursesForm />} />
            <Route path="courses/new" element={<CoursesForm />} />
            <Route path="assignments" element={<AssignmentForm />} />
            <Route path="assignments/new" element={<AssignmentForm />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="quizzes/new" element={<QuizForm />} />
            <Route path="payment" element={<AdminPayment />} />
            <Route path="academicRecords" element={<AdminRecords />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="community" element={<AdminCommunity />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route
              path="notifications"
              element={<NotificationsPage role="admin" />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
