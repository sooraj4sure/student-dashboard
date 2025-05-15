import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('/api/students').then(res => setStudents(res.data));
  }, []);

  const filteredStudents = students.filter(student =>
    student.course.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students </h1>
        <input
          type="text"
          placeholder="Filter by course"
          className="border p-2 rounded"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <ul className="space-y-4">
        {filteredStudents.map(student => (
          <li
            key={student.id}
            className="p-4 rounded bg-white shadow hover:bg-gray-300 hover:shadow-md transition-transform transform hover:scale-[1.01] cursor-pointer"
          >
            <Link to={`/student/${student.id}`} className="text-lg font-semibold text-blue-700 hover:underline">
              {student.name}
            </Link>
            <div className="text-sm text-gray-600">{student.email} — {student.course}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
