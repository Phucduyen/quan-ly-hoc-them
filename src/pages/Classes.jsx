import { useState, useEffect } from "react";

import {
collection,
addDoc,
getDocs,
deleteDoc,
updateDoc,
doc
} from "firebase/firestore";

import { db } from "../firebase";

export default function Classes() {
const [className, setClassName] = useState("");
const [tuition, setTuition] = useState("");
const [classes, setClasses] = useState([]);
const [editId, setEditId] = useState(null);
useEffect(() => {
loadClasses();
}, []);

const loadClasses = async () => {
const querySnapshot = await getDocs(
collection(db, "classes")
);

const data = querySnapshot.docs.map((item) => ({
id: item.id,
...item.data(),
}));

setClasses(data);
};
const deleteClass = async (id) => {
const ok = window.confirm(
"Bạn có chắc muốn xóa lớp học này?"
);

if (!ok) return;

await deleteDoc(
doc(db, "classes", id)
);

loadClasses();
};
const editClass = (item) => {
setEditId(item.id);
setClassName(item.className || "");
setTuition(item.tuition || "");
};
const updateClass = async () => {
if (!editId) return;

await updateDoc(
doc(db, "classes", editId),
{
className,
tuition,
}
);

setEditId(null);
setClassName("");
setTuition("");

loadClasses();

alert("Đã cập nhật lớp học");
};

const addClass = async () => {
if (!className) return;

await addDoc(
collection(db, "classes"),
{
className,
tuition,
}
);

setClassName("");
setTuition("");

alert("Đã thêm lớp học");
loadClasses();
};

return (
<div style={{ padding: "20px" }}> <h1>Quản lý lớp học</h1>


  <div style={{ marginBottom: "20px" }}>
    <input
      placeholder="Tên lớp"
      value={className}
      onChange={(e) => setClassName(e.target.value)}
    />

    <input
placeholder="Học phí"
value={tuition}
onChange={(e) => setTuition(e.target.value)}
/>

{editId ? ( <button onClick={updateClass}>
Cập nhật </button>
) : ( <button onClick={addClass}>
Thêm lớp </button>
)}


    </div>

  <table border="1" cellPadding="10">
    <thead>
      <tr>
        <th>Tên lớp</th>
        <th>Học phí</th>
        <th>Thao tác</th>
      </tr>
    </thead>


<tbody>
  {classes.map((item) => (
    <tr key={item.id}>
      <td>{item.className}</td>
      <td>{item.tuition}</td>

  <td>
  <button
    onClick={() => editClass(item)}
  >
    Sửa
  </button>

<button
onClick={() =>
deleteClass(item.id)
}

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
