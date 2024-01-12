import React from 'react';
import './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route element={<Layout />}>
        <Route path={'/'} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
