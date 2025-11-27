import "./App.css";
import React, { useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./components/StudentDetails";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./services/studentService";

function App() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("list");

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);

  const [page, setPage] = useState(1);
  const studentsPerPage = 5;

  const loadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const handleAdd = () => {
    setSelected(null);
    setMode("form");
  };

  const handleEdit = (student) => {
    setSelected(student);
    setMode("form");
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    alert("Student deleted!");
    loadStudents();
  };

  const handleView = (student) => {
    setSelected(student);
    setMode("details");
  };

  const handleSubmit = async (student) => {
    if (student.id) {
      await updateStudent(student.id, student);
      alert("Student updated!");
    } else {
      await addStudent(student);
      alert("Student added!");
    }
    setMode("list");
  };

  const handleCancel = () => {
    setMode("list");
  };

  //------------------------------
  //  FILTER → SORT → PAGINATE
  //------------------------------

  // 1️⃣ FILTER
  let filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.section.toLowerCase().includes(search.toLowerCase())
  );

  // 2️⃣ SORT
  if (sortField) {
    filtered = [...filtered].sort((a, b) => {
      if (sortField === "marks") return a.marks - b.marks;
      return a[sortField].localeCompare(b[sortField]);
    });
  }

  // 3️⃣ PAGINATION
  const startIndex = (page - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

  const paginatedStudents = filtered.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Student Result Management</h1>

      {mode === "list" && (
        <StudentList
          students={paginatedStudents}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onLoad={loadStudents}
          search={search}
          setSearch={setSearch}
          sortField={sortField}
          setSortField={setSortField}
          page={page}
          setPage={setPage}
          totalStudents={filtered.length}
          studentsPerPage={studentsPerPage}
        />
      )}

      {mode === "form" && (
        <StudentForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          student={selected}
        />
      )}

      {mode === "details" && (
        <StudentDetails
          student={selected}
          onBack={handleCancel}
        />
      )}
    </div>
  );
}

export default App;
