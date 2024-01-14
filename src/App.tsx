import React from 'react';
import './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Elements from './components/Elements';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={'/'} element={<Home />} />
        <Route path={'/elements'} element={<Elements />} />
      </Route>
    </Routes>
  );
}

export default App;
