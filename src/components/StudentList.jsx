// import React from "react";

function StudentList({
  students,
  onAdd,
  onEdit,
  onDelete,
  onView,
  onLoad,
  search,
  setSearch,
  sortField,
  setSortField,
  page,
  setPage,
  totalStudents,
  studentsPerPage
}) {
  return (
    <div className="container">

      <h2 className="header-title">Student List</h2>

      {/* Action Buttons */}
      <div className="action-row">
        <button className="btn-primary" onClick={onLoad}>Load Students</button>
        <button className="btn-primary" onClick={onAdd}>Add Student</button>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name or section..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Sort Buttons */}
      <div className="sort-buttons">
        <button className="btn-view" onClick={() => setSortField("name")}>Sort by Name</button>
        <button className="btn-view" onClick={() => setSortField("marks")}>Sort by Marks</button>
        <button className="btn-view" onClick={() => setSortField("grade")}>Sort by Grade</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Section</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5">No students found</td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.section}</td>
                <td>{s.marks}</td>
                <td>{s.grade}</td>
                <td>
                  <button className="btn-edit" onClick={() => onEdit(s)}>Edit</button>
                  <button className="btn-delete" onClick={() => onDelete(s.id)}>Delete</button>
                  <button className="btn-view" onClick={() => onView(s)}>View</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button
          disabled={page >= Math.ceil(totalStudents / studentsPerPage)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudentList;
