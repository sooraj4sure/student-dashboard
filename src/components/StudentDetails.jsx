import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('/api/students').then(res => setStudents(res.data));
  }, []);

  const filteredStudents = students.filter(s =>
    s.course.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by course..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      {filteredStudents.map(student => (
        <div key={student.id} className="border p-4 rounded mb-3 shadow">
          <h2 className="text-lg font-bold">{student.name}</h2>
          <p>{student.email} • {student.course}</p>
          {user && (
            <Link to={`/student/${student.id}`} className="text-blue-600 underline mt-2 inline-block">
              View Details
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentList;
