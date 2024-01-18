import React from 'react';
import './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Elements from './pages/Elements';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        {/* Use Navigate to redirect to /elements on load */}
        {/* <Navigate to='/elements' /> */}
        <Route path={'/'} element={<Home />} />
        <Route path={'/elements'} element={<Elements />} />
      </Route>
    </Routes>
  );
}

export default App;
