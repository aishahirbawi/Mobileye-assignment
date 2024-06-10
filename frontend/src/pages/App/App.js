import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import LoginPage from '../LoginPage/LoginPage';
import JobList from '../../components/JobList/JobList';
import JobDetails from '../../components/JobDetails/JobDetails';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import Header from '../Header/Header';
import './App.css';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(token ? jwtDecode(token) : null);

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token));
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!token) return;
      try {
        const response = await axios.get('http://localhost:5000/api/jobs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };
    fetchJobs();
  }, [token]);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
      <Router>
        <div className="app">
          <Header user={user} onLogout={handleLogout} />
          <Routes>
            <Route
                path="/"
                element={token ? (
                    <div className="content">
                      <JobList jobs={jobs} onJobClick={handleJobClick} />
                      <JobDetails job={selectedJob} />
                    </div>
                ) : (
                    <Navigate to="/login" />
                )}
            />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
