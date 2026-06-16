import { useEffect, useState } from "react";
import {
collection,
getDocs,
addDoc,
deleteDoc,
updateDoc,
doc,
} from "firebase/firestore";
import { db } from "../firebase";
export default function Students() {
const [students, setStudents] = useState([]);
const [name, setName] = useState("");
const [grade, setGrade] = useState("");
const [phone, setPhone] = useState("");
const [tuition, setTuition] = useState("");
const [editId, setEditId] = useState(null);
useEffect(() => {
loadStudents();
}, []);
const loadStudents = async () => {
try {
const querySnapshot = await getDocs(
collection(db, "students")
);
  const data = querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
  setStudents(data);
} catch (error) {
  console.error("Lỗi tải dữ liệu:", error);
}


};
const addStudent = async () => {
if (!name) return;
await addDoc(collection(db, "students"), {
  name,
  grade,
  phone,
  tuition,
});
setName("");
setGrade("");
setPhone("");
setTuition("");
loadStudents();


};

const editStudent = (student) => {
setEditId(student.id);
setName(student.name || "");
setGrade(student.grade || "");
setPhone(student.phone || "");
setTuition(student.tuition || "");
};

const updateStudent = async () => {
if (!editId) return;


await updateDoc(
  doc(db, "students", editId),
  {
    name,
    grade,
    phone,
    tuition,
  }
);

setEditId(null);
setName("");
setGrade("");
setPhone("");
setTuition("");
loadStudents();


};

const deleteStudent = async (id) => {
const ok = window.confirm(
"Bạn có chắc muốn xóa học sinh này?"
);


if (!ok) return;

await deleteDoc(
  doc(db, "students", id)
);
loadStudents();


};
return (
<div style={{ padding: "20px" }}> <h1>Danh sách học sinh</h1>
  <div style={{ marginBottom: "20px" }}>
    <input
      placeholder="Họ tên"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <input
      placeholder="Khối lớp"
      value={grade}
      onChange={(e) => setGrade(e.target.value)}
    />
    <input
      placeholder="SĐT phụ huynh"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
    <input
      placeholder="Học phí"
      value={tuition}
      onChange={(e) => setTuition(e.target.value)}
    />
    {editId ? (
      <button onClick={updateStudent}>
        Cập nhật
      </button>
    ) : (
      <button onClick={addStudent}>
        Thêm học sinh
      </button>
    )}
  </div>
  <table border="1" cellPadding="10">
    <thead>
      <tr>
        <th>Họ tên</th>
        <th>Lớp</th>
        <th>SĐT PH</th>
        <th>Học phí</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {students.map((student) => (
        <tr key={student.id}>
          <td>{student.name}</td>
          <td>{student.grade}</td>
          <td>{student.phone}</td>
          <td>{student.tuition}</td>
          <td>
            <button onClick={() => editStudent(student)}>
              Sửa
            </button>

            <button
              onClick={() => deleteStudent(student.id)}
            >
              Xóa
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
}
