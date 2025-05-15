
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import StudentDetails from './components/StudentDetails';
import Navbar from './components/Navbar';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCipW-wml4YymSHikizPzCsYGkf9ovLiN0",
  authDomain: "student-dashboard-d51a5.firebaseapp.com",
  projectId: "student-dashboard-d51a5",
  storageBucket: "student-dashboard-d51a5.appspot.com", 
  messagingSenderId: "597414663848",
  appId: "1:597414663848:web:0418bc9f92a90701a4149d",
  measurementId: "G-LQEMW85X63"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const mock = new MockAdapter(axios, { delayResponse: 1000 });

let studentData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', course: 'Math' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', course: 'Science' },
];

mock.onGet('/api/students').reply(200, studentData);
mock.onPost('/api/students').reply(config => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = studentData.length + 1;
  studentData.push(newStudent);
  return [201, newStudent];
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <Navbar user={user} login={login} logout={logout} />
      <div className="p-4 max-w-4xl mx-auto bg-gray-100 shadow-xl rounded-xl min-h-screen">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={user ? <AddStudent /> : <Navigate to="/" />} />
          <Route path="/student/:id" element={user ? <StudentDetails /> : <Navigate to="/" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;


