  import React from "react";

  function StudentDetails({ student, onBack }) {
    return (
      <div className="container">
        <div className="student-card">

          <h2>Student Details</h2>

          <p><b>Name:</b> {student.name}</p>
          <p><b>Section:</b> {student.section}</p>
          <p><b>Marks:</b> {student.marks}</p>
          <p><b>Grade:</b> {student.grade}</p>

          <button className="btn-primary" onClick={onBack}>Back</button>
        </div>
      </div>
    );
  }

  export default StudentDetails;
