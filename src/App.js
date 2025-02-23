import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/common/loginForm/login';
import BlogList from './components/blog/blogList/blogList';
import BlogDetails from './components/blog/blogDetails/blogDetails';
import Header from './components/common/header/header';
import AdminDashboard from './components/dashboard/dashboard';
import PrivateRoute from './ProtectedRoute';
import BlogAdd from './components/blog/blogAdd/blogAdd';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<AdminDashboard />} />
        <Route exact path="/blog-list" element={<BlogList />} />
        <Route exact path="/blog/:slug" element={<BlogDetails />} />
        <Route exact path="/add-blog" element={<BlogAdd />} />
      </Routes>
    </Router>
  );
};


export default App;
