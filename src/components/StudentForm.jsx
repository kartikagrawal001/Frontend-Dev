import React, { useState, useEffect } from "react";

function StudentForm({ onSubmit, onCancel, student }) {

  const emptyForm = { name: "", section: "", marks: "", grade: "" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (student) setForm({ ...student });
    else setForm(emptyForm);
  }, [student]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="container">
      <h2 className="header-title">{student ? "Edit Student" : "Add Student"}</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        
        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Section:</label>
        <input name="section" value={form.section} onChange={handleChange} required />

        <label>Marks:</label>
        <input
          type="number"
          name="marks"
          value={form.marks}
          onChange={handleChange}
          required
        />

        <label>Grade:</label>
        <input name="grade" value={form.grade} onChange={handleChange} required />

        <button type="submit" className="btn-primary">Save</button>
        <button type="button" className="btn-delete" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default StudentForm;
