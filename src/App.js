import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/loginForm/login';
import BlogList from './components/blogList/blogList';
import BlogDetails from './components/blogDetails/blogDetails';
import Header from './components/header/header';
import PrivateRoute from './ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/blog-list" element={<BlogList />} />
          <Route exact path="/blog/:blogId" element={<BlogDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
