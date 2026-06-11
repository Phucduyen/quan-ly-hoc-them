import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import Attendance from "./pages/Attendance";
import Tuition from "./pages/Tuition";
import Revenue from "./pages/Revenue";

export default function App() {
  return (
    <div>
      <nav
        style={{
          padding: "15px",
          background: "#1976d2",
          display: "flex",
          gap: "15px",
        }}
      >
        <Link to="/" style={{ color: "white" }}>
          Dashboard
        </Link>

        <Link to="/students" style={{ color: "white" }}>
          Học sinh
        </Link>

        <Link to="/classes" style={{ color: "white" }}>
          Lớp học
        </Link>

        <Link to="/attendance" style={{ color: "white" }}>
          Điểm danh
        </Link>

        <Link to="/tuition" style={{ color: "white" }}>
          Học phí
        </Link>

        <Link to="/revenue" style={{ color: "white" }}>
          Doanh thu
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/tuition" element={<Tuition />} />
        <Route path="/revenue" element={<Revenue />} />
      </Routes>
    </div>
  );
}