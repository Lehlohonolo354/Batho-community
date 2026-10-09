import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// All 4 imports now cleanly point to the pages folder
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Transactions from './pages/Transactions';
import Users from './pages/Users';

import './App.css';

function App() {
  return (
    <div className="App">
      <nav style={{ padding: '1rem', backgroundColor: '#282c34', color: '#fff' }}>
        <Link to="/" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/books" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none' }}>Books</Link>
        <Link to="/transactions" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none' }}>Transactions</Link>
        <Link to="/users" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none' }}>Users</Link>
      </nav>

      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;